import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { submitAptitudeTest } from '../../services/api';
import type {
  AptitudeTestResult,
  CareerRecommendation,
  MCQAnswers,
  SelfRatings,
} from '../../types';

// Define the shape of test state
interface TestState {
  // Student info
  name: string;
  userId: string;

  // Test answers
  answers: MCQAnswers;
  selfRatings: SelfRatings;

  // API result
  result: CareerRecommendation | null;

  // Async status
  status: 'idle' | 'loading' | 'success' | 'error';
  errorMessage: string | null;
}

const initialState: TestState = {
  name: '',
  userId: '',
  answers: { logical: {}, verbal: {}, quantitative: {} },
  selfRatings: { logical: 50, verbal: 50, quantitative: 50 },
  result: null,
  status: 'idle',
  errorMessage: null,
};

// ── Async Thunk ────────────────────────────────────────────────────
// This is where the API call to Spring Boot happens
// createAsyncThunk handles loading/success/error states automatically
export const submitTest = createAsyncThunk;
(CareerRecommendation, // what it returns on success
  AptitudeTestResult, // what you pass in when calling it
  { rejectValue: string } > // what it returns on error
    ('test/submit',
    async (payload, { rejectWithValue }) => {
      try {
        const result = await submitAptitudeTest(payload);
        return result;
      } catch (error) {
        return rejectWithValue(
          'Failed to connect to backend. Make sure Spring Boot is running.',
        );
      }
    }));

// ── Slice ──────────────────────────────────────────────────────────
const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    // Save student info
    setStudentInfo: (
      state,
      action: PayloadAction<{ name: string; userId: string }>,
    ) => {
      state.name = action.payload.name;
      state.userId = action.payload.userId;
    },

    // Save MCQ answer for a specific category + question
    setAnswer: (
      state,
      action: PayloadAction<{
        category: keyof MCQAnswers;
        index: number;
        value: string;
      }>,
    ) => {
      const { category, index, value } = action.payload;
      state.answers[category][index] = value;
    },

    // Save self rating for a category
    setSelfRating: (
      state,
      action: PayloadAction<{ category: keyof SelfRatings; value: number }>,
    ) => {
      state.selfRatings[action.payload.category] = action.payload.value;
    },

    // Reset everything back to initial (retake test)
    resetTest: () => initialState,
  },

  // extraReducers handles the 3 states of the async thunk automatically
  extraReducers: (builder) => {
    builder
      .addCase(submitTest.pending, (state) => {
        state.status = 'loading';
        state.errorMessage = null;
      })
      .addCase(submitTest.fulfilled, (state, action) => {
        state.status = 'success';
        state.result = action.payload;
      })
      .addCase(submitTest.rejected, (state, action) => {
        state.status = 'error';
        state.errorMessage = action.payload ?? 'Unknown error';
      });
  },
});

export const { setStudentInfo, setAnswer, setSelfRating, resetTest } =
  testSlice.actions;
export default testSlice.reducer;

/*

---

## What's happening here? (Read carefully)

### Regular reducers vs Async Thunk — the big difference

**Regular reducers** handle simple synchronous state changes:
```
dispatch(setAnswer({...}))  →  instantly updates state
```

**`createAsyncThunk`** handles API calls that take time:
```
dispatch(submitTest(payload))
  → status: 'loading'   (Spring Boot is processing...)
  → status: 'success'   (got result back!)
  → status: 'error'     (something went wrong)
```

You don't manually manage loading/error anymore — Redux does it for you automatically via `extraReducers`.

---

### `extraReducers` — the 3 states of every API call

Every async thunk automatically gets 3 states:
```
submitTest.pending    → API call started    → show spinner
submitTest.fulfilled  → API call succeeded  → show results
submitTest.rejected   → API call failed     → show error
```

This replaces the manual `setLoading(true/false)` + try/catch you had before in `Test.tsx`.

---

### 🧠 Mental Model
```
Test.tsx                         testSlice
────────                         ─────────
dispatch(setStudentInfo({...})) → state.name, state.userId updated
dispatch(setAnswer({...}))      → state.answers updated
dispatch(setSelfRating({...}))  → state.selfRatings updated
dispatch(submitTest(payload))   → calls API → state.status + state.result updated
dispatch(resetTest())           → everything back to initial

Results.tsx reads  → useSelector(state => state.test.result)
Test.tsx reads     → useSelector(state => state.test.status)

*/
