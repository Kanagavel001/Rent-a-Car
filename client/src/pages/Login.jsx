import React from 'react'
import { SignIn } from '@clerk/clerk-react';


const Login = () => {
  return (
    <div className='bg-bg min-w-screen min-h-screen flex items-center justify-center overflow-x-hidden mx-auto'>
      <SignIn />
    </div>
  )
}

export default Login