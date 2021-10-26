import React from 'react'
import { useRecoilState } from 'recoil'
import { modalState } from '../atom/modalAtom'
import { Dialog, Transition } from '@headlessui/react'
import { CameraIcon } from '@heroicons/react/outline'
import { db, app, storage } from '../firebase'
import { addDoc, collection, serverTimestamp, doc, updateDoc } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import { ref, getDownloadURL, uploadString } from 'firebase/storage'

export default function Modal() {

    const [open, setOpen] = useRecoilState(modalState)
    const { data: session } = useSession()
    const filePickerRef = React.useRef(null)
    const [selectedFile, setSelectedFile] = React.useState(null) 
    const captionRef = React.useRef(null)
    const [loading, setLoading] = React.useState(false)
    
    const addImageToPost = e => {
        const reader = new FileReader()
        
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
        }

        reader.onload = readerEvent => {
            setSelectedFile(readerEvent.target.result)
            console.log(selectedFile)
        }
    }

    const submitPost = async e => {
        if(loading) return;

        setLoading(true)

        const docRef = await addDoc(collection(db, 'posts'), {
            username: session.user.username,
            caption: captionRef.current.value,
            profileImg: session.user.image,
            timeStamp: serverTimestamp()
        })

        console.log(`New doc added with ID ${docRef.id}`)

        const imageRef = ref(storage, `posts/${docRef.id}/image`)
        
        await uploadString(imageRef, selectedFile, "data_url").then(async snapshot => {
            const download_url = await getDownloadURL(imageRef)
            await updateDoc(doc(db, 'posts', docRef.id), {
                image: download_url
            })
        })

        setOpen(false)
        setLoading(false)
        setSelectedFile(null)
    }

    return (
        <Transition.Root show={open} as={React.Fragment}>
            <Dialog
                as='div'
                className='fixed inset-0 z-10 overflow-y-auto'
                onClose={setOpen}
            >
                <div className='flex items-end justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
                    <Transition.Child
                        as={React.Fragment}
                        enter="ease-out duration-300"
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                    >
                        <Dialog.Overlay className='fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75' />
                    </Transition.Child>

                    <span
                        className='hidden sm:inline-block sm:align-middle sm:h-screen'
                        aria-hidden='true'
                    >
                        &#8203;
                    </span>
                    
                    <Transition.Child
                        as={React.Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                        enterTo='opacity-100 translate-y-0 sm:scale-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                        leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                    >
                        <div className='inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6'>
                                <div>
                                    {selectedFile ? (
                                        <img className='object-contain w-full cursor-pointer' src={selectedFile} onClick={() => setSelectedFile(null)} alt="" />
                                    ) : (
                                        <div 
                                            onClick = { () => filePickerRef.current.click() }
                                            className = 'flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full'
                                        >
                                            <CameraIcon className = 'w-6 h-6 text-red-600' aria-hidden="true" />
                                        </div>
                                    )}
                                    
                                <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900'>
                                    Upload a photo
                                </Dialog.Title>
                                <div>
                                    <input type="file" hidden ref={filePickerRef} onClick={addImageToPost}/>
                                </div>
                                <div className="">
                                    <input ref={captionRef} type="text" placeholder="Please enter a caption..." className="w-full text-center border-none focus:ring-0" />
                                </div>
                                <div className='mt-5 sm:mt-6'>
                                <button onClick={submitPost} type='button' className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-30">
                                    {loading ? "Uploading..." : "Upload Post"}
                                </button>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
