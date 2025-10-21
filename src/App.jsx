import { Outlet } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuthStatus, clearError } from './app/slices/authSlice'
import { useEffect, useRef } from 'react'
import Loader from './components/shared/Loader'


function App() {
  const dispatch = useDispatch()
  const { status, error } = useSelector(state => state.auth)
  const hasCheckedAuth = useRef(false)

  useEffect(() => {
    if (!hasCheckedAuth.current && status === "idle") {
      hasCheckedAuth.current = true
      dispatch(checkAuthStatus())
    }
  }, [dispatch, status])


  useEffect(() => {
    if (error) {
      dispatch(clearError())
    }
  }, [dispatch, error])

  // Show loader while checking authentication on app start
  if (status === "loading") {
  return <Loader />
  }

  return <Outlet />
}

export default App
