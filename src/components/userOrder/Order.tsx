"use client"
import { useUser } from '@/contextProvider/ContextProvider';
import { useGetMyOrderQuery } from '@/redux/features/bookApi';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import Container from '../Container';
import Image from 'next/image';

export default function Order() {

    const router = useRouter();
    const { user, setLoading } = useUser();

    const { data, isError, isLoading, isSuccess, error: resErr } = useGetMyOrderQuery(user?.userId);

    useEffect(() => {
        if (isSuccess) {
            console.log(data)
        }
    }, [isSuccess])



    let content = null;

    if (!isLoading && !isError && data.data.length > 0) {
        content = <div>
            {
                data.data.map((p: any) => {
                    return <div key={p._id} className='mt-5 p-2 bg-white'>
                        <p>Order Id: {p._id}</p>
                        <p>Status: <span className='text-green-500'>{p.status}</span></p>
                        {
                            p.all_orders.map((ap: any, idx: any) => {
                                return <div className='mt-4' key={idx}>
                                    <div className='flex gap-x-2'>
                                        <Image
                                            className='h-30 w-24'
                                            height={100}
                                            width={80}
                                            src={ap.product_details.image}
                                            alt={ap.product_details.name}
                                        >
                                        </Image>
                                        <div>
                                            <p className='p2'>{ap.product_details.name}</p>
                                            <p>TK {ap.price}</p>
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                })
            }
        </div>
    }

    return (
        <Container>
            <div>Order</div>
            {
                content
            }
        </Container>
    )
}
