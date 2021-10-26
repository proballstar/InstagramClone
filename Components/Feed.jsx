import React from 'react'
import Posts from './Posts'
import Stores from './Stores'
import MiniProfile from './MiniProfile'
import Suggestions from './Suggestions'
import { useSession } from 'next-auth/react'

export default function Feed() {

    const { data: session } = useSession()

    return (
        <main className={`${!session && "!grid-cols-1 !max-w-3xl"}  grid gap-x-3 ols-1 gap-x- md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl max-auto`}>
            <section className='col-span-2'>
                <Stores />
                <Posts />
            </section>
            {session && (
                <section className='hidden col-span-2 xl:inline-grid md:col-span-1'>
                    <div className='fixed top-20'>
                        <MiniProfile />
                        <Suggestions />
                    </div>
                </section>  
            )}
        </main>
    )
}
