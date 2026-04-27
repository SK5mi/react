import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../Context/AppContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'



const Doctors = () => {
const {Spacility} = useParams()
const [FilterDoc, setFilterDoc] = useState([])
const{doctors} = useContext(AppContext)
  const navigate = useNavigate();

console.log(Spacility)


const applyFilter =() =>{
  if(Spacility){
    console.log("Inside if Condition")
    setFilterDoc(doctors.filter(doc => (doc.speciality === Spacility)))
  }
  else{
    console.log("we are executing Else ")
    setFilterDoc(doctors)
  }
}


useEffect(() =>{
  console.log("Use effect is running ")
applyFilter()
},[doctors,Spacility])

  return (
  
    <div>
      <p className='text-gray-600'>Browse through the doctors specialist.</p>
     <div className='flex flex-col sm:flex-row items-start gap-5 mt-5' >
        <div className='flex flex-col gap-4 text-sm text-gray-600'>
              <p onClick={()=>Spacility === 'General physician' ? navigate('/doctors'):navigate('/doctors/General physician')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer   ${Spacility === 'General physician'?"bg-indigo-100 text-black": " "  }`}>General physician</p>
              <p onClick={()=>Spacility === 'Gynecologist' ? navigate('/doctors'):navigate('/doctors/Gynecologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer             ${Spacility === 'Gynecologist' ?"bg-indigo-100 text-black": " " } ` }>Gynecologist</p>
              <p onClick={()=>Spacility === 'Dermatologist' ? navigate('/doctors'):navigate('/doctors/Dermatologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer           ${Spacility === 'Dermatologist'?"bg-indigo-100 text-black": " "} ` }>Dermatologist</p>
              <p onClick={()=>Spacility === 'Pediatricians' ? navigate('/doctors'):navigate('/doctors/Pediatricians')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer           ${Spacility === 'Pediatricians'  ?"bg-indigo-100 text-black": " "} ` }>Pediatricians</p>
              <p onClick={()=>Spacility === 'Neurologist' ? navigate('/doctors'):navigate('/doctors/Neurologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer           ${Spacility === 'Neurologist'  ?"bg-indigo-100 text-black": " " }` }>Neurologist</p>
              <p onClick={()=>Spacility === 'Gastroenterologist' ? navigate('/doctors'):navigate('/doctors/Gastroenterologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${Spacility === 'Gastroenterologist' ?"bg-indigo-100 text-black": " "   }`}>Gastroenterologist</p>
          </div>
           {/* <div className='grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))]   w-full gap-y-6 gap-5'> */}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-y-6 gap-5'>
            {
              FilterDoc.map((item,index) =>(
   
                 <div onClick={() => navigate(`/appointments/${item._id}`)} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500'>
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

              ))
             
            }
          </div>  
        </div> 
      </div>
)
 }

export default Doctors
