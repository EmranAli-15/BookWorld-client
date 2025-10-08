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


            <div className='relative'>
                {
                    data.length > 0 && <div className='w-full shadow-2xl z-50 absolute bgColor'>
                        {
                            data.map((book: any) => {
                                return <Link href={`/bookDetails/${book._id}`} key={book._id}>
                                    <div onClick={() => setData([])} className='mt-3 hover:bg-white cursor-pointer p-1'>
                                        <h1>{book.name}</h1>
                                        <small className='text-[12px] description ml-2'>- {book.writerData.name}</small>
                                    </div>
                                </Link>
                            })
                        }
                    </div>
                }
            </div>
        </Container>
    )
}
