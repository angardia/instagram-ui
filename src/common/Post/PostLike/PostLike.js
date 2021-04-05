import React, { useContext, useState } from 'react';
import { PostService } from '../../../services/post.service';
// import { UserService } from '../../../services/user.service';
import { UserContext } from '../../../user-context';
import "./PostLike.scss";



export default function PostLike({ post }) {
    const { user } = useContext(UserContext);
    const [like, setLike] = useState(post.likes.includes(user._id));
    const [thisPost, setThisPost] = useState(post);

    async function handleLike() {
        const like = await PostService.handleLike(post._id);
        setThisPost(like);
        setLike(like.likes.includes(user._id));
    }

    return (
        <div>
            {like ? <span  onClick={handleLike} className="PostLike_Btn-Active">❤️</span> : <span  onClick={handleLike} className="PostLike_Btn">🖤</span>} likes: {thisPost.likes.length}
        </div>
    )
}
