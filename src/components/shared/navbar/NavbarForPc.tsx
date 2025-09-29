import React from 'react'


import logo from "../../../../public/logo.png"
import Image from 'next/image'
import { CartIcon, UserIcon } from '@/icons/Icons'
import Container from '@/components/Container'

export default function NavbarForPc() {
    return (
        <Container>
            <div className="lg:flex hidden justify-between items-center p-1 border-b border-gray-200">
                <div className='flex items-center gap-x-2'>
                    <Image width={50} src={logo} alt='BW'></Image>
                    <div className="w-auto">
                        <p className='text-2xl font-medium'><span className='text-green-400'>Book </span><span className='text-orange-400'>World</span></p>
                    </div>
                </div>

                <div className="w-[40%]">
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
        </Container>
    )
}
