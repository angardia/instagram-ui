import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { PostService } from "../services/post.service";
import TimeAgo from "timeago-react";
import "./PostPage.scss";
import Avatar from "../common/Avatar/Avatar";
import Comments from '../common/Comments/Comments';

export default function PostPage() {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        async function getPost() {
            setPost(await PostService.get(id));
        }
        getPost();
    }, [id]);

    return (
        <div className="PostPage">
            { post && (
                <div className="PostPage_Wrap">
                    <div className="PostPage_User">
                        <div className="PostPage_Header">
                        <Avatar image={post.user.avatar} />
                        <div className="PostPage_Username">{post.user.username}</div>
                        <p>Posted: </p>
                        <TimeAgo className="PostPage_Date" datetime={post.createdAt} />
                        </div>
                        <div className="PostPage_ImageWrap">
                            <img className="PostPage_Image" src={post.image} alt="Post related img" />
                        </div>
                        <div className="PostPage_Content">
                            <p className="PostPage_Description">{post.description}</p>
                        </div>
                    </div>
                    <div className="PostPage_CommentWrap">
                    <Comments postId={post._id} />
                    </div>

                </div>
            )}
            
        </div>

    );
}
