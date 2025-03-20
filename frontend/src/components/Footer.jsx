import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <div className='md:mx-10'>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm '>
                <div>  {/* Left part */}
                    <img className='mb-5 w-50' src={assets.logo} alt="" />
                    <p className='w-full md:w-2/3 text-gray-600  leading-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcatine labore  evenet fugit repelendus debitis beatae natus voluptatem consequatur explicabo and assumenda provident,inventore , </p>
                </div>

                <div>  {/* center part */}
                    <p className='text-xl font-medium mb-5'>COMPANY</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Contact us</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>

                <div>  {/* Right part */}
                    <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li>+91 8077669812</li>
                        <li>nomanali50997@gmail.com</li>
                    </ul>
                </div>
            </div>
            <div>   {/*  */}
                <hr />
                <p className='py-5 text-sm text-center text-gray-600'> &#169; Copyright 2024@ Prescripto - All Right Reserved</p>
            </div>
        </div>
    )
}

export default Footer
