"use client"

import React, { useEffect, useState } from 'react'

import Profile from '../../../components/userProfile/Profile'
import Container from '@/components/Container'

export default function page() {

  const [isProfile, setIsProfile] = useState(true)

  return (
    <div>

      <Container>
        <div className='flex items-center justify-between'>
          <div className='w-full'>
            <button onClick={() => setIsProfile(true)} className={`${isProfile ? 'btn-secondary' : ''} btn w-full`}>Profile</button>
          </div>
          <div className='w-full'>
            <button onClick={() => setIsProfile(false)} className={`${!isProfile ? 'btn-secondary' : ''} btn w-full`}>Order</button>
          </div>
        </div>
      </Container>

      {
        isProfile ? <Profile></Profile> : <p>order details</p>
      }
    </div>
  )
}
