import React, { useContext, useState } from 'react';
import { UserService } from '../../../services/user.service';
import { UserContext } from '../../../user-context';



export default function PostLike({ post }) {
    const { user } = useContext(UserContext);
    const [like, setLike] = useState(post.likes.includes(user._id));
    const [thisPost, setThisPost] = useState(post);

    async function handleLike() {
        const res = await fetch(`http://localhost:4000/post/${post._id}/likes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: UserService.getToken()
            }
        });
        const updatedPost = await res.json();
        setThisPost(updatedPost);
        setLike(updatedPost.likes.includes(user._id));
    }

    return (
        <div onClick={handleLike}>
            {like ? <span>❤️</span> : <span>🖤</span>} likes: {thisPost.likes.length}
        </div>
    )
}