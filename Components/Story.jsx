import React from 'react'

export default function Story({ img, username}) {
    return (
        <div>
            <img className='rounded-full w-14 h-14 p-[1.5px] border-2 object-contain cursor-pointer border-red-500 hover:scale-110 transition transform duration-200 ease-out' src={img} alt="" />
            <p className='text-xs text-center truncate w-14'>{username}</p>
        </div>
    )
}
