"use client"

import { useUser } from '@/contextProvider/ContextProvider';
import { useAddToCartMutation } from '@/redux/features/bookApi';
import { addToMyCart } from '@/redux/features/bookSlice';
import { useAppDispatch } from '@/redux/hooks';
import { addToLocalCart } from '@/utils/localCart';
import React from 'react'

export default function AddCardButton({ book }: { book: any }) {
    const dispatch = useAppDispatch();
    const { user } = useUser();

    const [addCart] = useAddToCartMutation()

    const addToCart = () => {
        const data = { userId: user?.userId, productId: book._id }
        const forLocalCart = {
            _id: book._id,
            name: book.name,
            image: book.image,
            price: book.price,
            quantity: book.quantity,
        }
        if (!user) {
            addToLocalCart({forLocalCart});
            dispatch(addToMyCart());
        }
        else {
            addCart(data);
            dispatch(addToMyCart());
        }
    }

    return (
        <button onClick={() => addToCart()} className="btn btn-soft btn-info w-full mb-1">Add to cart</button>
    )
}
