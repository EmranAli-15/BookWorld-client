import React from 'react'
import NavForMobile from "./NavForMobile";
import NavbarForPc from "./NavbarForPc";
import { getAllCategory, getAllWriter } from '@/services/Services';

export default async function Navbar() {

    const getCategory = getAllCategory();
    const getWriter = getAllWriter();

    const [categories, writers] = await Promise.all([getCategory, getWriter]);

    return (
        <div className='sticky h-fit top-0 z-20 bg-white'>

            <NavForMobile categories={categories} writers={writers}></NavForMobile>

            <NavbarForPc></NavbarForPc>

        </div>
    )
}