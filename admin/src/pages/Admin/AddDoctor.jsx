import React, { useContext, useState , useRef } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const AddDoctor = () => {


  const [docImg, setDocImg] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [experience, setExperience] = useState('1 Year')
  const [fee, setFee] = useState('')
  const [about, setAbout] = useState('')
  const [speciality, setSpeciality] = useState('General physician')
  const [degree, setDegree] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')


  const {backendUrl , aToken} = useContext(AdminContext)

  const scrollRef = useRef(null)

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    try {
      if (!docImg){
        toast.error('Image Not Selcted ')
        scrollRef.current?.scrollTo(0,0)
        return;
      }

      const formData  = new FormData()

      formData.append("image",docImg)
      formData.append("name",name)
      formData.append("email",email)
      formData.append("password",password)
      formData.append("experience",experience)
      formData.append("fees",Number(fee))
      formData.append("about",about)
      formData.append("speciality",speciality)
      formData.append("degree",degree)
      formData.append("address",JSON.stringify({line1:address1,line2:address2}))
      // formData.append("address2",address2)

      formData.forEach((value,key)=>{
        console.log(`${key} : ${value}`);
        
      })
      
      const {data}  = await axios.post(backendUrl+'/api/admin/add-doctor' , formData , {headers : {aToken}})
      if(data.succes){
        toast.success(data.message)
        setDocImg(false)
        setName('')
        setPassword('')
        setEmail('')
        setAddress1('')
        setAddress2('')
        setDegree('')
        setFee('')
        setAbout('')
      }else{
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }

  }


  return (
    <form onSubmit={onSubmitHandler} className='m-5 w-full' >

      <p className='mb-3 text-lg font-medium'>Add Doctor</p>

      <div ref={scrollRef} className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
        <div className='flex items-center gap-4 mb-8 text-gray-500'>
          <label htmlFor="doc-img">
            <img src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} className='w-16 bg-gray-100 rounded-full cursor-pointer' alt="" />
          </label>
          <input type="file" onChange={(e) => setDocImg(e.target.files[0])} id="doc-img" hidden />
          <p>Upload doctor <br /> picture</p>
        </div>

        <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
          <div className='w-full lg:flex-1 flex flex-col gap-4'>

            <div className='flex-1 flex flex-col gap-1 '>
              <p>Doctor name</p>
              <input type="text" onChange={(e) => setName(e.target.value)} value={name} placeholder='Name' className='border rounded px-3 py-2' required />
            </div>

            <div className='flex-1 flex flex-col gap-1 '>
              <p>Doctor Email</p>
              <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder='email' className='border  rounded px-3 py-2' required />
            </div>

            <div className='flex-1 flex flex-col gap-1 ' >
              <p>Doctor password</p>
              <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder='Password' className='border  rounded px-3 py-2' required />
            </div>

            <div className='flex-1 flex flex-col gap-1 '>
              <p>Experience</p>
              <select onChange={(e) => setExperience(e.target.value)} value={experience} className='border  rounded px-3 py-2'  >
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value="6 Year">6 Year</option>
                <option value="7 Year">7 Year</option>
                <option value="8 Year">8 Year</option>
                <option value="9 Year">9 Year</option>
                <option value="10 Year">10 Year</option>
              </select>
            </div>

            <div className='flex-1 flex flex-col gap-1 ' >
              <p> Fees</p>
              <input type="number" onChange={(e) => setFee(e.target.value)} value={fee} className='border  rounded px-3 py-2' placeholder='fee' required />
            </div>

          </div>

          <div className='w-full lg:flex-1 flex flex-col gap-4'>

            <div className='flex-1 flex flex-col gap-1 '>
              <p>Speciality</p>
              <select onChange={(e) => setSpeciality(e.target.value)} value={speciality} className='border  rounded px-3 py-2' >
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            <div className='flex-1 flex flex-col gap-1 '>
              <p> Education</p>
              <input type="text" onChange={(e) => setDegree(e.target.value)} value={degree} placeholder='Degree' className='border  rounded px-3 py-2' required />
            </div>

            <div className='flex-1 flex flex-col gap-1 '>
              <p>Address</p>
              <input type="text" onChange={(e) => setAddress1(e.target.value)} value={address1} placeholder='Address 1' className='border  rounded px-3 py-2' required />
              <input type="text" onChange={(e) => setAddress2(e.target.value)} value={address2} placeholder='Address 2' className='border  rounded px-3 py-2' required />
            </div>

          </div>
        </div>

        <div>
          <p className='mt-4 mb-2'> About Doctor </p>
          <textarea onChange={(e) => setAbout(e.target.value)} value={about} className='w-full px-4 pt-2 border rounded' placeholder='write about doctor' rows={5} required />
        </div>
        <button className='bg-[#5F65FF] text-white text-sm px-10 py-2 rounded-full mt-4'>Add Doctor</button>
      </div>
    </form>
  )
}

export default AddDoctor
