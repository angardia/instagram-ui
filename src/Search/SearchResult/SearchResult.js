import React from 'react';
import "./SearchResult.scss";
import Avatar from "../../common/Avatar/Avatar";
import { Link } from 'react-router-dom';

export default function SearchResult(props) {

    const { username, avatar, createdAt, bio } = props.user;

    return (

        <div>
            <Link to={"/profile/" + username}>
                <Avatar image={avatar} size="sm" />
                <p>{username}</p>
                <p>{createdAt}</p>
                <p>{bio}</p>
            </Link>
        </div>
    )
}
