import Link from 'next/link'
import React from 'react'

export default function page() {
    return (
        <div className='max-w-5xl mx-auto my-5'>
            <div className='grid lg:grid-cols-2 gap-4'>
                <Link href="/adminAllBooks" className='w-full p-4 border border-gray-300 rounded-xl'>
                    All Books
                </Link>
                <div className='w-full p-4 border border-gray-300 rounded-xl'>
                    All Writers
                    </div>
                <div className='w-full p-4 border border-gray-300 rounded-xl'>All Orders</div>
                <div className='w-full p-4 border border-gray-300 rounded-xl'>All Orders</div>
            </div>
        </div>
    )
}
