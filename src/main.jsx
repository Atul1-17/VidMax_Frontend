import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Home from './pages/Home'
import { ThemeProvider } from './components/shared/ThemeProvider'
import Like from './pages/Like'
import Subscription from './pages/Subscription'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { Provider } from 'react-redux'
import store from './app/store'
import ProtectedRoute from './components/shared/ProtectedRoute'
import RootLayout from './components/shared/RootLayout'
import ChangePassword from './pages/ChangePassword'
import Dashbord from './components/shared/Dashbord'
import UserDashbord from './pages/UserDashbord'
import Upload from './pages/Upload'
import ShowVideo from './pages/ShowVideo'
import ChannelProfile from './pages/ChannelProfile'
import WatchHistoryPage from './pages/WatchHistoryPage'
import PlaylistPage from './pages/PlaylistPage'

const router = createBrowserRouter([
  {
    element: <App/>,
    children: [
      {
        path: "/login",
        element: <Login/>
      },
      {
        path: "/signup",
        element: <Signup />
      },
      {
        path: "/change_password",
        element: <ChangePassword />
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <RootLayout />,
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
              },
              {
                path: "/dashbord",
                element: <Dashbord />
              },
              {
                path: "/userdashbord",
                element: <UserDashbord />
              },
              {
                path: "/upload",
                element: <Upload />
              },
              {
                path: "/video",
                element: <ShowVideo />
              },
              {
                path: "/channelProfile",
                element: <ChannelProfile />
              },
              {
                path: "/watchHistory",
                element: <WatchHistoryPage />
              },
              {
                path: "/playlist",
                element: <PlaylistPage />
              },
            ]
          }
        ]
      }
    ]
  }
])




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider defaultTheme = "system" storageKey = "vite-ui-theme" >
        <Provider store={store}>
          <RouterProvider router = {router}/>
        </Provider>
    </ThemeProvider>
  </StrictMode>
)
