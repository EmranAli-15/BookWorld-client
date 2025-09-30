"use client"

import { useUser } from '@/contextProvider/ContextProvider'
import { CartIcon, UserIcon } from '@/icons/Icons'
import { booksApi } from '@/redux/features/bookApi'
import { useAppDispatch } from '@/redux/hooks'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function Options() {
    const dispatch = useAppDispatch();
    const { user } = useUser();
    const [myCart, setMyCart] = useState(0);


    useEffect(() => {
        const fn = async () => {
            if (user?.userId) {
                const data = await dispatch(booksApi.endpoints.getMyCart.initiate(user?.userId)).unwrap();
                setMyCart(data.data?.length);
            }
        };
        fn();
    }, [user])


    return (
        <div className="flex items-center gap-x-10">
            <div className="indicator">
                <span className="indicator-item badge badge-secondary rounded-full text-sm p-1 absolute -right-2">{myCart}</span>
                <CartIcon></CartIcon>
            </div>
            <div className="flex items-center gap-x-1 w-full">
                {
                    !user ? <Link href="/login">Sign in</Link> : <UserIcon></UserIcon>
                }
            </div>
        </div>
    )
}
