import Image from 'next/image'
import React from 'react'
import AddCardButton from './AddCardButton'
import Link from 'next/link'


type TBook = {
    _id: string,
    rating: number,
    price: number,
    image: string,
    name: string,
    quantity: number,
    writer: { name: string }
}

export default function BookCard({ book }: { book: TBook }) {
    return (
        <div className='bg-linear-to-bl from-orange-50 to-green-50 h-full flex flex-col py-1 justify-between'>
            <Link href={`/bookDetails/${book._id}`}>
                <div className='flex justify-center h-[210px]'>
                    <Image height={210} width={150} src={book.image} alt={book.name}></Image>
                </div>
                <div className='px-2 mt-2'>
                    <p className='line-clamp-2'>{book.name}</p>
                    <p className='line-clamp-1 text-sm description'>{book.writer.name}</p>
                    <p>{book.rating} ({book.quantity})</p>
                    <p className='font-medium text-lg'><span className='text-orange-500'>TK </span>{book.price}</p>
                </div>
            </Link>
            <AddCardButton book={book}></AddCardButton>
        </div>
    )
}
