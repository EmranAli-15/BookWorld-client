"use client"

import Container from '@/components/Container'
import { useUser } from '@/contextProvider/ContextProvider';
import { booksApi } from '@/redux/features/bookApi';
import { removeOrderDetails, setOrderDetails } from '@/redux/features/bookSlice';
import { useAppDispatch } from '@/redux/hooks';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

export default function Cart() {
    const dispatch = useAppDispatch();
    const { user } = useUser();
    const [myCart, setMyCart] = useState<null | []>(null);
    const [loading, setLoading] = useState(true);

    const [totalProductPrice, setTotalProductPrice] = useState(0);


    const handleSelection = ({ checked, product }: { checked: boolean, product: any }) => {
        const details = { userId: user.userId, productId: product._id, price: product.price };
        if (checked) {
            setTotalProductPrice(totalProductPrice + product.price);
            dispatch(setOrderDetails(details));
        } else {
            setTotalProductPrice(totalProductPrice - product.price);
            dispatch(removeOrderDetails(details));
        }
    }

    useEffect(() => {
        const fn = async () => {
            const data = await dispatch(booksApi.endpoints.getMyCart.initiate(user.userId)).unwrap();
            setMyCart(data.data);
            setLoading(false)
        }

        if (user?.userId) {
            fn();
        }
        else {
            const cart = localStorage.getItem("cart");
            if (cart) {
                const data = JSON.parse(cart);
                setMyCart(data);
            }
        };
    }, [user])

    let content = null;

    if (!loading && myCart) {
        content = myCart.map((book: any) => {
            return (
                <div className='flex justify-between border-b-2 border-b-amber-100 p-2 bgColor' key={book._id}>
                    <div className='flex items-center gap-x-1'>
                        <div>
                            <input onChange={(e) => handleSelection({ checked: e.target.checked, product: book.productId })} type="checkbox" defaultChecked={false} className="checkbox checkbox-sm checkbox-secondary" />
                        </div>
                        <div className='w-[110px]'>
                            <Image width={90} height={130} src="https://rokbucket.rokomari.io/ProductNew20190903/130X186/Bishad_Shindu-Mir_Mosharrof_Hossain-f591a-277781.jpg" alt={book.productId.name}></Image>
                        </div>
                    </div>
                    <div className='flex items-center justify-between w-full'>
                        <div>
                            <h1 className='text-lg mb-1'>{book.productId.name}</h1>
                            <p>{book.productId.quantity} pcs available</p>
                        </div>
                        <div>
                            <h1 className='text-xl font-medium text-red-600'>TK {book.productId.price}</h1>
                        </div>
                    </div>
                </div>
            )
        });
    }


    return (
        <Container>
            <div className='flex flex-col-reverse lg:flex-row gap-x-5 my-5'>
                <div className='lg:w-[60%] mt-2 lg:mt-0'>
                    <div>
                        {!myCart ? <div role="alert" className="alert alert-warning alert-soft">
                            <span>No product in your cart.</span>
                        </div> :
                            <div>
                                {
                                    content
                                }
                            </div>
                        }
                    </div>
                </div>

                <div className='lg:w-[40%] lg:sticky lg:h-fit lg:top-16'>
                    <div className='bgColor p-2'>
                        <h1 className='heading text-center border-b border-gray-300'>Shipping Address</h1>
                        {
                            user && <div>
                                <p>{user.name}</p>
                                <p>{user.phone}</p>
                                <p>{user.address}</p>
                            </div>
                        }
                    </div>
                    <div className='bgColor p-2 mt-2'>
                        <h1 className='font-medium heading text-center border-b border-gray-300'>Checkout Summary</h1>
                        <h1 className='text-2xl font-bold description border-b border-dashed py-2 border-gray-300'>Sub-Total: <span className='font-bold'>TK {totalProductPrice}</span></h1>
                        <h1 className='description text-xl font-medium border-b border-dashed py-2 border-gray-300'>Delivery Charge: TK 80</h1>
                    </div>
                    {
                        totalProductPrice > 0 && <div>
                            <div className='bgColor mt-2'>
                                <h1 className='text-green-600 font-medium heading text-center'>Payable Total: <span className='text-red-600'>TK {totalProductPrice + 80}</span></h1>
                            </div>

                            <div className='mt-2'>
                                <Link href="/orderProcess">
                                    <button className='btn btn-secondary w-full'>Go For Order</button>
                                </Link>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </Container>
    )
}
