import React, { useState } from 'react';
import { UserService } from '../../services/user.service';


export default function Follow({ profileOwner, loggedInUser }) {
    // console.log(profileOwner);
    // console.log(loggedInUser);
    const [follow, setFollow] = useState(profileOwner.followers.includes(loggedInUser._id));
    const [userHeader, setUserHeader] = useState(profileOwner)
    // console.log(follow);

    async function handleFollow() {
        const res = await fetch(`http://localhost:4000/user/${profileOwner._id}/follow`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: UserService.getToken()
            }
        });
        const updatedUser = await res.json();
        console.log(updatedUser);
        setUserHeader(updatedUser);
        setFollow(updatedUser.followers.includes(loggedInUser._id));
        console.log(follow);

    }


    return (
        <div onClick={handleFollow}>
            {follow ? <span>Unfollow</span> : <span>Follow</span>} Followers : {userHeader.followers.length}
        </div>
    )
}