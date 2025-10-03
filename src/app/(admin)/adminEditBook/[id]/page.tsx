"use client"

import Container from '@/components/Container'
import { UserIcon } from '@/icons/Icons';
import { booksApi } from '@/redux/features/bookApi';
import { useAppDispatch } from '@/redux/hooks'
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

export default function page({ params }: { params: Promise<{ id: string }> }) {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const [image, setImage] = useState("")
    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)

    useEffect(() => {
        const fn = async () => {
            const { id } = await params;
            const res = await dispatch(booksApi.endpoints.getSingleBook.initiate({ id }));
            if (res.data) {
                console.log(res.data)
            }
        };
        fn()
    }, [page])




    const handlePhoto = (image: any) => {

    }
    const handleLogout = () => {

    }



    let content = null;
    if (isLoading) {
        content = <h1>Loading...</h1>
    }
    else if (!isLoading && error) {
        content = <div role="alert" className="alert alert-error alert-soft">
            <span>{error}</span>
        </div>
    }
    else if (!isLoading && !error) {
        content = <div>
            <div className='lg:flex gap-x-2'>
                <div className='lg:w-1/2 flex lg:flex-col justify-between'>
                    <div>
                        {
                            image ? <Image height={200} width={200} src={image} alt={name}></Image> :
                                <UserIcon w={200}></UserIcon>
                        }

                        <label className='cursor-pointer hover:text-blue-700' htmlFor="inputImage">Change Image</label>
                        <input onChange={(e) => handlePhoto(e.target.files![0])} className='hidden' type="file" id="inputImage" />
                    </div>
                    <div>
                        <button
                            onClick={() => handleLogout()}
                            className="btn btn-soft btn-warning">
                            Log Out
                        </button>
                    </div>
                </div>
                <div className='lg:w-1/2 mt-5 lg:mt-0'>
                    <label htmlFor="">Name:</label>
                    <input
                        className='border outline-0 p-1 w-full rounded'
                        type="text"
                    />

                    <p className='mt-2'>Email:</p>
                    <input
                        className='border border-gray-200 text-gray-400 cursor-not-allowed outline-0 p-1 w-full rounded'
                        disabled
                    />

                    <p className='mt-2'>Phone:</p>
                    <input
                        className='border outline-0 p-1 w-full rounded'
                        type="text"
                        placeholder='Enter your phone number'
                    />

                    <p className='mt-2'>Address:</p>
                    <textarea
                        className='border outline-0 p-1 w-full rounded'
                        placeholder='Write your shipping address'
                    />

                    {/* <button onClick={handleUpdate} disabled={updateLoading} className="btn btn-soft btn-accent w-full">
                        {
                            updateLoading ? "updating" : "update"
                        }
                    </button> */}

                </div>
            </div>
        </div>
    }



    return (
        <div className='my-5'>
            <Container>
                <div></div>
            </Container>
        </div>
    )
}
