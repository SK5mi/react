import React from 'react'
import assets from '../assets/assets_frontend/assets'
import { useState } from 'react'

const MyProfile = () => {
  const [userData, setuserData] = useState({
    name: "Edward Vincent",
    image: assets.profile_pic,
    email: "richardJamesap@gmail.com",
    Phone: '+1 8989844129',
    Address: {
      line1: "Nepal",
      line2: "M.p. nager Zone-1, bhopal"
    },
    gender: 'male',
    DOB: "2002-02-12"
  })


  const [IsEdit, setIsEdit] = useState(true)
  return (
    <div className='max-w-lg flex flex-col gap-2 text-sm'>
      <img className='w-36 rounded' src={userData.image} alt=" " />

      {
        IsEdit ? <input className='bg-gray-50 text-3xl font-medium msx-w-60 mt-4' type='text' value={userData.name} onChange={e => { setuserData(prev => ({ ...prev, name: e.target.value })) }
        } /> : <p className='font-medium text-3xl text-neutral-800 mt-4'>{userData.name}</p>}

      <hr className='bg-zinc-400 h-[1px] border-none' />
      <div>
        <p className='text-neutral-500 underline mt-3'>CONTACT INFORMATION </p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium '>Email  Id : </p>
          <p className='text-blue-500 '>{userData.email}</p>
          <p className='font-medium '>Phone :</p>


          {
            IsEdit ? <input className='bg-gray-100 max-w-52' type='text' value={userData.Phone} onChange={e => { setuserData(prev => ({ ...prev, Phone: e.target.value })) }
            } /> : <p className='text-blue-400'>{userData.Phone}</p>}


          <p className='font-medium '>Address:</p>
          {
            IsEdit ? <p>
              <input className='bg-gray-50' onChange={(e) => setuserData(prev => ({ ...prev, Address: { ...prev.Address, line1: e.target.value } }))} value={userData.Address.line1} type="text" />
              <br />
              <input className='bg-gray-50' onChange={(e) => setuserData(prev => ({ ...prev, Address: { ...prev.Address, line2: e.target.value } }))} value={userData.Address.line2} type="text" />
            </p> :
              <p className='text-gray-500'>
                {userData.Address.line1}
                <br />
                {userData.Address.line2}
              </p>
          }

        </div>
      </div>

      <div>
        <p className='text-neutral-500 underline mt-3' >BASIC INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Gendor:</p>

          {IsEdit ?
            <select className='max-w-20 bg-gray-100' onChange={(e) => setuserData(prev => ({ ...prev, gender: e.target.value }))} value={userData.gender}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>

            </select> : <p className='text-gray-400'>{userData.gender}</p>}

          <p className='font-medium'>Birthday:</p>
          {
            IsEdit ? <input className='max-w-28 bg-gray-100' type="date" onChange={(e) => setuserData(prev => ({ ...prev, DOB: e.target.value }))} /> : <p className='text-gray-400'>{userData.DOB}</p>
          }
        </div>
      </div>


      <div className='mt-10'>
        {
          IsEdit ? <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all' onClick={() => setIsEdit(false)}>Save Information</button> :
            <button className='border border-primary px-8 py-2 rounded-full  hover:bg-primary hover:text-white transition-all' onClick={() => setIsEdit(true)}>Edit</button>
        }</div>


    </div>)
}
export default MyProfile
