"use client"

import Container from '@/components/Container'
import { useUser } from '@/contextProvider/ContextProvider'
import { useGetUserQuery } from '@/redux/features/userApi'
import React from 'react'

export default function page() {
  const { user } = useUser();

  const { data, isError, isLoading, isSuccess } = useGetUserQuery(user?.userId);

  let content = null;
  if (isLoading) {
    content = <h1>Loading...</h1>
  }
  else if (!isLoading && isError) {
    content = <h1>Something Wrong...</h1>
  }
  else if (!isLoading && !isError && isSuccess) {
    console.log(data.data);
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
