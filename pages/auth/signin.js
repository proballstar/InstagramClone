import { getProviders, signIn as SignInFunction } from "next-auth/react"
import React from 'react'
import Header from '../../Components/Header';

export default function signIn({ providers }) {

    console.log(providers)

    return (
        <>
            <Header />
            <div className="flex flex-col items-center justify-center">
                <img src="https://links.papareact.com/ocw" alt="" className="w-80" />
                <p className="italic font-xs">Instagram Clone</p>
                <div className="mt-40">
                    {Object.values(providers).map(provider => (
                        <div key={provider.name}>
                            <button
                                onClick={() => SignInFunction(provider.id, {callbackUrl: '/'})}
                                className="p-3 text-white bg-blue-500 rounded-lg"
                            >
                                Sign in with {provider.name}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            
        </>
    )
}

export async function getServerSideProps() {
    const providers = await getProviders()

    return {
        props: {
            providers,
        },
    };
}