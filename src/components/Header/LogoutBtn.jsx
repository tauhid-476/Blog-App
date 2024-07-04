import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'

function LogoutBtn() {
  const dispatch = useDispatch()
  const logoutHandler = ()=>{

    //logout is a promise . see appwrrite folder

    authService.logout()
    .then(()=>{
      dispatch(logout())
    })
  }
  return (
    <button onClick={logoutHandler} className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>
      Logout
    </button>

    //now this logout btn will be contidional redndering that is if user is loggen in then only show it
  )
}

export default LogoutBtn