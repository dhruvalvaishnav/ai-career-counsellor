import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Use these 2 hooks everywhere in your app
// NEVER import useDispatch or useSelector directly from 'react-redux'
// Always import from this file instead

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/*
Why do we need this? (Very important concept)

The default useDispatch and useSelector from react-redux are not typed — they don't know about YOUR store's shape.

// ❌ Without typed hooks — TypeScript has no idea what's in state
const result = useSelector((state) => state.test.result)
//                                          ^^^^ ERROR: 'test' doesn't exist on type {}

// ✅ With typed hooks — TypeScript knows exactly what's in your store
const result = useAppSelector((state) => state.test.result)
//                                              ^^^^ works perfectly, fully autocompleted
```

---

## 🧠 Mental Model
```
react-redux gives you         You create
───────────────────           ──────────
useSelector (untyped)   →     useAppSelector (knows your RootState)
useDispatch (untyped)   →     useAppDispatch (knows your AppDispatch)

Think of it like this — react-redux gives you generic tools, you wrap them with knowledge of YOUR specific store. Now every component gets full TypeScript autocomplete and safety.

Rule going forward
Every single component that needs Redux will always start with:

const dispatch = useAppDispatch()
const someThing = useAppSelector((state) => state.ui.isLoading)

Never the raw useDispatch or useSelector directly. Pin this rule in your head. 📌

*/
