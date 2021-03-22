import React, { useContext, useEffect, useState } from 'react';
import Avatar from '../../common/Avatar/Avatar';
import Follow from '../../common/Follow/Follow';
import { UserService } from '../../services/user.service';
import "./ProfileHeader.scss";
import { UserContext } from "../../../src/user-context";

export default function ProfileHeader(props) {

    const { user: loggedInUser } = useContext(UserContext);
    // console.log(loggedInUser);
    const { username, postNum } = props;
    const [user, setUser] = useState({});
    const [follow, setFollow] = useState(false);


    useEffect(() => {
        async function getInfo() {
            try {
                const user = await UserService.get(username);
                setUser(user);
                // console.log(user);
                if (user.username !== loggedInUser.username) {
                    setFollow(true)
                }
                else{
                    setFollow(false)
                }
            }
            catch (e) {
                console.log(e);
            }
        }
        getInfo();
    }, [username, loggedInUser])


    return (
        <div className="ProfileHeader">
            <h2>{user.username}</h2>
            <Avatar image={user.avatar} size="lg" />
            <p>Posts amount: {postNum}</p>
            { follow ?  <Follow profileOwner={user} loggedInUser={loggedInUser} /> : ""}
        </div>
    )
}
