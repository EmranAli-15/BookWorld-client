"use client"


import React from 'react'
import Container from "@/components/Container";
import NavForMobile from "./NavForMobile";
import NavbarForPc from "./NavbarForPc";

export default function Navbar({ categories: data }: { categories: any }) {

    return (
        <Container>
            <div>

                <NavForMobile categories={data}></NavForMobile>

                <NavbarForPc></NavbarForPc>

            </div>
        </Container>
    )
}