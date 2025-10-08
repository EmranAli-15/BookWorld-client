import React from 'react'

export default function BookCardSkleton() {
    return (
        <div>
            <div className='grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-1'>
                {
                    Array(8).fill(null).map((c: any, index: number) => {
                        return (
                            <div key={index} className='animate-pulse'>
                                <div className='rounded flex items-center justify-center bg-slate-50 p-4'>
                                    <div className='rounded w-[120px] h-[150px] bg-slate-200'></div>
                                </div>
                                <p className='rounded w-[70%] mt-3 h-4 bg-slate-200'></p>
                                <p className='rounded w-[50%] my-1 h-4 bg-slate-200'></p>
                                <p className='rounded w-[20%] h-4 bg-slate-200'></p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
