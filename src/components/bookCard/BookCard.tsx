import Image from 'next/image'
import React from 'react'
import AddCardButton from './AddCardButton'


type TBook = {
    _id: string,
    rating: number,
    price: number,
    name: string,
    writer: { name: string }
}

export default function BookCard({ book }: { book: TBook }) {
    return (
        <div className='bg-linear-to-bl from-orange-50 to-green-50'>
            <div className='flex justify-center'>
                <Image height={280} width={200} src="https://rokbucket.rokomari.io/ProductNew20190903/260X372/Tinti_Sena_Ovuthan_O_kisu_Na_Bola_Kotha-L_Cornel_Re_M_A_Hamid_PSC-82e09-61329.jpg" alt={book.name}></Image>
            </div>
            <div className='px-2 mt-2'>
                <p className='line-clamp-2'>{book.name}</p>
                <p className='line-clamp-1 text-sm'>{book.writer.name}</p>
                <p>{book.rating} ({Math.floor(Math.random() * 5) + 1})</p>
                <p className='font-medium text-lg'><span className='text-orange-500'>TK </span>{book.price}</p>
                <AddCardButton book={book}></AddCardButton>
            </div>
        </div>
    )
}
