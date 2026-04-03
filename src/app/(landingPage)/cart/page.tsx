"use client"

import Container from '@/components/Container'
import { useUser } from '@/contextProvider/ContextProvider';
import { booksApi, useDeleteFromCartMutation } from '@/redux/features/bookApi';
import { removeFromMyCart, removeOrderDetails, resetOrderDetails, setOrderDetails } from '@/redux/features/bookSlice';
import { useAppDispatch } from '@/redux/hooks';
import { deleteFromLocalCart, getLocalCartData } from '@/utils/localCart';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import CartSkleton from './CartSkleton';
import { DeleteIcon } from '@/icons/Icons';

export default function Cart() {
    const dispatch = useAppDispatch();
    const { user } = useUser();
    const [myCart, setMyCart] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [reloadForRemove, setReloadForRemove] = useState(false);

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



    const [deleteFromMyCart, { isLoading: cartDeleteLoading, isSuccess: cartDeleteSuccess }] = useDeleteFromCartMutation()


    const deleteFromCart = (id: string) => {
        if (!user) {
            deleteFromLocalCart(id);
            dispatch(removeFromMyCart());
            setReloadForRemove(!reloadForRemove)
        } else {
            const data = { productId: id, userId: user.userId };
            deleteFromMyCart(data);
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
    }, [user, reloadForRemove, cartDeleteSuccess]);

    useEffect(() => {
        document.title = "My Cart"
    }, []);


    let content = null;


    if (loading) {
        content = <CartSkleton></CartSkleton>
    }
    else if (!loading && myCart.length == 0) {
        content = <div role="alert" className="alert alert-warning alert-soft">
            <span>No product in your cart.</span>
        </div>
    }
    else if (!loading && myCart.length > 0) {
        content = myCart.map((book: any, index: number) => {
            return (
                <div className='flex justify-between bg-white mb-2 p-2' key={index}>
                    <div className='flex items-center gap-x-1'>
                        <div>
                            <input onChange={(e) => handleSelection({ checked: e.target.checked, book })} type="checkbox" defaultChecked={false} className="checkbox checkbox-sm checkbox-secondary" />
                        </div>
                        <Link href={`/bookDetails/${book._id}`} className='w-[110px]'>
                            <Image width={90} height={130} src={book?.image} alt={book.name}></Image>
                        </Link>
                    </div>
                    <div className='flex items-center justify-between w-full'>
                        <div className='lg:w-[70%]'>
                            <h1 className='p1 line-clamp-1'>{book.name}</h1>
                            <p className='p2 my-1'>{book.quantity} pcs available</p>
                            <div className='block lg:hidden'>
                                <h1 className='p1 font-medium'>tk <span className='text-red-600'>{book.needPrice}</span></h1>
                            </div>
                            <button
                                disabled={cartDeleteLoading}
                                onClick={() => deleteFromCart(book._id)}
                                className='hover:cursor-pointer mt-2'>
                                <DeleteIcon></DeleteIcon>
                            </button>
                        </div>
                        <div className='flex flex-col-reverse lg:flex-row items-center'>
                            <button onClick={() => decrementQuantity(book._id)} className='btn p-3 size-6'>-</button>
                            <p className='p-2' >{book.need}</p>
                            <button onClick={() => incrementQuantity(book._id)} className='btn p-3 size-6'>+</button>
                        </div>
                        <div className='hidden lg:block'>
                            <h1 className='p1 font-medium text-red-600'>tk {book.needPrice}</h1>
                        </div>
                    </div>
                </div>
            )
        });
    }


    return (
        <Container>
            <div className='flex flex-col-reverse lg:flex-row gap-x-5 my-5'>
                <div className='lg:w-[60%] mt-8 lg:mt-0'>
                    <div>
                        {
                            content
                        }
                    </div>
                </div>

                <div className='lg:w-[40%] bg-white lg:sticky lg:h-fit lg:top-16'>
                    <div className='p-2'>
                        <h1 className='h1 font-medium border-b py-2 border-gray-300'>Shipping Address</h1>
                        {
                            loading ? <div className='w-full mt-1'>
                                <p className='h-5 rounded w-[70%] bg-slate-200'></p>
                                <p className='h-5 rounded my-2 w-[50%] bg-slate-200'></p>
                                <p className='h-5 rounded w-[80%] bg-slate-200'></p>
                            </div> :
                                user && <div>
                                    <p className='p1'>{user?.name}</p>
                                    <p className='p2'>{user?.phone}</p>
                                    <p className='p2'>{user?.address}</p>
                                </div>
                        }
                    </div>
                    <div className='p-2 mt-2'>
                        <h1 className='h1 font-medium border-b border-gray-300 py-2'>Checkout Summary</h1>
                        <div className='flex items-center justify-between'>
                            <h1 className='p1 py-2'>Subtotal</h1>
                            <h1 className='p1'>tk {totalProductPrice}</h1>
                        </div>
                        <div className='border-b border-gray-300 border-dashed' />
                        <div className='flex items-center justify-between'>
                            <h1 className='p1 py-2'>Delivery charge</h1>
                            <h1 className='p1'>tk 80</h1>
                        </div>
                        <div className='border-b border-gray-300 border-dashed' />
                    </div>
                    {
                        totalProductPrice > 80 && <div>
                            <div className='flex items-center justify-between m-2'>
                                <h1 className='p1 font-medium'>Payable Total:</h1>
                                <h1 className='p1 font-medium'>tk {totalProductPrice + 80}</h1>
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
