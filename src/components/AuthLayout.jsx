import React, {useEffect,useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
//mechanism to protect pages and route will be using in next js too


export default function Protected({children, authentication =true}) {
 
  const navigate = useNavigate()
  const[loader, setLoader] = useState(true);
  const authStatus = useSelector(state=>state.auth.status)

  useEffect(()=>{
    //true && false !== true 
    //  true && true
    //therefore the user is nnot authenticated and he is navigated to login

    // let authValue = authStatus === true ? true : false
  if(authentication && authStatus !==authentication){
    navigate("/login")


    // false && true !== true
    //false && false
  }else if(!authentication && authStatus !== authentication){
    navigate("/")

  }
  setLoader(false)
  //in conclusion if auth statys is false show login if its true show home pase
  },[authStatus, navigate, authentication])
  

  return loader ? <h1>Loading...</h1> : <>{children}</>
}
