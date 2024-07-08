import axios from 'axios';
import { useState, useEffect } from 'react';
import Loading from './Loading';

export default function Feed() {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    useEffect(()=> {
        getPosts();
        async function getPosts() {
            const { data } = await axios.get("http://localhost:3000/post/posts");
            setPosts(data);
            setLoading(false);

        }
    },[])

    return (
        <div className="flex justify-center items-center h-screen pt-16" >
            <Posts posts={posts} loading={loading}></Posts>
        </div>
    )
}

function Posts({posts, loading}) {
    if (loading)
        return(
            <Loading display={loading}></Loading>
    )
    if(posts.length == 0)
        return(
            <p>Emptiness</p>
    ) 
    else
        return (
            <div className='w-2/4 flex flex-col items-center' >
            {
                posts.map((post)=>{
                    return (
                            <div key={post._id}>
                                <div className="overflow-hidden w-[400px] h-[500px]">
                                    <img className='h-full object-cover' src={`http://localhost:3000/${post.image}.jpg`} />
                                </div>
                                <p>{post.description}</p>
                                <p>{post.likes} Likes</p>
                            </div>
                    )
                })
            }
            </div>
        )
}