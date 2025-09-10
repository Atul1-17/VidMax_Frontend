import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, Route, RouterProvider } from 'react-router'
import Home from './pages/Home'
import { ThemeProvider } from './components/shared/ThemeProvider'
import Like from './pages/Like'
import Subscription from './pages/Subscription'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Home /> 
      },
      {
        path: "/like",
        element: <Like />
      },
      {
        path: "/subscription",
        element: <Subscription />
      }
    ]
  }
])




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider defaultTheme = "system" storageKey = "vite-ui-theme" >
        <RouterProvider router = {router}/>
    </ThemeProvider>
  </StrictMode>
)
