"use client"

import Cookies from 'js-cookie';

import Container from '@/components/Container'
import { UserIcon } from '@/icons/Icons';
import { booksApi, useUpdateBookMutation } from '@/redux/features/bookApi';
import { useAppDispatch } from '@/redux/hooks'
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { useUser } from '@/contextProvider/ContextProvider';
import { uploadImage } from '@/utils/uploadImage';

export default function page({ params }: { params: Promise<{ id: string }> }) {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { setLoading } = useUser();

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const [image, setImage] = useState("")
    const [name, setName] = useState("")
    const [quantity, setQuantity] = useState(0)
    const [updateImage, SetUpdateImage] = useState<File | "">("");

    const [bookId, setBookId] = useState("");




    const [updateBook, { isLoading: updateLoading, isError, isSuccess }] = useUpdateBookMutation();



    useEffect(() => {
        const fn = async () => {
            const { id } = await params;
            setBookId(id);
            const res = await dispatch(booksApi.endpoints.getSingleBook.initiate({ id })).unwrap();
            if (res.data) {
                setImage(res.data.image);
                setName(res.data.name);
                setQuantity(res.data.quantity);
            }
            setIsLoading(false)
        };
        fn()
    }, [page])




    const handlePhoto = (e: File) => {
        setImage(URL.createObjectURL(e));
        SetUpdateImage(e);
    };


    const handleLogout = () => {
        router.push("/");
        Cookies.remove("token");
        setLoading(true);
    }



    const handleUpdate = async () => {
        let newImage = "";
        if (image) {
            newImage = await uploadImage(updateImage) || "";
        };

        const data = {
            name, image: newImage, quantity
        }

        const finalData = { id: bookId, data }
        updateBook(finalData);
    };




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
                            image !== "set later" ? <Image height={200} width={200} src={image} alt={name}></Image> :
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
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className='border outline-0 p-1 w-full rounded'
                        type="text"
                    />

                    <p className='mt-2'>Quantity:</p>
                    <input
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        className='border outline-0 p-1 w-full rounded'
                        type="number"
                        placeholder='Enter your phone number'
                    />

                    <button onClick={handleUpdate} disabled={updateLoading} className="btn btn-soft btn-accent w-full">
                        {
                            updateLoading ? "updating" : "update"
                        }
                    </button>

                </div>
            </div>
        </div>
    }



    return (
        <div className='my-5'>
            <Container>
                {content}
            </Container>
        </div>
    )
}
