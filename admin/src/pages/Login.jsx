import React, { useContext, useState } from 'react'
import { assets } from "../assets/assets.js"
import { AdminContext } from '../context/AdminContext.jsx'
import axios from "axios"
import { toast } from "react-toastify"
import { DoctorContext } from '../context/DoctorContext.jsx'

const Login = () => {

  const [state, setState] = useState('Admin')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const { setAToken, backendUrl } = useContext(AdminContext)
  const { dToken, setDToken } = useContext(DoctorContext)




  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      if (state === 'Admin') {
        const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })
        if (data.success) {
          localStorage.setItem('aToken', data.token) //storing token into local storage 
          setAToken(data.token);
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password })
        if (data.success) {
          localStorage.setItem('dToken', data.token) //storing token into local storage 
          setDToken(data.token);
          console.log(data.token);

        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
      console.log('Invalid credentials');

    }
  }

  const passwordToggler = () => {
    setShowPassword((prev) => !prev)
  }

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start  p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
        <p className='text-2xl font-semibold m-auto'><span className='text-[#5F65FF]'>{state} </span> Login</p>
        <div className='w-full'>
          <p>Email</p>
          <input type="email" required onChange={(e) => setEmail(e.target.value)} value={email} className='border border-[#DADADA] rounded w-full p-2 mt-1' />
        </div>
        <div className='w-full relative'>
          <p>Password</p>
          <button type='button' onClick={passwordToggler} className='absolute right-2 bottom-2  '>{
            showPassword ? <i className="fa-solid fa-eye-slash" /> : <i className="fa-solid fa-eye" /> 
          }</button>
          
          
          <input type={showPassword ? "password" : "text"} onChange={(e) => setPassword(e.target.value)} value={password} required className='  border border-[#DADADA] rounded w-full p-2 mt-1' />
        </div>
        <button className='bg-[#5F65FF] text-white w-full py-2 rounded-md text-base' >Login</button>
        {
          state == 'Admin'
            ? <p>Doctor Login <span className='text-[#5F65FF] cursor-pointer underline' onClick={() => setState('Doctor')} >Click Here </span></p>
            : <p>Admin Login <span className='text-[#5F65FF] cursor-pointer underline' onClick={() => setState('Admin')}>Click Here </span></p>
        }
      </div>
    </form>
  )
}

export default Login
