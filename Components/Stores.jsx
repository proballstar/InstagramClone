import React from 'react'
import faker from 'faker'
import Story from './Story'
import { useSession } from 'next-auth/react'

export default function Stores() {

    const [suggestion, setSugguestions] = React.useState([])
    const session = useSession()
    
    React.useEffect(() => {
        const suggestions = [...Array(20)].map((_, i) => ({
            ...faker.helpers.contextualCard(),
            id: i
        }))

        setSugguestions(suggestions)

    }, []);
    
    return (
        <div className='flex p-6 mt-8 space-x-2 overflow-x-scroll bg-white border border-gray-200 rounded-sm scrollbar-thin scrollbar-thumb-black'>

            {/* {session.data.user && <Story img={session.data.user.image} username={session.data.user.username}  /> } */}

            {suggestion.map(profile => {
                return <Story key={profile.id} img={profile.avatar} username={profile.username} />
            })}
        </div>
    )
}
