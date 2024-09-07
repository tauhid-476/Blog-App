import { useEffect, useState } from 'react'
// import './App.css'
import { useDispatch } from 'react-redux';
import authService from "./appwrite/auth"
import { Outlet } from 'react-router-dom';
import { login, logout } from './store/authSlice';
import { Footer, Header } from './components';




function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()
  //dispatch is a crucial function that is used to send actions to the Redux store. 



  //now whenevr application is load ask useEffect whether user is logged in or not

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => { setLoading(false) })
  }, [])


  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full flex flex-col min-h-screen items-stretch">
      <div className="fixed top-0 left-0 w-full -4 z-50">
      <Header className="fixed top-0 z-50 w-full " />
    </div>
      <main className="flex-grow pt-[80px]" >
          <Outlet />
        </main>
        <Footer />
      </div>

    </div>
  ) : null
}

export default App
