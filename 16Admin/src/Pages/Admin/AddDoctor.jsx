import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'


const AddDoctor = () => {

  const doc_speciality = ["General physician", "Gynecologist", "Dermotologist", "Pediatricians", "Neurologist", "Gastroenterologist"]

const [docImg, setdocImg] = useState(false)
const [Doctor_name, setDoctor_name] = useState('')
const [DoctorEmail, setDoctorEmail] = useState('')
const [password, setpassword] = useState('')
const [experience, setexperience] = useState('')
//const [Education, setEducation] = useState('')
const [Speciality, setSpeciality] = useState('')
const [Fees, setFees] = useState('')
const [about, setabout] = useState('')
const [degree, setdegree] = useState('')
const [Address1, setAddress1] = useState(' ')
const [Address2, setAddress2] = useState(' ')

const {backendUrl,aToken} =useContext(AdminContext)

const onSubmitHandler =async(event) =>{
event.preventDefault()
try{
if(!docImg){
  return toast.error('Image  not Selectd')
}
const formData = new FormData()
formData.append('image',docImg)
formData.append('name',Doctor_name)
formData.append('email',DoctorEmail)
formData.append('password',password)
formData.append('experiance',experience)
formData.append('fees',Number(Fees))
formData.append('about',about)
formData.append('Speciality',Speciality)

formData.append('address',JSON.stringify({line1:Address1,line2:Address2}))
 formData.append('degree',degree)

//console log form data

formData.forEach((value,key)=>
console.log(`${key} :${value}`)
)

const {data} =await axios.post(backendUrl +'/api/admin/add-doctor',formData,{ headers: { aToken: aToken } })
if(data.success){
  toast.success(data.message)
  setdocImg(false)
  setDoctor_name('')
  setDoctorEmail('')
  setpassword('')
  setexperience('')
  setFees('')
  setabout('')
  setSpeciality('')
  setAddress1('')
  setAddress2('')
  setdegree('')
}else{
  toast.error(data.message)
}

}catch(e){
  toast.error(e)
console.log(e)
}
}

{/*onClick={(e)=>setdocImg(e.value.ch)}*/}

  return (
    <form onSubmit={onSubmitHandler} className='m-5 w-full'>
      <p className='mb-3 text-lg font-medium '>Add Doctor</p>
      <div className='bg-white px-8 py-8 border rounded w-full  max-w-4xl max-h-[80vh] overflow-y-scroll '>


        <div className='flex items-center gap-4 mb-8 text-gray-500'>

          <label htmlFor='doc-img'>
            <img className='w-16 bg-gray-100 rounded-full cursor-pointer'    src={docImg?  URL.createObjectURL(docImg):assets.upload_area} alt='Not available' />
          </label>


          <input onChange={(e) => setdocImg(e.target.files[0])} type='file' id='doc-img' hidden />
          <p>Upload doctor <br /> picture</p>


        </div>

        <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>

          <div className='w-full lg:flex-1 flex flex-col gap-4'>



            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor name </p>
              <input onChange={(e)=>setDoctor_name(e.target.value)} value={Doctor_name} className='border rounded px-3 py-2' type="text" placeholder='Enter name' required />
            </div>



            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor Email</p>
              <input onChange={(e)=>setDoctorEmail(e.target.value)} value={DoctorEmail} className='border rounded px-3 py-2' type="email" placeholder='Enter Email' required />
            </div>



            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor Password</p>
              <input onChange={(e)=>setpassword(e.target.value)} value={password} className='border rounded px-3 py-2' type="Password" placeholder='Password' required />
            </div>


            <div className='flex-1 flex flex-col gap-1'>
              <p>Experience</p>
              <select onChange={(e)=>setexperience(e.target.value)} value={experience}  className='border rounded px-3 py-2' name="experience" id="experience" required>
                   {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={`${num} Year${num > 1 ? 's' : ''}`}>
                    {num} {num === 1 ? 'year' : 'years'}
                  </option>
                ))}
              </select>
            </div>


            <div className='flex-1 flex flex-col gap-1'>
              <p>Fees</p>
              <input onChange={(e)=>setFees(e.target.value)} value={Fees} className='border rounded px-3 py-2' type="number" placeholder='Your fees' required />
            </div>

          </div>


          <div className='w-full lg:flex-1 flex flex-col gap-4'>


            <div className='flex-1 flex flex-col gap-1'>
              <p>Speciality</p>
              <select onChange={(e)=>setSpeciality(e.target.value)} value={Speciality} className='border rounded px-3 py-2' name="speciality" id="speciality" required>

                <option value=''>Speciality</option>

                {doc_speciality.map((speciality, number) => (
                  <option key={number} value={speciality}>
                    {speciality}
                  </option>
                ))

                }
              </select>
            </div>


            <div className='flex-1 flex flex-col gap-1'>
              <p>Education</p>
              <input onChange={(e)=>setdegree(e.target.value)} value={degree} className='border rounded px-3 py-2' type="text" placeholder='Education' required />
            </div>


            <div className='flex-1 flex flex-col gap-1'>
              <p>Address</p>
              <input onChange={(e)=>setAddress1(e.target.value)} value={Address1} className='border rounded px-3 py-2' type="text" placeholder='Address 1' required />
              <input onChange={(e)=>setAddress2(e.target.value)} value={Address2}className='border rounded px-3 py-2' type="text" placeholder='Address 2' required />
            </div>


          </div>

        </div>


        <div >
          <p  className='mt-4 mb-2'>About Doctor</p>
          <textarea onChange={(e)=>setabout(e.target.value)} value={about} className ='w-full px-4 py-3 border rounded'placeholder='write about doctor' rows={3} required />
        </div>

        <button type='submit' className='bg-primary px-5 py-2.5 mt-4 text-white rounded-full'>Add Doctor</button>

      </div>

      
    </form>
  )
}

export default AddDoctor
