import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux';
import authService from "./appwrite/auth"
import { Outlet } from 'react-router-dom';
import { login, logout } from './store/authSlice';
import { Footer, Header } from './components';




function App() {
  const[loading, setLoading] = useState(true);
  const dispatch = useDispatch()
  //dispatch is a crucial function that is used to send actions to the Redux store. 



  //now whenevr application is load ask useEffect whether user is logged in or not

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }else{
        dispatch(logout())
      }
    })
    .finally(()=>{ setLoading(false)})
  },[])
  
  
  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
      <Header />
       <main>
        TODO: <Outlet />
         {/* <Outlet /> */}
       </main>
      <Footer />
      </div>
    </div>
  ): null
}

export default App
