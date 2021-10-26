import React from 'react'
import { 
    BookmarkIcon,
    ChatIcon,
    DotsHorizontalIcon,
    EmojiHappyIcon,
    HeartIcon,
    PaperAirplaneIcon
} from '@heroicons/react/outline'
import { db } from '../firebase'
import { 
    HeartIcon as HeartIconFilled
} from '@heroicons/react/solid'
import { useSession } from 'next-auth/react'
import { deleteDoc, addDoc, collection, serverTimestamp, onSnapshot , query, orderBy, setDoc, doc} from '@firebase/firestore'
import Moment from 'react-moment'

export default function Post({ id, userImg, username, img, caption }) {

    const { data: session } = useSession()
    const [Comments, setComments] = React.useState('')
    const [loading, setLoading ] = React.useState(false)
    const [commentArray, setCommentArray] = React.useState([])
    const [likes, setLikes] = React.useState([])
    const [hasLiked, setHasLiked] = React.useState(false)

    React.useEffect(() => onSnapshot(query(collection(db, 'posts', id, 'comments'), orderBy('timeStamp', 'desc')), snapshot => {
        setCommentArray(snapshot.docs)
        commentArray.map(i => {
            console.log(i.data())
        })
    }), [db, id])

    React.useEffect(() => onSnapshot(collection(db, 'posts', id, 'likes'), snapshot => {
        setLikes(snapshot.docs)
    }), [db, id])

    React.useEffect(() => {
        setHasLiked(likes.findIndex(like => like.id === session?.user?.uid) !== -1)
    }, [likes])
    
    const likePost = async () => {
        if (hasLiked) {
            await deleteDoc(doc(db, 'posts', id, 'likes', session.user.uid))
        } else {
            await setDoc(doc(db, 'posts', id, 'likes', session.user.uid), {
                username: session.user.username
            })
        }
    }
    const sendComment = async e => {
        e.preventDefault()

        const commentToSend = Comments;
        setLoading(true)
        setComments('');

        await addDoc(collection(db, 'posts', id, 'comments'), {
            comment: commentToSend,
            username: session.user.username,
            userImage: session.user.image,
            timeStamp: serverTimestamp()
        })

        setLoading(false)
    }
    

    return (
        <div className='bg-white border rounded-sm my-7'>        
            <div className='flex items-center p-5'>
                <img src={userImg} className='object-contain w-12 h-12 p-1 mr-3 border rounded-full' />
                <p className='flex-1 font-bold'>{username}</p>
                <DotsHorizontalIcon className='h-5' />
            </div>
            <div>
                <img src={img} className='object-cover w-full' alt='' /> 
            </div>
            { session && (<div className='flex justify-between px-4 pt-4'>
                <div className='flex space-x-4'>
                    {
                        hasLiked ? (
                            <HeartIconFilled onClick={likePost} className='text-red-500 postBtn ' />
                        ) : (
                            <HeartIcon onClick={likePost} className='postBtn' />
                        )
                    }
                    <ChatIcon className='postBtn' />
                    <PaperAirplaneIcon className='postBtn' />
                </div>
                <BookmarkIcon className='postBtn' />
            </div>)}
            <p className='flex p-5 truncate'>
                {likes.length > 0 && (
                    <p className='p-1 font-bold'>{likes.length} likes</p>
                )}
                <span className='p-1 font-bold'>{username}: </span>
                <div className='p-1'>{caption}</div>
            </p>
            
            <p>
                {commentArray.length > 0 && (
                    <div>
                        {commentArray.map(comment => (
                            <div key={comment.id} className='flex items-center mb-3 space-x-0'>
                                <img className='rounded-full h-7' src={comment.data().userImage} alt="" />
                                <p className='flex-1 px-2 text-sm'><span className='font-bold'>{" "}{comment.data().username}</span>{comment.data().comment}</p>
                                <Moment fromNow className='pr-5 text-xs'>
                                    {comment.data().timeStamp?.toDate()}
                                </Moment>
                            </div>
                        ))}
                    </div>
                )}
            </p>

            <div>
                {session && (<form className='flex items-center p-4'>
                    <EmojiHappyIcon className="h-7" />
                    <input value={Comments} onChange={e => setComments(e.target.value)} placeholder='Add a comment' type="text" name="" id="" className='flex-1 border-none outline-none focus:ring-0' />
                    <button onClick={sendComment} disabled={!Comments.trim()} className='font-bold text-blue-500 disabled:text-gray-600'>{loading ? "Sending Post" : "Post"}</button>
                </form> )}
            </div>
        </div>

    )
}
