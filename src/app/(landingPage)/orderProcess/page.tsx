"use client"

import Container from '@/components/Container';
import { CashOnDeliveryIcon, CreditCardIcon } from '@/icons/Icons';
import { useAppSelector } from '@/redux/hooks'
import Link from 'next/link';
import React, { useState } from 'react'

export default function page() {
    const data = useAppSelector(state => state.myCart.orderDetails);

    const tk = data.reduce((acc, x) => acc + x.price, 0)

    const [checked, setChecked] = useState(true);

    return (
        <Container>
            <div className='lg:flex gap-x-5 my-5'>
                <div className='lg:w-1/2'>
                    <div className='bgColor flex items-center gap-x-3 p-3'>
                        <input onClick={() => setChecked(true)} type="checkbox" readOnly checked={checked} className="checkbox checkbox-sm checkbox-secondary" />
                        <CashOnDeliveryIcon></CashOnDeliveryIcon>
                        <p className='font-bold'>Cash On Delivery</p>
                    </div>
                    <div className='bgColor flex items-center gap-x-3 p-3 mt-1'>
                        <input onClick={() => setChecked(false)} type="checkbox" readOnly checked={!checked} className="checkbox checkbox-sm checkbox-secondary" />
                        <CreditCardIcon></CreditCardIcon>
                        <p className='font-bold'>Use Bank Account</p>
                    </div>
                </div>
                <div className='lg:w-1/2 bgColor mt-5 lg:mt-0'>
                    {
                        tk > 0 ? <div>
                            <h1 className='heading'>Payble Total: <span className='text-red-600'>TK {tk + 80}</span></h1>
                            <button className='btn btn-secondary w-full h-16 mt-2'>Confirm Order</button>
                        </div> :
                            <div>
                                <Link href="/cart">
                                    <button className='btn btn-secondary w-full h-16 mt-2'>GO BACK</button>
                                </Link>
                            </div>
                    }
                </div>
            </div>
        </Container>
    )
}
