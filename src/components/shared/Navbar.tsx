"use client"

import { BsCart } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";


import React from 'react'
import Container from '../Container'
import logo from "../../../public/logo.png"
import Image from 'next/image'

export default function Navbar() {
    return (
        <Container>
            <div className="navbar border-b border-b-gray-200">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <Image height={50} width={200} src={logo} alt='BW'></Image>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li><a>Home</a></li>
                            <li>
                                <a>Category</a>
                                <ul className="p-2">
                                    <li><a>Submenu 1</a></li>
                                    <li><a>Submenu 2</a></li>
                                </ul>
                            </li>
                            <li><a>Item 3</a></li>
                        </ul>
                    </div>
                    <div className='flex items-center gap-x-2'>
                        <Image width={50} src={logo} alt='BW'></Image>
                        <p className='text-2xl font-medium'><span className='text-green-400'>Book </span><span className='text-orange-400'>World</span></p>
                    </div>
                </div>

                <div className="w-full">
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
