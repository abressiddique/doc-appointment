import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyApointments = () => {

  const { backendUrl, token, getDoctorData } = useContext(AppContext)
  const [apointments, setApointments] = useState([])
  const months = [ '', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ]

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_')
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
  }

  const getUserApointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/list-apointment', { headers: { token } })
      if (data.success) {
        setApointments(data.apointments.reverse())
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error);
    }

  }


  const cancelApointment = async (apointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/cancel-apointment', { apointmentId }, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        getUserApointments()
        getDoctorData()
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
      console.log(error);
    }
  }
  
  const amountpay = async () => {
    const confirmPayment = window.confirm('Do you want to proceed with the payment?');
    if (confirmPayment) {
      toast.success('Appointment successfully scheduled');
    } else {
      toast.error('Payment not Done');
    }
  }

  useEffect(() => {
    if (token) {
      getUserApointments()
    }
  }, [token])



  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My appointments</p>
      <div>
        {
          apointments.map((item, index) => (
            <div key={index} className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b'>
              <div>
                <img src={item.docData.image} className='w-32 bg-indigo-50' alt="" />
              </div>
              <div className='flex-1 text-sm text-zinc-600'>
                <p className='text-neutral-800 font-semibold' >{item.docData.name}</p>
                <p>{item.docData.speciality}</p>
                <p className='text-zinc-700 font-medium mt-1'>Address : </p>
                <p className='text-xs'>{item.docData.address.line1}</p>
                <p className='text-xs'>{item.docData.address.line2}</p>
                <p><span className='text-sm text-neutral-700 font-medium'>Date & Time</span> <span className=''> {slotDateFormat(item.slotDate)} | {item.slotTime}</span></p>
              </div>
              <div></div>
              <div className='flex flex-col gap- justify-end'>
                {!item.cancelled && !item.isCompleted && <button onClick={amountpay} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'>Pay</button>}
                {!item.cancelled && !item.isCompleted && <button onClick={() => cancelApointment(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded mt-2 hover:bg-red-600 hover:text-white transition-all duration-300 ' >Cancel Appointment </button>}
                {item.cancelled && !item.isCompleted && <button className='sm:min-w-48 py-2 border border-red-500 rounded text-cred-500 px-2 bg-red-400 text-white ' >Apointment cancelled</button>}
                {item.isCompleted && <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'>Completed</button>}
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default MyApointments
