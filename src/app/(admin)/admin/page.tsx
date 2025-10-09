"use client"
import Cookies from 'js-cookie';

import { useUser } from '@/contextProvider/ContextProvider';
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { signOut } from 'next-auth/react';

export default function page() {
    const router = useRouter();
    const { setLoading } = useUser()

    const handleLogout = () => {
        signOut();
        router.push("/");
        Cookies.remove("token");
        setLoading(true);
    }

    return (
        <div className='max-w-5xl mx-auto my-5'>
            <div className='grid lg:grid-cols-2 gap-4'>
                <Link href="/adminAllBooks" className='w-full p-4 border border-gray-300 rounded-xl'>
                    All Books
                </Link>
                <div className='w-full p-4 border border-gray-300 rounded-xl'>
                    All Writers
                </div>
                <div className='w-full p-4 border border-gray-300 rounded-xl'>All Orders</div>
                <div className='w-full p-4 border border-gray-300 rounded-xl'>All Orders</div>
            </div>

            <div className='mt-3'>
                <button
                    onClick={() => handleLogout()}
                    className="btn btn-soft btn-warning">
                    Log Out
                </button>
            </div>

        </div>
    )
}
