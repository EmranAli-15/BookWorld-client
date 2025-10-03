"use client"

import BookCard from '@/components/bookCard/BookCard'
import Container from '@/components/Container'
import { booksApi } from '@/redux/features/bookApi'
import { useAppDispatch } from '@/redux/hooks'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'

export default function page() {
    const dispatch = useAppDispatch();

    const [page, setPage] = useState(1);
    const [noMoreBooks, setNoMoreBooks] = useState(false);
    const [books, setBooks] = useState<any>([]);


    useEffect(() => {
        const fn = async () => {
            const { data } = await dispatch(booksApi.endpoints.getBooks.initiate({ page: page, limit: 10 })).unwrap()
            setBooks([...books, ...data]);
            if (data.length < 10) setNoMoreBooks(true);
        };

        fn()
    }, [page])

    return (
        <div className='my-5'>
            <Container>
                <div className='grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-1'>
                    {
                        books.length > 0 && books.map((book: any) => (
                            <Link href={`/adminEditBook/${book._id}`} key={book._id} className='bg-linear-to-bl from-orange-50 to-green-50'>
                                <div className='flex justify-center'>
                                    <Image height={280} width={200} src="https://rokbucket.rokomari.io/ProductNew20190903/260X372/Tinti_Sena_Ovuthan_O_kisu_Na_Bola_Kotha-L_Cornel_Re_M_A_Hamid_PSC-82e09-61329.jpg" alt={book.name}></Image>
                                </div>
                                <div className='px-2 mt-2'>
                                    <p className='line-clamp-2'>{book.name}</p>
                                    <p className='line-clamp-1 text-sm'>{book.writer.name}</p>
                                    <p>{book.rating} ({Math.floor(Math.random() * 5) + 1})</p>
                                    <p className='font-medium text-lg'><span className='text-orange-500'>TK </span>{book.price}</p>
                                </div>
                            </Link>
                        ))
                    }
                </div>

                <div className='flex justify-center mt-2'>
                    <button disabled={noMoreBooks} onClick={() => setPage(page + 1)} className="btn btn-outline btn-secondary">
                        {noMoreBooks ? "NO MORE BOOKS" : "Load More"}
                    </button>
                </div>
            </Container>
        </div>
    )
}
