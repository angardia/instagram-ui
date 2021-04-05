import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import Avatar from '../../common/Avatar/Avatar'
import SearchBar from '../../Search/SearchBar';
import { UserContext } from '../../user-context';
import "./HeaderNav.scss";
// import chatSVG from "../../create.svg";

export default function HeaderNav() {
    const { user } = useContext(UserContext);
    return (
        <div className="HeaderNav" >
            <SearchBar />
            <Link to="/post/create">
                <img className="HeaderNav_CreatePostIcon" alt="create icon" src={require("../../styles/icons/edit.svg").default} />
            </Link>
            <Link to={"/profile/" + user.username} >
                <Avatar size="sm" image={user.avatar} />
            </Link>

            <Link to="/profile">
                <div  className="HeaderNav_Username" >
                    {user.username}
                </div>

            </Link>

        </div>
    )
}
