import React from 'react'
import { Container, Logo, LogoutBtn } from "../index";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Header() {
  // useSelector hook in React Redux is used to extract data from the Redux store state.
  //has access to state only and not actions while dispatch has access to both
  const authStatus = useSelector((state) => state.auth.status)
  
  const navigate = useNavigate()

  // whenever there is navigate there  is and array with obj
  const navItems = [
    {
      name: "Home",
      slug : "/",//url
      active : true
    }, {
      name: "Login",
      slug : "/login",//url
      active : !authStatus,
    }, {
      name: "Signup",
      slug : "/signup",//url
      active : !authStatus,
    }, {
      name: "All Posts",
      slug : "/all-posts",//url
      active : authStatus,
    }, {
      name: "Add Posts",
      slug : "/add-posts",//url
      active : authStatus
    },
  ]

  
  return (
    <header className='py-3 shadow bg-gray-500'>
     <Container>
       <nav className='flex'>
        <div className='mr-4'>
          <Link to = '/'>
           <Logo width='70px' />
          </Link>
        </div>

        <ul className='flex ml-auto'>
        {navItems.map((item)=>
           
           item.active? (

            <li key={item.name}>
              <button
              onClick={()=>navigate(item.slug)}
              className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
              >{item.name}</button>
            </li>

           ) :null
        )}
        {/* if authStatus is true then only display else no */}
        {authStatus && (
          <li>
            <LogoutBtn />
          </li>

        )}
        </ul>
       </nav>
     </Container>
    </header>
  )
}

export default Header
