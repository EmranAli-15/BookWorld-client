"use client"

import Container from '@/components/Container'
import GoogleAuth from '@/components/googleAuth/GoogleAuth';
import { useUser } from '@/contextProvider/ContextProvider';
import { useUserLoginMutation, useUserRegisterMutation } from '@/redux/features/authApi';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';

export default function page() {
  const { setLoading } = useUser();
  const router = useRouter();

  const [name, setName] = useState("Emran");
  const [email, setEmail] = useState("emran@gmail.com");
  const [password, setPassword] = useState("123456");
  const [conPassword, setConPassword] = useState("123456");

  const [userRegister, { error: resError, isError, isLoading, isSuccess }] = useUserRegisterMutation();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (password !== conPassword) {
      toast.error("Password not matched.");
      return;
    }

    const data = {
      email, password, confirmPassword: conPassword, name
    };

    userRegister(data);
  };


  useEffect(() => {
    if (isSuccess) {
      router.push("/");
      setLoading(true);
    }
    if (isError) {
      const err = resError as any;
      toast.error(err.data.message)
    }
  }, [isError, isLoading, isSuccess]);


  return (
    <div>
      <Container>
        <ToastContainer position="top-center" autoClose={1000} theme="light" />
        <div className="hero">
          <div className="hero-content flex-col w-full">
            <div className="text-center lg:text-left">
              <h1 className="heading text-center"><span className='text-orange-400'>BOOK</span> <span className='text-green-400'>WORLD</span></h1>
              <h1 className="text-3xl text-center font-bold">Register now!</h1>
            </div>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <label className="label">Name</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="Name"
                    required
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />

                  <label className="label">Email</label>
                  <input
                    type="email"
                    className="input"
                    placeholder="Email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />

                  <label className="label">Password</label>
                  <input
                    type="password"
                    className="input"
                    placeholder="Password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />

                  <label className="label">Confirm Password</label>
                  <input
                    type="password"
                    className="input"
                    placeholder="Password"
                    required
                    onChange={(e) => setConPassword(e.target.value)}
                    value={conPassword}
                  />
                  <Link href="/login" className='text-blue-700'>Login</Link>
                  <button type='submit' className="btn btn-neutral mt-4 w-full">
                    {
                      isLoading ? "Loading .." : "Register"
                    }
                  </button>
                </form>
                <GoogleAuth></GoogleAuth>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
