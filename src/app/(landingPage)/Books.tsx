import BookCard from '@/components/bookCard/BookCard'
import Container from '@/components/Container'
import { getAllBooks, getCategoryBooks } from '@/services/Services'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type TBook = {
    _id: string,
    name: string,
    image: string,
    rating: number,
    price: number,
    writer: { name: string }
}

export default async function Books() {

    const books = await getAllBooks();
    const magazines = await getCategoryBooks("68dab2661ee0c4ada842f3a8");

    return (
        <div>
            <section>
                <Container>
                    <div className='grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-1'>
                        {
                            books.data.map((book: TBook) => (
                                <div key={book._id}>
                                    <BookCard book={book}></BookCard>
                                </div>
                            ))
                        }
                    </div>

                    <div className='flex justify-center mt-2'>
                        <Link href="/allBooks">
                            <button className="btn btn-outline btn-secondary">See All Books</button>
                        </Link>
                    </div>
                </Container>
            </section>

            <section className='mt-10 bg-linear-to-bl from-orange-50 to-green-50 py-5'>
                <Container>
                    <h1 className='heading mb-5'>Magazines</h1>
                    <div className='grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-1'>
                        {
                            magazines.data.map((book: TBook) => (
                                <div key={book._id}>
                                    <BookCard book={book}></BookCard>
                                </div>
                            ))
                        }
                    </div>
                </Container>
            </section>
        </div>
    )
}
