import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the shape of UI state
interface ToastMessage {
  message: string;
  severity: 'success' | 'error' | 'info' | 'warning';
}

interface UiState {
  isLoading: boolean;
  isSidebarOpen: boolean;
  toast: ToastMessage | null;
}

// Initial values when app first loads
const initialState: UiState = {
  isLoading: false,
  isSidebarOpen: false,
  toast: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    showToast: (state, action: PayloadAction<ToastMessage>) => {
      state.toast = action.payload;
    },
    hideToast: (state) => {
      state.toast = null;
    },
  },
});

export const { setLoading, toggleSidebar, showToast, hideToast } =
  uiSlice.actions;
export default uiSlice.reducer;

/*
---

## What's happening here? (Read carefully)

**`interface UiState`** — defines exactly what shape the UI state has. TypeScript will yell at you if you try to store something different.

**`initialState`** — the default values when app first loads. Sidebar closed, no loading, no toast.

**`createSlice`** — creates the slice with a name, initial state, and reducers.

**`reducers`** — these are your **actions**. Each one describes HOW to change state:
- `setLoading(true)` → shows spinner
- `toggleSidebar()` → opens/closes sidebar
- `showToast({ message: 'Done!', severity: 'success' })` → shows notification
- `hideToast()` → dismisses notification

**`PayloadAction<boolean>`** — TypeScript saying "this action carries a boolean value". If you try `dispatch(setLoading('hello'))` TypeScript will throw an error. That's the power of typed Redux.

**Last line exports:**
- The actions → so components can `dispatch` them
- The reducer → so `store.ts` can register it

---

### 🧠 Mental Model
```
Component                    uiSlice
─────────                    ───────
dispatch(setLoading(true))  →  state.isLoading = true
dispatch(showToast({...}))  →  state.toast = { message, severity }
dispatch(toggleSidebar())   →  state.isSidebarOpen = !isSidebarOpen

Loader component reads   →  useSelector(state => state.ui.isLoading)
Toast component reads    →  useSelector(state => state.ui.toast)
Sidebar component reads  →  useSelector(state => state.ui.isSidebarOpen)

*/
