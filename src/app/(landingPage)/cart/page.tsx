"use client"

import Container from '@/components/Container'
import { useUser } from '@/contextProvider/ContextProvider';
import { booksApi, useGetMyCartQuery } from '@/redux/features/bookApi';
import { useAppDispatch } from '@/redux/hooks';
import React, { useEffect, useState } from 'react'

export default function Cart() {
    const dispatch = useAppDispatch();
    const { user } = useUser();
    const [myCart, setMyCart] = useState<null | []>(null);

    useEffect(() => {
        let data;
        const fn = async () => {
            data = await dispatch(booksApi.endpoints.getMyCart.initiate(user.userId)).unwrap();
        }
        if (user?.userid) {
            fn();
        }
        else {
            const cart = localStorage.getItem("myCart");
            if (cart) {
                data = JSON.parse(cart);
            }
        };

        setMyCart(data);
    }, [user])

    return (
        <Container>
            <div className='flex flex-col-reverse lg:flex-row gap-x-5 my-5'>
                <div className='lg:w-[60%] mt-2 lg:mt-0'>
                    {!myCart && <div role="alert" className="alert alert-warning alert-soft">
                        <span>No product in your cart.</span>
                    </div>}

                    <div className='lg:hidden block'>
                        <h1>cart summary</h1>
                    </div>

                </div>

                <div className='lg:w-[40%] bg-linear-to-bl from-orange-50 to-green-50 p-2'>
                    <div>
                        <h1 className='heading'>Shipping Address</h1>
                        {
                            user && <div>
                                <p>{user.name}</p>
                                <p>{user.phone}</p>
                                <p>{user.address}</p>
                            </div>
                        }
                    </div>

                    <div className='hidden lg:block'>
                        <h1>cart summary</h1>
                    </div>
                </div>
            </div>
        </Container>
    )
}
