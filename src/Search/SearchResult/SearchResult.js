import React from 'react';
import "./SearchResult.scss";
import Avatar from "../../common/Avatar/Avatar";
import { Link } from 'react-router-dom';

export default function SearchResult(props) {

    const { username, avatar, createdAt, bio, followers } = props.user;

    return (

        <div className="SearchResult">
            <div className="SearchResult_Wrap">
                <div className="SearchResult_Avatar">
                    <Link to={"/profile/" + username}>
                        <Avatar image={avatar} size="lg" />
                    </Link>
                </div>
                <div><p>{username}</p></div>
                <div><p>{bio}</p></div>

            </div>

        </div>
    )
}
