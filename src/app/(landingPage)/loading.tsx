import Container from '@/components/Container'
import React from 'react'

export default function loading() {
    return (
        <Container>
            <div className='flex items-center justify-center min-h-[80dvh]'>
                <div className='loader'></div>
            </div>
        </Container>
    )
}
