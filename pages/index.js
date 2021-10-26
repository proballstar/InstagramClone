import Head from 'next/head'
import Feed from '../Components/Feed'
import Header from '../Components/Header'
import Modal from '../Components/Modal'

export default function Home() {

  
  
  return (
    <div className='h-screen overflow-y-scroll justify-evenly bg-gray-50 scrollbar-hide'>
      <Head>
        <title>Instagram</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Modal />
      {/* Header */}
      <Header />
      {/* Feed */}
      <Feed />
      {/* Modal */}
    </div>
  )
}
