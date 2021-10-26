import React from 'react'
import { onSnapshot, query, collection, orderBy } from '@firebase/firestore'
import Post from './Post'
import { db } from '../firebase'

export default function Posts() {

    const DummyData = [
        {
            id: 1,
            username: 'Rohan',
            img: 'https://links.papareact.com/3ke',
            userImg: 'https://links.papareact.com/3ke',
            caption: 'Woohoo'
        },
        {
            id: 1,
            username: 'Fernandes',
            img: 'https://links.papareact.com/3ke',
            userImg: 'https://links.papareact.com/3ke',
            caption: 'Lets dab on our friends :D'
        }
    ]


    const [posts, setPosts] = React.useState([])

    React.useEffect(
        () => 
        onSnapshot(
            query(collection(db, 'posts'), orderBy('timeStamp', 'desc')), 
            snapshot => {
                setPosts(snapshot.docs)
                console.log(posts)
            }
        ),
     [db])

    return (

        <div>
            {posts.map((post, k) => {
                console.log(post)
               return <Post key={k} id={post.id} username={post.data().username} userImg={post.data().profileImg} img={post.data().image} caption={post.data().caption} />
           })}
        </div>
    )
}
