import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { Button, Input, Logo } from './index'
import { useDispatch } from 'react-redux'
import authService from "../appwrite/auth"
import { useForm } from 'react-hook-form'
import { ArrowPathIcon } from '@heroicons/react/24/outline'


function Login() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")


  const login = async (data) => {
    setError("")

    try {
      setLoading(true)
      const session = await authService.login(data)//awppwrite wala login
      if (session) {

        const userData = await authService.getCurrentUser()

        if (userData) dispatch(authLogin(userData))//store wala login
        navigate("/")
        //Link navigate only on click
        //navigate navogate programatically
      }
    } catch (error) {

      setError(error.message)

    } finally {
      setLoading(false)
    }

  }

  return (

    <div
      className='flex items-center justify-center w-full'
    >
      <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-base-200 transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        {/* on submit always handleSubmit(the method u created (here login)) */}

        <form onSubmit={handleSubmit(login)} className='mt-8'>

          <div className='space-y-5'>
            <Input
              label="Email :"
              placeholder="Enter your email"
              type="email"
              // this is an extra thing and its syntax ...(triple dot) is very important the name inside it should be unique. Also pass options in form of object.Its optional u can or can  not 

              //regexp.test(value) || 
              //from docs
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                }
              })}
            />
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your passsword"
              {...register("password", {
                required: true,
              })}
            />
            {/* In React, there is a difference between the self-closing tag <Button /> and the non-self-closing tag <Button></Button> */}
            {/* Self-Closing Tag: <Button />
            Usage: This syntax is used when the component does not contain any childre  */}
            {/* Non-Self-Closing Tag: <Button></Button>
             Usage: This syntax is used when you need to include children within the component. */}

            <Button
              type="submit"
              className="w-full flex justify-center items-center"
              disabled={loading} // Disable button while loading
            >
              {loading ? (

                <ArrowPathIcon className="h-5 w-5 animate-spin mr-2 text-gray-400" />


              ) : null}
             Sign In
            </Button>

          </div>
        </form>
      </div>
    </div>
  )
}

export default Login