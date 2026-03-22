import { Snackbar, Alert } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { hideToast } from '../../features/ui/uiSlice'

export default function Toast() {
  const dispatch = useAppDispatch()

  // Read toast state from Redux
  const toast = useAppSelector((state) => state.ui.toast)

  const handleClose = () => {
    dispatch(hideToast())
  }

  return (
    <Snackbar
      open={toast !== null}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      {toast ? (
        <Alert
          onClose={handleClose}
          severity={toast.severity}
          variant="filled"
          sx={{
            minWidth: 300,
            fontWeight: 600,
            borderRadius: 2,
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          }}
        >
          {toast.message}
        </Alert>
      ) : undefined}
    </Snackbar>
  )
}



/*
---

## What's happening here?

### `Snackbar` + `Alert` — MUI's notification system
```
Snackbar  → handles positioning + auto-dismiss timing
Alert     → handles the visual style (success/error/info/warning)

They work together. Snackbar is the container, Alert is the content inside it.
open={toast !== null}

toast = null        → Snackbar is hidden
toast = { ... }     → Snackbar is visible
```
When Redux `toast` state is `null` nothing shows. When it has a value the notification appears. Clean and simple.

### `autoHideDuration={4000}`
Automatically dismisses after 4 seconds. User doesn't have to manually close it. You can change this number — it's in milliseconds.

### `anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}`
Positions the toast in the **bottom right corner** — the industry standard position for notifications. Users expect it there.

### `severity={toast.severity}`
This one prop changes the entire colour + icon:
```
'success'  → green  ✅
'error'    → red    ❌
'warning'  → orange ⚠️
'info'     → blue   ℹ️


How to use it from anywhere in your app:

// Show a success toast
dispatch(showToast({ message: 'Test submitted!', severity: 'success' }))

// Show an error toast
dispatch(showToast({ message: 'Something went wrong', severity: 'error' }))

// Show an info toast
dispatch(showToast({ message: 'Loading your results...', severity: 'info' }))
```

One line from anywhere. No props, no callbacks, no lifting state up. 🔥

---

## 🧠 Mental Model
```
Any component
      ↓
dispatch(showToast({ message: 'Done!', severity: 'success' }))
      ↓
uiSlice: state.toast = { message: 'Done!', severity: 'success' }
      ↓
Toast reads: toast !== null → Snackbar open={true}
      ↓
Green notification appears bottom right
      ↓
After 4 seconds → onClose fires
      ↓
dispatch(hideToast())
      ↓
uiSlice: state.toast = null
      ↓
Snackbar open={false} → disappears


*/