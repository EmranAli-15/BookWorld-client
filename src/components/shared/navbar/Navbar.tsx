import React from 'react'
import Container from "@/components/Container";
import NavForMobile from "./NavForMobile";
import NavbarForPc from "./NavbarForPc";
import { getAllCategory, getAllWriter } from '@/services/Services';

export default async function Navbar() {

    const getCategory = getAllCategory();
    const getWriter = getAllWriter();

    const [categories, writers] = await Promise.all([getCategory, getWriter]);

    return (
        <div>

            <NavForMobile categories={categories} writers={writers}></NavForMobile>

            <NavbarForPc></NavbarForPc>

        </div>
    )
}