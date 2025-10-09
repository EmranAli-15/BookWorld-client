"use client"
import Cookies from 'js-cookie'

import Container from '@/components/Container'
import { useUser } from '@/contextProvider/ContextProvider'
import { UserIcon } from '@/icons/Icons'
import { useGetUserQuery, useUpdataUserMutation } from '@/redux/features/userApi'
import { uploadImage } from '@/utils/uploadImage'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'

export default function page() {
  const { user, setLoading } = useUser();
  const router = useRouter();

  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("");
  const [updateImage, SetUpdateImage] = useState<File | "">("");

  const { data, isError, isLoading, isSuccess, error: resErr } = useGetUserQuery(user?.userId);
  const [updateUserFn, { isError: updateError, isSuccess: updateSuccess, isLoading: updateLoading }] = useUpdataUserMutation();


  const handlePhoto = (e: File) => {
    setImage(URL.createObjectURL(e));
    SetUpdateImage(e);
  };

  const handleUpdate = async () => {
    let newImage = "";
    if (image) {
      newImage = await uploadImage(updateImage) || "";
    };

    const data = {
      name, image: newImage, phone, address, email
    }

    const finalData = { id: user?.userId, data }
    updateUserFn(finalData);
  };

  const handleLogout = () => {
    signOut();
    router.push("/");
    Cookies.remove("token");
    setLoading(true);
  }


  useEffect(() => {
    if (isError) {
      const err = resErr as { data: { message: string } }
      setError(err.data.message)
    };

    if (isSuccess) {
      setName(data.data.name)
      setEmail(data.data.email)
      setPhone(data.data.phone || "")
      setAddress(data.data.address || "")
      setImage(data.data.image)
    }
  }, [isError, isSuccess]);

  useEffect(() => {
    document.title = "My Profile"
  }, [])


  let content = null;
  if (isLoading) {
    content = <h1>Loading...</h1>
  }
  else if (!isLoading && isError) {
    content = <div role="alert" className="alert alert-error alert-soft">
      <span>{error}</span>
    </div>
  }
  else if (!isLoading && !isError && isSuccess) {
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
          />

          <p className='mt-2'>Email:</p>
          <input
            className='border border-gray-200 text-gray-400 cursor-not-allowed outline-0 p-1 w-full rounded'
            value={email}
            disabled
          />

          <p className='mt-2'>Phone:</p>
          <input
            className='border outline-0 p-1 w-full rounded'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="text"
            placeholder='Enter your phone number'
          />

          <p className='mt-2'>Address:</p>
          <textarea
            className='border outline-0 p-1 w-full rounded'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder='Write your shipping address'
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
    <Container>
      <div className='my-5'>
        {content}
      </div>
    </Container>
  )
}
