"use client"

import React, { useEffect, useState } from 'react'


import logo from "../../../../public/logo.png"
import Image from 'next/image'
import Container from '@/components/Container'
import Link from 'next/link'
import Options from './Options'
import { useAppDispatch } from '@/redux/hooks'
import { booksApi } from '@/redux/features/bookApi'
import { debounce } from '@/utils/debounce'

export default function NavbarForPc() {
    const dispatch = useAppDispatch();
    const [data, setData] = useState([]);
    const [text, setText] = useState("");


    const handleSearch = () => {
        const fetchData = async () => {
            if (text) {
                const res = await dispatch(booksApi.endpoints.searchBook.initiate({ text })).unwrap();
                setData(res.data);
                console.log(res)
            } else {
                setData([]);
            }
        };
        fetchData();
    };

    useEffect(() => {
        debounce(handleSearch);
    }, [text])


    return (
        <Container>
            <div className="lg:flex hidden justify-between items-center p-1 border-b border-gray-200">
                <div className='flex items-center gap-x-2'>
                    <Link href="/"><Image width={50} src={logo} alt='BW'></Image></Link>
                    <div className="w-auto">
                        <p className='text-2xl font-medium'><span className='text-green-400'>Book </span><span className='text-orange-400'>World</span></p>
                    </div>
                </div>

                <div className="w-[40%]">
                    <form>
                        <input
                            onChange={(e) => setText(e.target.value)}
                            className="border-[1px] outline-0 border-orange-400 w-full px-3 py-2 rounded-3xl"
                            placeholder="search by book name or author."
                            required
                            type="search"
                            name="search"
                        />
                    </form>
                </div>

                <Options></Options>
            </div>


            <div className='w-full flex justify-center'>
                <div className='relative w-[800px]'>
                    {
                        data.length > 0 && <div className='w-full z-999 shadow-2xl absolute max-h-[300px] overflow-y-scroll'>
                            <div className=' mx-auto -mt-3 bg-white'>
                                {
                                    data.map((book: any) => {
                                        return <Link href={`/bookDetails/${book._id}`} key={book._id}>
                                            <div onClick={() => setData([])} className='mt-3 cursor-pointer p-2 flex gap-x-2'>
                                                <Image className='h-16 w-11' src={book.image} height={50} width={50} alt={book.name}></Image>
                                                <div className='w-full'>
                                                    <p className='p1 hover:text-orange-500'>{book.name}</p>
                                                    <div className='flex justify-between w-full'>
                                                        <p className='p2'>{book.writerData.name}</p>
                                                        <p className='p2 mr-2'>Tk {book.price}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    })
                                }
                            </div>
                        </div>
                    }
                </div>
            </div>
        </Container>
    )
}
