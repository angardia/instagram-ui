import React, { useEffect, useState } from 'react';
import { PostService } from '../../services/post.service';
import Comment from './Comment/Comment';
import CommentAdd from './CommentAdd/CommentAdd';
import "./Comments.scss";

export default function Comments({ postId }) {

    const [comments, setComments] = useState([]);

    useEffect(() => {
        async function getComments() {
            try {
                const commentsList = await PostService.getComments(postId);
                setComments(commentsList);
            }
            catch (e) {
                return console.log(e);
            }
        }
        getComments();
    }, [postId]);

    function onCommentAdd(comment) {
        console.log(comment);
        setComments([...comments, comment]);
    }


    return (
        <div className="Comments">
            <header class="top-bar">
                    <h1>Comments</h1>
            </header>


            {comments.map(comment => {
                  console.log(comment.user);
                return <Comment key={comment._id} comment={comment} />

            })}

            <CommentAdd postId={postId} onCommentAdd={onCommentAdd} />
        </div>
    )
}

