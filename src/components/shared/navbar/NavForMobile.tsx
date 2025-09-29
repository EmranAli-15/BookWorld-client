import React, { useState } from 'react'

import styles from './navbar.module.css'


import logo from "../../../../public/logo.png"
import Image from 'next/image'
import { CartIcon, CloseIcon, MenuIcon, UserIcon } from '@/icons/Icons';


export default function NavForMobile() {

    const [drawer, setDrawer] = useState(false);

    return (
        <div>
            <div className="flex justify-between lg:hidden items-center p-2 border-b border-gray-200">
                <div className="flex items-center gap-x-2">
                    <button onClick={() => setDrawer(true)}>
                        <MenuIcon></MenuIcon>
                    </button>
                    <Image width={40} src={logo} alt='BW'></Image>
                </div>

                <div onClick={() => setDrawer(false)} className={`${drawer ? 'h-[100dvh] w-[100vw] absolute bg-[#00000040] z-10 top-0 left-0' : ''}`}></div>

                <div className={`${drawer ? [styles.open] : styles.close} ${styles.drawer} px-2`}>
                    <div className="flex justify-between items-center py-2">
                        <p className='text-xl font-medium'><span className='text-green-400'>Book </span><span className='text-orange-400'>World</span></p>
                        <button
                            onClick={() => setDrawer(false)}
                            className='font-bold text-3xl p-2'>
                            <CloseIcon></CloseIcon>
                        </button>
                    </div>
                    <hr className="text-gray-200" />
                    <div className="overflow-auto h-[calc(100dvh-65px)]">
                        <li>Hello</li>
                        <li>Hello</li>
                        <li>Hello</li>
                        <li>Hello</li>
                        <li>Hello</li>
                        <li>Hello</li>
                        <li>Hello</li>
                    </div>
                </div>

                <div className="flex items-center gap-x-10">
                    <div className="indicator">
                        <span className="indicator-item badge badge-secondary rounded-full text-sm p-1 absolute -right-2">2</span>
                        <CartIcon></CartIcon>
                    </div>
                    <div className="flex items-center gap-x-1 w-full">
                        <UserIcon></UserIcon>
                        <p>Sign in</p>
                    </div>
                </div>

            </div>

            <div className="block lg:hidden py-1 bg-green-50">
                <form className="w-full flex justify-center">
                    <input
                        className="border-[1px] outline-0 border-orange-400 w-[90%] px-3 py-2 rounded-3xl"
                        placeholder="search by book or author."
                        required
                        type="search"
                        name="search"
                    />
                </form>
            </div>
        </div>
    )
}
