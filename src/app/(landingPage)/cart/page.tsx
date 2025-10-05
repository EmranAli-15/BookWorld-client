"use client"

import Container from '@/components/Container'
import { useUser } from '@/contextProvider/ContextProvider';
import { booksApi } from '@/redux/features/bookApi';
import { removeOrderDetails, resetOrderDetails, setOrderDetails } from '@/redux/features/bookSlice';
import { useAppDispatch } from '@/redux/hooks';
import { getLocalCartData } from '@/utils/localCart';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

export default function Cart() {
    const dispatch = useAppDispatch();
    const { user } = useUser();
    const [myCart, setMyCart] = useState<any>([]);
    const [loading, setLoading] = useState(true);

    const [totalProductPrice, setTotalProductPrice] = useState(0);


    const handleSelection = ({ checked, book }: { checked: boolean, book: any }) => {
        const f = myCart.find((c: any) => c._id == book._id).isChecked = checked;
        const index = myCart.indexOf(f);
        let updatedCart = myCart;
        updatedCart[index] = f;
        setMyCart(updatedCart);

        const details = { userId: user?.userId, productId: book._id, price: book.needPrice };
        if (checked) {
            setTotalProductPrice(totalProductPrice + book.needPrice);
            dispatch(setOrderDetails(details));
        } else {
            setTotalProductPrice(totalProductPrice - book.needPrice);
            dispatch(removeOrderDetails(details));
        }
    };


    const updateQuantity = ({ id, newQ }: { id: string, newQ: number }) => {
        setMyCart((prevItems: any) =>
            prevItems.map((item: any) =>
                item._id === id ? { ...item, need: newQ, needPrice: item.price * newQ } : item
            )
        );
    };

    const incrementQuantity = (id: string) => {
        const f = myCart.find((item: any) => (item._id === id))
        updateQuantity({ id, newQ: f.need + 1 });
        if (f.isChecked) setTotalProductPrice(totalProductPrice + f.price)
    };

    const decrementQuantity = (id: string) => {
        const f = myCart.find((item: any) => (item._id === id))
        if (f.need > 1) {
            updateQuantity({ id, newQ: f.need - 1 });
            if (f.isChecked) setTotalProductPrice(totalProductPrice - f.price)
        }
    };


    useEffect(() => {
        const f = myCart.find((c: any) => c.isChecked);
        if (!f)
            dispatch(resetOrderDetails());
    }, [])

    useEffect(() => {
        const getMyCart = async () => {
            const data = await dispatch(booksApi.endpoints.getMyCart.initiate(user.userId)).unwrap();
            const simpleForm = data.data.map((data: any) => ({
                _id: data.productId._id,
                name: data.productId.name,
                image: data.productId.image,
                price: data.productId.price,
                quantity: data.productId.quantity,
                need: 1,
                needPrice: data.productId.price,
                isChecked: false,
            }));
            setMyCart(simpleForm);
            setLoading(false)
        };

        if (user?.userId) {
            getMyCart();
        }
        else {
            const cart = getLocalCartData();
            const addNeedToCart = cart.map((c: any) => {
                return ({
                    ...c,
                    need: 1,
                    needPrice: c.price,
                    isChecked: false,
                })
            })
            setMyCart(addNeedToCart)
            setLoading(false)
        };
    }, [user]);
    useEffect(() => {
        document.title = "My Cart"
    }, [])


    let content = null;

    if (!loading && myCart) {
        content = myCart.map((book: any, index: number) => {
            return (
                <div className='flex justify-between border-b-2 border-b-amber-100 p-2 bgColor' key={index}>
                    <div className='flex items-center gap-x-1'>
                        <div>
                            <input onChange={(e) => handleSelection({ checked: e.target.checked, book })} type="checkbox" defaultChecked={false} className="checkbox checkbox-sm checkbox-secondary" />
                        </div>
                        <Link href={`/bookDetails/${book._id}`} className='w-[110px]'>
                            <Image width={90} height={130} src={book?.image} alt={book.name}></Image>
                        </Link>
                    </div>
                    <div className='flex items-center justify-between w-full'>
                        <div>
                            <h1 className='text-lg mb-1'>{book.name}</h1>
                            <p>{book.quantity} pcs available</p>
                            <div className='flex items-center'>

                                <button onClick={() => decrementQuantity(book._id)} className='btn p-3 size-6'>-</button>
                                <p className='p-2' >{book.need}</p>
                                <button onClick={() => incrementQuantity(book._id)} className='btn p-3 size-6'>+</button>

                            </div>
                        </div>
                        <div>
                            <h1 className='text-xl font-medium text-red-600'>TK {book.needPrice}</h1>
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
                        {myCart.length == 0 ? <div role="alert" className="alert alert-warning alert-soft">
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
                        totalProductPrice > 80 && <div>
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
