import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../actions/postActions';
import postReducer from '../reducers/postReducer';

const Thread = () => {
    const [loadPost,setLoadPost] = useState(true);
const dispacth = useDispatch();
const posts = useSelector((state) => state.postReducer)

useEffect(()=>{
    if(loadPost){
        dispacth(getPosts());
        setLoadPost(false);
    }
},[loadPost])
    return (
        <div>
            <ul>
                {posts.post.map((post) => (
                    <li key={post._id}>
                        <p>{post.message}</p>
                    </li>
                ))}
            </ul>
            {/* {posts.loading && <p>Loading...</p>}
            {posts.error && <p>{posts.error}</p>}
            {posts.posts.map((post) => (
                <div key={post._id}>
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                </div>
            ))}


            <button onClick={()=>setLoadPost(true)}>Load More</button> */}

        </div>
    );
};

export default Thread;


