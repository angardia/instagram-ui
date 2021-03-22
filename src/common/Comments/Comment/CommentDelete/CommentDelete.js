import React from 'react';

export default function CommentDelete({commentId}) {

    async function handleDelete() {
        console.log(commentId);
    }


    return (
        <div onClick={handleDelete}>
            delete
        </div>
    )
}
