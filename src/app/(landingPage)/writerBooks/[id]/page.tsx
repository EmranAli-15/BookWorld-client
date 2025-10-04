import AddCardButton from '@/components/bookCard/AddCardButton';
import BookCard from '@/components/bookCard/BookCard';
import Container from '@/components/Container';
import { getBookByWriter, getSingleBook } from '@/services/Services'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export default async function page({ params }: { params: Promise<{ id: string }> }) {

    const { id } = (await params)
    const { data } = await getBookByWriter(id);
    console.log(data)

    return (
        <div className='my-5'>
            <Container>
                <h1 className='heading mb-2'>{data[0].writer.name}</h1>
                <div className='grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-1'>
                    {
                        data.length > 0 && data.map((book: any) => (
                            <div key={book._id}>
                                <BookCard book={book}></BookCard>
                            </div>
                        ))
                    }
                </div>
            </Container>
        </div>
    )
}
