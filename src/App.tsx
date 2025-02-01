

import { createBrowserRouter, RouterProvider } from 'react-router'
import Registration from './Component/Common/Registration'
import Login from './Component/Common/Login'
import NavBar from './Component/Dashboard/NavBar'
import Profile from './Component/Dashboard/Profile'
import Home from './Component/Dashboard/Home'
import HomePage from './Pages/HomePage'

function App() {

  const router = createBrowserRouter(
    [
      {path:'/', element:<Login />},
      {path:'/Registration', element:<Registration/>},
      
      {path:'/profile',element:<Home/>}
    ]
  )


  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App
