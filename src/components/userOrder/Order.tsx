"use client"
import { useUser } from '@/contextProvider/ContextProvider';
import { useGetMyOrderQuery } from '@/redux/features/bookApi';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Container from '../Container';
import Image from 'next/image';

export default function Order() {

    const router = useRouter();
    const { user, setLoading } = useUser();
    const [tk, setTk] = useState(0);

    const { data, isError, isLoading, isSuccess, error: resErr } = useGetMyOrderQuery(user?.userId);

    const [sorted, setSorted] = useState<any>([]);

    // useEffect(() => {
    //     if (isSuccess) {
    //         const sortedData = data.data.sort((a: any, b: any) => {
    //             return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    //         });
    //         console.log(sortedData)
    //         setSorted(sortedData)
    //     }
    // }, [isSuccess])



    let content = null;

    if (!isLoading && !isError && data.data.length > 0) {
        content = <div>
            {
                data.data.map((p: any) => {
                    const tk = p.all_orders.reduce((acc: any, x: any) => acc + (x.price * x.quantity), 0)
                    return <div key={p._id} className='mt-5 p-2 md:p-5 bg-white rounded shadow'>
                        <p className='mb-2'>Paybal total: <span className='font-medium'>TK {tk + 80}</span></p>
                        <p>Order Id: {p._id}</p>
                        <p>Status: <span className='text-green-600'>{p.status}</span></p>
                        {
                            p.all_orders.map((ap: any, idx: any) => {
                                return <div className='mt-4' key={idx}>
                                    <div className='flex gap-x-2'>
                                        <Image
                                            className='h-34 w-24'
                                            height={100}
                                            width={80}
                                            src={ap.product_details.image}
                                            alt={ap.product_details.name}
                                        >
                                        </Image>
                                        <div>
                                            <p className='p2'>{ap.product_details.name}</p>
                                            <p>TK {ap.price}</p>
                                            <p className='p2'>{ap.quantity} x pcs</p>
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
            {
                content
            }
        </Container>
    )
}
