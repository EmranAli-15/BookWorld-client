import Image from 'next/image'
import React from 'react'
import AddCardButton from './AddCardButton'
import Link from 'next/link'
import { HalfRatingIcon, RatingIcon } from '@/icons/Icons'


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
        <div className='bookCard h-full flex flex-col py-1 justify-between'>
            <Link href={`/bookDetails/${book._id}`}>
                <div className='flex justify-center'>
                    <Image className='w-[130px] h-[180px]' height={150} width={150} src={book.image} alt={book.name}></Image>
                </div>
                <div className='px-2 mt-2'>
                    <p className='line-clamp-2 p1 text-center'>{book.name}</p>
                    <p className='line-clamp-1 p2 text-center'>{book.writer.name}</p>
                    <div className='flex items-center gap-x-2 justify-center'>
                        <div className='flex items-center my-1'>
                            <RatingIcon w={13}></RatingIcon>
                            <RatingIcon w={13}></RatingIcon>
                            <RatingIcon w={13}></RatingIcon>
                            <RatingIcon w={13}></RatingIcon>
                            <HalfRatingIcon w={13}></HalfRatingIcon>
                        </div>
                        <span className='p2'>({book.quantity})</span>
                    </div>
                    <p className='font-medium text-center p1'>TK {book.price}</p>
                </div>
            </Link>
            <AddCardButton book={book}></AddCardButton>
        </div>
    )
}
