import AddCardButton from '@/components/bookCard/AddCardButton';
import { getSingleBook } from '@/services/Services'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export default async function page({ params }: { params: Promise<{ id: string }> }) {

    const { id } = (await params)
    const { data } = await getSingleBook(id);

    return (
        <div className='max-w-5xl mx-auto px-2 my-5'>
            <div className='lg:flex justify-between'>
                <div className='lg:w-[30%]'>
                    <div className='h-[320px] w-[240px] p-4 border border-gray-300'>
                        <Image src={data.image} height={300} width={200} alt={data.name}></Image>
                    </div>
                </div>
                <div className='lg:w-[65%]'>
                    <h1 className='text-2xl font-medium my-2'>{data.name}</h1>
                    <p>By: <span className='text-blue-600'>{data.writer.name}</span></p>
                    <p>Category: <Link href={`/categoryBooks/${data.category._id}`} className='text-blue-600'>{data.category.name}</Link></p>
                    <p>***** &nbsp;&nbsp;&nbsp; {data.rating}</p>
                    <p>{data.summary.length > 130 ? data.summary.slice(0, 130) : data.summary} <a href='#more' className='text-blue-600'>more</a></p>
                    <h1 className='text-xl font-bold'>TK {data.price}</h1>
                    <div className='mt-3 w-[40%]'>
                        <AddCardButton book={data}></AddCardButton>
                    </div>
                </div>
            </div>

            <div className='mt-[50px]'>
                <p id='more'>{data.summary}</p>
            </div>
        </div>
    )
}
