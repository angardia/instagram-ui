import React, { useState } from 'react';
import { UserService } from '../../services/user.service';
import "./Follow.scss";


export default function Follow({ profileOwner, loggedInUser }) {

    const [follow, setFollow] = useState(profileOwner.followers.includes(loggedInUser._id));

    async function handleFollow() {
        const updatedFollowUser = await UserService.handleFollow(profileOwner._id);
        setFollow(updatedFollowUser.followers.includes(loggedInUser._id));
    }

    return (
        <div onClick={handleFollow}>
            {follow ? <span className="Btn Follow_Btn">Unfollow</span> : <span className="Btn">Follow</span>}
        </div>
    )
}