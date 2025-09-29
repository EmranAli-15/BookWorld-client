"use client"


import React from 'react'
import Container from "@/components/Container";
import NavForMobile from "./NavForMobile";
import NavbarForPc from "./NavbarForPc";

export default function Navbar() {

    return (
        <Container>
            <div>

                <NavForMobile></NavForMobile>

                <NavbarForPc></NavbarForPc>

            </div>
        </Container>
    )
}