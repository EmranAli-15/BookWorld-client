import React from 'react'

export default function loading() {
    return (
        <div className='max-w-5xl mx-auto px-2 my-5'>
            <div className='lg:flex justify-between'>
                <div className='lg:w-[30%]'>
                    <div className='bg-slate-50 rounded p-2 flex items-center justify-center'>
                        <div className='h-[300px] w-[200px] bg-slate-200 rounded'></div>
                    </div>
                </div>
                <div className='lg:w-[65%]'>
                    <h1 className='h-7 w-[70%] bg-slate-200'></h1>
                    <p className='mt-2 h-4 w-[40%] bg-slate-200 rounded'></p>
                    <p className='mt-2 h-4 w-[42%] bg-slate-200 rounded'></p>
                    <p className='mt-2 h-4 w-[45%] bg-slate-200 rounded'></p>
                    <p className='mt-3 h-3 w-full bg-slate-200 rounded'></p>
                    <p className='mt-2 h-3 w-[70%] bg-slate-200 rounded'></p>
                    <h1 className='mt-3 h-6 w-[70%] bg-slate-200 rounded'></h1>
                    <div className='mt-4 w-[40%]'>
                        <div className='h-7 w-[70%] bg-slate-200 rounded'></div>
                    </div>
                </div>
            </div>

            <div className='mt-[50px]'>
                <p className='h-4 w-full rounded bg-slate-200'></p>
                <p className='h-4 w-full mt-1 rounded bg-slate-200'></p>
                <p className='h-4 w-[60%] mt-1 rounded bg-slate-200'></p>
            </div>
        </div>
    )
}
