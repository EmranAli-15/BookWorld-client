"use client"
import { useUser } from '@/contextProvider/ContextProvider';
import { useGetMyOrderQuery } from '@/redux/features/bookApi';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import Container from '../Container';

export default function Order() {

    const router = useRouter();
    const { user, setLoading } = useUser();

    console.log(user.userId)

    const { data, isError, isLoading, isSuccess, error: resErr } = useGetMyOrderQuery(user?.userId);

    useEffect(() => {
        if (isSuccess) {
            console.log(data)
        }
    }, [isSuccess])

    return (
        <Container>
            <div>Order</div>
        </Container>
    )
}
