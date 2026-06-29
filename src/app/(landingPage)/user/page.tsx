"use client"

import React, { useEffect, useState } from 'react'

import Profile from '../../../components/userProfile/Profile'
import Container from '@/components/Container'
import Order from '@/components/userOrder/Order'

export default function page() {

  const [isProfile, setIsProfile] = useState(false)

  return (
    <div>

      <Container>
        <div className='flex items-center justify-between my-4'>
          <div className='w-full'>
            <button onClick={() => setIsProfile(false)} className={`${!isProfile ? 'btn-secondary' : ''} btn w-full`}>Order</button>
          </div>
          <div className='w-full'>
            <button onClick={() => setIsProfile(true)} className={`${isProfile ? 'btn-secondary' : ''} btn w-full`}>Profile</button>
          </div>
        </div>
      </Container>

      {
        isProfile ? <Profile></Profile> : <Order></Order>
      }
    </div>
  )
}
