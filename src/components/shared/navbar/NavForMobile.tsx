"use client"

import React, { useEffect, useState } from 'react'

import styles from './navbar.module.css'


import logo from "../../../../public/logo.png"
import Image from 'next/image'
import { CloseIcon, MenuIcon } from '@/icons/Icons';
import Options from './Options'
import Link from 'next/link'
import { useAppDispatch } from '@/redux/hooks'
import { booksApi } from '@/redux/features/bookApi'
import { debounce } from '@/utils/debounce'


export default function NavForMobile({ categories, writers }: { categories: any, writers: any }) {
    const dispatch = useAppDispatch();

    const [data, setData] = useState([]);
    const [text, setText] = useState("");
    const [drawer, setDrawer] = useState(false);


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
        <div>
            <div className="flex justify-between lg:hidden items-center p-2 border-b border-gray-200">
                <div className="flex items-center gap-x-2">
                    <button onClick={() => setDrawer(true)}>
                        <MenuIcon></MenuIcon>
                    </button>
                    <Link href="/"><Image width={40} src={logo} alt='BW'></Image></Link>
                </div>

                <div onClick={() => setDrawer(false)} className={`${drawer ? 'h-[100dvh] w-[100vw] absolute bg-[#00000040] z-10 top-0 left-0' : ''}`}></div>

                <div className={`${drawer ? [styles.open] : styles.close} ${styles.drawer} px-2`}>
                    <div className="flex justify-between items-center py-2">
                        <p className='text-xl font-bold'><span className='text-green-400'>Book </span><span className='text-orange-400'>World</span></p>
                        <button
                            onClick={() => setDrawer(false)}
                            className='font-bold text-3xl p-2'>
                            <CloseIcon></CloseIcon>
                        </button>
                    </div>
                    <hr className="text-gray-200" />
                    <div className="overflow-auto h-[calc(100dvh-65px)]">
                        <h1 className='text-xl font-medium text-orange-400'>Categories</h1>
                        <ul>
                            {
                                categories.data.map((category: any) => (
                                    <Link
                                        href={`/categoryBooks/${category._id}`}
                                        key={category._id}
                                        className='flex items-center gap-x-1'
                                    >
                                        <span>&#9679;</span>
                                        {category.name}
                                    </Link>
                                ))
                            }
                        </ul>

                        <h1 className='text-xl font-medium text-orange-400 mt-3'>Writers</h1>
                        <ul>
                            {
                                writers.data.map((writer: any) => (
                                    <Link href={`/writerBooks/${writer._id}`}
                                        key={writer._id}
                                        className='flex items-center gap-x-1'
                                    >
                                        <span>&#9679;</span>
                                        {writer.name}
                                    </Link>
                                ))
                            }
                        </ul>
                    </div>
                </div>

                <Options></Options>

            </div>

            <div className="block lg:hidden py-1 bg-green-50">
                <form className="w-full flex justify-center">
                    <input
                        onChange={(e) => setText(e.target.value)}
                        className="border-[1px] outline-0 border-orange-400 w-[90%] px-3 py-2 rounded-3xl"
                        placeholder="search by book name or author."
                        required
                        type="search"
                        name="search"
                    />
                </form>
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

        </div>
    )
}
