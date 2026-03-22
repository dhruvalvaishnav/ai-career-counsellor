import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);

/*
And your <App /> is now wrapped with:

<Provider store={store}>
  <App />
</Provider>
```

---

## Why is this needed?

Think of `Provider` like a **WiFi router** for your Redux store.
```
Without Provider                 With Provider
────────────────                 ─────────────
Store exists but                 Every component
no component can                 in your entire app
access it             →          can connect to
                                 the store via
                                 useAppSelector
                                 and useAppDispatch
```

`Provider` sits at the very top of your app — wrapping everything — so every single component below it has access to the Redux store. You only ever write this once and never touch it again.

---

## 🧠 Your Redux Setup is Now Complete

Here's what you've built so far:
```
main.tsx                         
  └── <Provider store={store}>   ← makes store available everywhere
        └── <App />
              └── all pages/components

store.ts                         ← registers uiSlice + testSlice
  ├── uiSlice.ts                 ← loading, toast, sidebar state
  └── testSlice.ts               ← test answers, result, API call

hooks.ts                         ← typed useAppDispatch + useAppSelector
*/