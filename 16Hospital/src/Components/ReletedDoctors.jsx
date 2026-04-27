import React, { useContext, useEffect } from 'react'
import { AppContext } from '../Context/AppContext'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'



const ReletedDoctors = ({speciality,docId}) => {
const {doctors} = useContext(AppContext)
const navigate = useNavigate()
const [relDoc, setrelDoc] = useState([])
useEffect(() =>{
if(doctors.length > 0 && speciality){
    const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId)
setrelDoc(doctorsData)
}
},[doctors,speciality,docId])
  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
       <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
       <p className='sm:w 1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors.</p>
      
       <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-y-6 gap-5'>
            {relDoc.slice(0,5).map((item,index) =>(
   
           <div onClick={() => {navigate(`/appointments/${item._id}`); scrollTo(0,0)}} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500'>
                <img className='bg-blue-100 ' src={item.image} alt='' />
               <div className='p-4'>
               <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                     <p className='w-2 h-2 bg-green-500 rounded-full'></p><p>Available</p>
               </div>
                     <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                     <p className='text-gray-600 text-sm'>{item.speciality}</p>
                     <p className='text-gray-500 text-xs'>{item.experience} experience</p>
                </div>

            </div>

             ))}
         </div>

 <button
  onClick={() => { navigate('/doctors'); window.scrollTo(0, 0); }}
  style={{cursor: 'pointer'}}
  className='bg-blue-100 text-gray-600 px-12 py-3 rounded-full mt-10'
>
  more
</button>
      
         </div>
  )
}

export default ReletedDoctors
