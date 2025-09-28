"use client"

import { BsCart } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";


import React, { useState } from 'react'
import Container from '../Container'
import logo from "../../../public/logo.png"
import Image from 'next/image'

export default function Navbar() {

    const [drawer, setDrawer] = useState(false);

    return (
        <Container>
            <div className="navbar border-b border-b-gray-200">
                <div className="navbar-start">
                    <div className="dropdown flex items-center lg:hidden">
                        <div>
                            <button onClick={() => setDrawer(true)}>Open</button>
                        </div>
                        {
                            drawer && <div className="h-[100vh] -top-[12px] bg-amber-400 w-[80vw] absolute -left-2 z-10">
                                <button onClick={() => setDrawer(false)}>
                                    close
                                </button>
                            </div>
                        }
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <Image width={40} src={logo} alt='BW'></Image>
                        </div>
                    </div>
                    <div className='hidden lg:flex items-center gap-x-2'>
                        <Image width={50} src={logo} alt='BW'></Image>
                        <p className='text-2xl font-medium'><span className='text-green-400'>Book </span><span className='text-orange-400'>World</span></p>
                    </div>
                </div>

                <div className="w-full hidden lg:block">
                    <form>
                        <input
                            className="border-[1px] outline-0 border-orange-400 w-full px-3 py-2 rounded-3xl"
                            placeholder="search by book or author."
                            required
                            type="search"
                            name="search"
                        />
                    </form>
                </div>

                <div className="navbar-end gap-x-10">
                    <div className="indicator">
                        <span className="indicator-item badge badge-secondary rounded-full text-sm p-1 absolute -right-2">2</span>
                        <BsCart size={20}></BsCart>
                    </div>
                    <div className="flex items-center gap-x-1">
                        <FaRegUser size={20}></FaRegUser>
                        <p>Sign in</p>
                    </div>
                </div>
            </div>
        </Container>
    )
}