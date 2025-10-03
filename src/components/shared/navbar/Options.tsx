"use client"

import { useUser } from '@/contextProvider/ContextProvider'
import { CartIcon, UserIcon } from '@/icons/Icons'
import { booksApi } from '@/redux/features/bookApi'
import { addToMyCart, setPreCart } from '@/redux/features/bookSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { getLocalCart } from '@/utils/localCart'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function Options() {
    const dispatch = useAppDispatch();

    const { user } = useUser();
    const [myCart, setMyCart] = useState(0);

    const getCartData = useAppSelector(state => state.myCart);

    useEffect(() => {
        setMyCart(getCartData.cart)
    }, [getCartData])

    useEffect(() => {
        const fn = async () => {
            if (user) {
                const data = await dispatch(booksApi.endpoints.getMyCart.initiate(user?.userId)).unwrap();
                dispatch(setPreCart(data.data?.length));
            }
            else {
                const cart = getLocalCart();
                dispatch(setPreCart(cart));
                setMyCart(cart);
            }
        };
        fn();
    }, [user])


    return (
        <div className="flex items-center gap-x-10">
            <div className="indicator">
                <span className="indicator-item badge badge-secondary rounded-full text-sm p-1 absolute -right-2">{myCart}</span>
                <Link href="/cart"><CartIcon></CartIcon></Link>
            </div>
            <div className="flex items-center gap-x-1 w-full">
                {
                    !user ? <Link href="/login">Sign in</Link> : <Link href="/user"><UserIcon w={25}></UserIcon></Link>
                }
            </div>
        </div>
    )
}
