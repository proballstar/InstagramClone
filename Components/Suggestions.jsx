import React from 'react'
import faker from 'faker'

function Suggestions() {

    const [suggestion, setSugguestions] = React.useState([])

    React.useEffect(() => {
        const suggestions = [...Array(5)].map((_, i) => ({
            ...faker.helpers.contextualCard(),
            id: i
        }))

        setSugguestions(suggestions)

    }, []);


    return (
        <div className='mt-4 ml-10'>
            <div className='flex justify-between mb-5 text-sm'>
                <h3 className='text-sm font-bold'>
                    Suggestions for you
                </h3>
                <button className='font-semibold text-gray-600'>
                    See All
                </button>
            </div>
            <div className='space-y-7'>
            {
                suggestion.map((profile) => {
                    return (
                        <div key={profile.id} className='flex items-center justify-between mt-3'>
                            <img className='w-10 h-10 border rounded-full p-[2px]' src={profile.avatar} />
                            <div>
                                <h2 className='text-sm font-semibold'>{profile.username}</h2>
                                <h3 className='overflow-ellipsis'> Works at {profile.company.name}</h3>
                            </div>
                            <button className='font-semibold text-blue-500'>Follow</button>
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}

export default Suggestions
