import React from 'react';
import TimeAgo from "timeago-react";
import Avatar from "../Avatar/Avatar";
import "./Post.scss";
import { Link } from "react-router-dom";
import PostLike from './PostLike/PostLike';


export default function Post({ data }) {

    return (
        <div className="Post" >
            <Link to={"/post/" + data._id}>
                <img className="Post_Image" src={data.image} alt="Post related img" />
            </Link>
            <div className="Post_Info">
                <div className="Post_Avatar">
                    <Link to={`/profile/${data.user.username}`}>
                        <Avatar size="sm" image={data.user.avatar} />
                    </Link>

                </div>
                <div className="Post_Username">{data.user.username}</div>

                <div className="Post_Date">

                    <TimeAgo datetime={data.createdAt} />
                </div>
            </div>
            <hr />
            <div className="Post_InfoWrapper">
                <div className="Post_Description">
                    {data.description}
                </div>

                <div className="Post_Like">
                    <PostLike post={data} />
                </div>
            </div>
        </div>
    )
}


