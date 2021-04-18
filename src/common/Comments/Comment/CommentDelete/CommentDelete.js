import React from 'react';
import { UserService } from "../../../../services/user.service";
import "./CommentDelete.scss";

export default function CommentDelete({ commentId, onCommentDelete }) {

    async function handleDelete() {
        console.log(commentId);
        try {
            const res = await fetch(`http://localhost:4000/post/comment/${commentId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: UserService.getToken()
                }

            });
            const commentToDelete = await res.json();
            if (res.status === 201) {
                onCommentDelete(commentToDelete._id);
            }
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
