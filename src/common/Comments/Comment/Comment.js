import React, { useContext, useEffect, useState } from 'react';
import TimeAgo from 'timeago-react';
import { UserContext } from '../../../user-context';
import Avatar from '../../Avatar/Avatar';
import "./Comment.scss";
import CommentDelete from './CommentDelete/CommentDelete';

export default function Comment({ comment, commentDelete }) {
    const { user } = useContext(UserContext);
    const [showDeleteBtn, setShowDeleteBtn] = useState(comment.user._id === user._id);

    useEffect(() => {
        setShowDeleteBtn(comment.user._id === user._id);

    }, [showDeleteBtn, comment.user, user._id])

    return (
        <div>
            <div className="Comment">
                <div className="Comment_Avatar">
                    <Avatar size="sm" image={comment.user.avatar} />
                    <p>{comment.user.username}</p>
                </div>
                <div className="Comment_Content GradientBorder">
                    <div>
                        <p>{comment.content}</p>
                    </div>
                    <hr />
                    <div>
                        <TimeAgo datetime={comment.createdAt} />
                    </div>
                </div>
                {showDeleteBtn ? <CommentDelete commentId={comment._id} onCommentDelete={commentDelete} /> : ""}
            </div>
        </div>
    )
}