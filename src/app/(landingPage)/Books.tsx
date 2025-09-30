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
                                <div key={book._id} className='bg-linear-to-bl from-orange-50 to-green-50 rounded-xl'>
                                    <div className='flex justify-center'>
                                        <Image height={280} width={200} src="https://rokbucket.rokomari.io/ProductNew20190903/260X372/Tinti_Sena_Ovuthan_O_kisu_Na_Bola_Kotha-L_Cornel_Re_M_A_Hamid_PSC-82e09-61329.jpg" alt={book.name}></Image>
                                    </div>
                                    <div className='px-2 mt-2'>
                                        <p className='line-clamp-2'>{book.name}</p>
                                        <p className='line-clamp-1 text-sm'>{book.writer.name}</p>
                                        <p>{book.rating} ({Math.floor(Math.random() * 5) + 1})</p>
                                        <p className='font-medium text-lg'><span className='text-orange-500'>TK </span>{book.price}</p>
                                    </div>
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
                                <div key={book._id} className='bg-linear-to-bl from-orange-50 to-green-50 rounded-xl'>
                                    <div className='flex justify-center'>
                                        <Image height={280} width={200} src={book.image} alt={book.name}></Image>
                                    </div>
                                    <div className='px-2 mt-2'>
                                        <p className='line-clamp-2'>{book.name}</p>
                                        <p className='line-clamp-1 text-sm'>{book.writer.name}</p>
                                        <p>{book.rating} ({Math.floor(Math.random() * 5) + 1})</p>
                                        <p className='font-medium text-lg'><span className='text-orange-500'>TK </span>{book.price}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </Container>
            </section>
        </div>
    )
}
