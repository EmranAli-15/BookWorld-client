import React from 'react'

export default function CartSkleton() {
    return (
        <div>
            <div className='w-full'>
                {
                    Array(6).fill(null).map((c:any, index:any) => {
                        return(
                            <div key={index} className='flex gap-x-3 animate-pulse border mt-1 border-slate-100 p-2'>
                                <div className='w-[120px] h-[130px] bg-slate-200'></div>
                                <div className='w-full'>
                                    <p className='h-5 rounded w-[70%] bg-slate-200'></p>
                                    <p className='h-5 rounded my-2 w-[50%] bg-slate-200'></p>
                                    <p className='h-7 rounded w-10 bg-slate-200'></p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
