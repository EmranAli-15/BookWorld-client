"use client"

import Container from '@/components/Container'
import { useUser } from '@/contextProvider/ContextProvider'
import { useGetUserQuery } from '@/redux/features/userApi'
import React, { useEffect, useState } from 'react'

export default function page() {
  const { user } = useUser();
  const [error, setError] = useState("");

  const { data, isError, isLoading, isSuccess, error: resErr } = useGetUserQuery(user?.userId);

  useEffect(() => {
    if (isError) {
      const err = resErr as { data: { message: string } }
      setError(err.data.message)
    }
  }, [isError])


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
    content = <h1>User Fetched.</h1>
  }

  return (
    <Container>
      <div>
        {content}
      </div>
    </Container>
  )
}
