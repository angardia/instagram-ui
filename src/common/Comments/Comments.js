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
        setComments([...comments, comment]);
    }

    function onCommentDelete(commentId){
        const filteredComments = comments.filter(comment => !comment._id.includes(commentId) );
        setComments([...filteredComments]);
    }


    return (
        <div className="Comments">
            <header className="top-bar">
                    <h1>Comments</h1>
            </header>


            {comments.map(comment => {
                return <Comment key={comment._id} comment={comment} commentDelete={onCommentDelete} />

            })}

            <CommentAdd postId={postId} onCommentAdd={onCommentAdd}  />
        </div>
    )
}

