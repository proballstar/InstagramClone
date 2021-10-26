import React from 'react'
import { useSession, signOut } from 'next-auth/react'

export default function MiniProfile() {

    const { data: session } = useSession()
    
    return (
        <div className='flex items-center justify-between ml-10 mt-14'>
            <img className='w-16 h-16 border rounded-full' src={session?.user?.image} alt='Your Profile' />
            <div>
                <h1 className='font-bold'>{session?.user?.username}</h1>
                <h3 className='text-sm text-gray-400'>Welcome to Instagram</h3>
            </div>

            <button className='ml-2 font-semibold text-blue-400 ptext-sm' onClick={() => signOut()}>Sign Out</button>
        </div>
    )
}
