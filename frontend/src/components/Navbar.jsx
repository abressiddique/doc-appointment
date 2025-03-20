import React, { useContext, useState } from 'react'
import { assets } from "../assets/assets.js"
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext.jsx'

const Navbar = () => {

  const [showMenu, setShowMenu] = useState(false)

  const {token,setToken,userData} = useContext(AppContext)

  const logOut = ()=>{
    setToken(false)
    localStorage.removeItem('token')
    
  }

  const navigate = useNavigate()
  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-500'>
      <img onClick={() => navigate('/')} className='w-44 cursor-pointer' src={assets.logo} alt="" />
      <ul className='hidden md:flex items-start gap-5 font-medium'>
        <NavLink to='/'>
          <li className='py-1'>Home</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden ' />
        </NavLink>
        <NavLink to='/doctors'>
          <li className='py-1'>ALL DOCTORS</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden ' />
        </NavLink>
        <NavLink to='/about'>
          <li className='py-1'>ABOUT</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden ' />
        </NavLink>
        <NavLink to='/contact'>
          <li className='py-1'>CONTACT</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden ' />
        </NavLink>
      </ul>
      <div className='flex items-center gap-4'>
        {
          token
            ? <div className='flex items-center gap-2 cursor-pointer group relative'>
              <img src={userData.image} className='w-8 rounded-full' alt="" />
              <img src={assets.dropdown_icon} className='w-2.5' alt="" />
              <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 opacity-0 invisible transform translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0'>
                <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                  <p onClick={() => navigate('/profile')} className='hover:text-black cursor-pointer '>My profile</p>
                  <p onClick={() => navigate('/my-apointments')} className='hover:text-black cursor-pointer '>My Appointments</p>
                  <p onClick={logOut} className='hover:text-black cursor-pointer '>Logout</p>
                </div>
              </div>
            </div>
            : <button onClick={() => navigate(`/login`)} className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block hover:scale-105 transition-all duration-300'>Create account</button>
        }
        <img onClick={() => setShowMenu(true)} src={assets.menu_icon} className='w-6 md:hidden' alt="" />
        {/* Mobile menu */}

        <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
          <div className='flex items-center justify-between  px-5 py-6'>
            <img src={assets.logo} alt="" className='w-36' />
            <img onClick={() => setShowMenu(false)} src={assets.cross_icon} className='w-7' alt="" />
          </div>
          <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
            <NavLink onClick={() => setShowMenu(false)} to='/'><p className='px-4 py-2 rounded inline-block'>Home</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/doctors'><p className='px-4 py-2 rounded inline-block'>ALL DOCTORS</p> </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/about'><p className='px-4 py-2 rounded inline-block'>ABOUT</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/contact'><p className='px-4 py-2 rounded inline-block'>CONTACT</p></NavLink>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar
