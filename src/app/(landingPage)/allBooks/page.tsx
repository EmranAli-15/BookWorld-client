"use client"

import BookCard from '@/components/bookCard/BookCard'
import BookCardSkleton from '@/components/bookCard/BookCardSkleton'
import Container from '@/components/Container'
import { booksApi } from '@/redux/features/bookApi'
import { useAppDispatch } from '@/redux/hooks'
import React, { useEffect, useState } from 'react'

export default function page() {
    const dispatch = useAppDispatch();

    const [page, setPage] = useState(1);
    const [noMoreBooks, setNoMoreBooks] = useState(false);
    const [books, setBooks] = useState<any>([]);

    const [loading, setLoading] = useState(true);
    const [loadMore, setLoadMore] = useState(false);


    useEffect(() => {
        setLoadMore(true);
        const fn = async () => {
            const { data } = await dispatch(booksApi.endpoints.getBooks.initiate({ page: page, limit: 10 })).unwrap()
            setBooks([...books, ...data]);
            if (data.length < 10) setNoMoreBooks(true);

            setLoadMore(false);
            setLoading(false);
        };

        fn()
    }, [page])

    return (
        <div className='my-5'>
            <Container>
                {
                    loading ? <BookCardSkleton></BookCardSkleton> :
                        <div className='grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-1'>
                            {
                                books.length > 0 && books.map((book: any) => (
                                    <div key={book._id}>
                                        <BookCard book={book}></BookCard>
                                    </div>
                                ))
                            }
                        </div>
                }

                <div className='flex justify-center mt-2'>
                    {!loadMore && <button disabled={noMoreBooks} onClick={() => setPage(page + 1)} className="btn btn-outline btn-secondary">
                        {noMoreBooks ? "NO MORE BOOKS" : "Load More"}
                    </button>}
                    {
                        loadMore && <div className='buttonLoader'></div>
                    }
                </div>
            </Container>
        </div>
    )
}
