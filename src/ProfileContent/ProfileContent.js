import React, { useEffect, useState } from 'react';
import "./ProfileContent.scss";
import Post from '../common/Post/Post';
import Loader from '../common/Loader/Loader';
import { useParams } from 'react-router-dom';
import { UserService } from '../services/user.service';
import ProfileHeader from './ProfileHeader/ProfileHeader';

export default function ProfileContent() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { username } = useParams();

    useEffect(() => {
        async function getPosts() {
            try {
                const posts = await UserService.getPosts(username);
                setPosts(posts);
                setIsLoading(false);
            }
            catch (e) {
                console.log(e);
            }
        }
        getPosts();
    }, [username]);

    if (isLoading) {
        return (
            <Loader />
        )
    }

    return (

        <div className="ProfileContent">
            <div className="ProfileContent_Header">
            <ProfileHeader username={username} postNum={posts.length} />
            </div>

            <div className="ProfileContent_Feed">
                {posts.map(post => <Post key={post._id} data={post} />)}
            </div>

        </div>
    )
}
