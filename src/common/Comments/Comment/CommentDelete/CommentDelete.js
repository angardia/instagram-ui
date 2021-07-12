import React from 'react';
import { PostService } from '../../../../services/post.service';
import "./CommentDelete.scss";

export default function CommentDelete({ commentId, onCommentDelete }) {

    async function handleDelete() {
        try {
            const res = await PostService.deleteComment(commentId);
            onCommentDelete(res._id);
        }
        catch (e) {
            console.log(e);
        }
    }

    return (
        <div onClick={handleDelete}>
            <img className="CommentDelete_Btn" alt="create icon" src={require("../../../../styles/icons/delete1.svg").default} />
        </div>
    )
}
