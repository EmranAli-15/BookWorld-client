"use client"

import Container from '@/components/Container';
import { useUser } from '@/contextProvider/ContextProvider';
import { CashOnDeliveryIcon, CreditCardIcon } from '@/icons/Icons';
import { useCreateMyOrderMutation } from '@/redux/features/bookApi';
import { useAppSelector } from '@/redux/hooks'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function page() {
    const router = useRouter()
    const { user } = useUser();
    const data = useAppSelector(state => state.myCart.orderDetails);

    const tk = data.reduce((acc, x) => acc + (x.price * x.need), 0)

    const [checked, setChecked] = useState(true);


    const [createOrder, { isLoading, isError, isSuccess }] = useCreateMyOrderMutation();

    const handleSubmitOrder = () => {
        const orderData = data.map((book: any) => {
            return (
                { productId: book._id, quantity: book.need }
            )
        });
        const finalData = {
            userId: user?.userId,
            products: orderData
        }
        createOrder(finalData)
    };

    useEffect(() => {
        if (isSuccess) {
            router.push("/");
        }
    }, [isSuccess])

    return (
        <Container>
            <div className='flex w-auto overflow-x-auto my-2 md:my-5'>
                {
                    data.map((book: any) => <div key={book._id} className='bg-white rounded p-2 relative w-40'>
                        <div className='flex justify-center w-40'>
                            <Image
                                height={300}
                                width={200}
                                className='h-40 w-30'
                                alt={book.name}
                                src={book.image}
                            ></Image>
                        </div>
                        <div className='flex justify-center w-40'>
                            <div className='flex items-center justify-between w-30'>
                                <p>tk {book.price}</p>
                                <p className='p2'>{book.need} x pcs</p>
                            </div>
                        </div>
                    </div>)
                }
            </div>
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
                            <button disabled={isLoading} onClick={handleSubmitOrder} className='btn btn-secondary w-full h-16 mt-2'>
                                {
                                    isLoading ? "wait..." : "Confirm Order"
                                }
                            </button>
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
