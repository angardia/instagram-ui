import React, { useContext, useState } from 'react';
import TimeAgo from 'timeago-react';
import { UserContext } from '../../../user-context';
import Avatar from '../../Avatar/Avatar';
import "./Comment.scss";
import CommentDelete from './CommentDelete/CommentDelete';

export default function Comment({ comment }) {
   const { user } = useContext(UserContext);
    const [deleteBtn, setDeleteBtn] = useState(true);
    // const [follow, setFollow] = useState(profileOwner.followers.includes(loggedInUser._id));
    // console.log(user);
    return (
        <div>


            <div className="Comment">
                <div className="Comment_Avatar">
                    <Avatar image={comment.user.avatar} />
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
                {deleteBtn ? <CommentDelete commentId={comment._id} /> : ""}
            </div>
        </div>
    )
}