import React from 'react'
import Image from "next/image"
import { 
    SearchIcon,
    PlusCircleIcon,
    UserGroupIcon,
    HeartIcon,
    PaperAirplaneIcon,
    MenuIcon
} from '@heroicons/react/outline'
import { useSession, signOut, signIn } from 'next-auth/react'
import { HomeIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import { modalState } from '../atom/modalAtom'

export default function Header() {

    const [open, setOpen] = useRecoilState(modalState)
    const { data: session } = useSession()
    const router = useRouter()

    return (
        <div className='sticky top-0 z-50 bg-white shadow-sm border-b-1'>
            <div className='flex items-center justify-between max-w-6xl'>
                {/* Left */}
                <div onClick={() => router.push('/')} className='relative items-center hidden w-24 h-24 cursor-pointer lg:inline-grid lg:mx-auto '>
                    <Image src="https://links.papareact.com/ocw" layout='fill' objectFit='contain'
                        alt='instagram logo' />                 
                    </div>
                <div onClick={() => router.push('/')} className='relative items-center flex-shrink-0 w-10 h-10 cursor-pointer lg:hidden'>
                        <Image 
                            src="https://links.papareact.com/jjm"
                            layout="fill"
                            objectFit='contain'
                            alt='instagram logo'
                        />
                    </div>
                {/* Middle */}
                <div className='max-w-xs'>
                    <div className='relative p-3 mt-1rounded-md'>
                        <div className='absolute inset-y-0 flex items-center pl-3 pointer-events-none'>
                            <SearchIcon className='w-5 h-5 text-gray-500' />
                        </div>
                        <input className='block w-full pl-10 border-gray-300 rounded-md focus:ring-black focus:border-black sm:text-sm bg-gray-50' type="text" placeholder='Search'/>
                    </div>
                </div>
                {/* Right */}
               { session ? <div className='flex items-center justify-end pr-3 space-x-4'>
                    <HomeIcon onClick={() => router.push('/')} className='navBtn' />
                    <MenuIcon className='h-6 cursor-pointer md:hidden' />
                    <div className='relative navBtn'>
                        <PaperAirplaneIcon className='navBtn rotate-12' />
                        <div className='absolute flex items-center justify-center w-5 h-5 text-white bg-red-500 rounded-full -top-3 -right-2 text-ws animate-pulse'>5</div>
                    </div>
                    <PlusCircleIcon onClick={() => setOpen(true)} className='navBtn '/>
                    <UserGroupIcon className='navBtn ' />
                    <HeartIcon className='navBtn ' />
                    <img 
                        src={session.user.image}
                        alt="profile picture"
                        className='h-10 rounded-full cursor-pointer'
                    />
                </div> : <div><button onClick={() => router.push('/auth/signin')}>Sign In</button></div> }
                </div>
        </div>
    )
}
