import React, { useEffect, useState } from 'react';
import Loader from '../common/Loader/Loader';
import Post from '../common/Post/Post';
import { PostService } from '../services/post.service';
import "./Feed.scss";

export default function Feed() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        PostService.feed()
            .then(posts => {
                setPosts(posts);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return (
            <div>
             <Loader />
            </div>
        )
    }
    else {
        return (
            <div className="FeedWrapper">
            <div className="Feed">
                {posts.map(post => <Post key={post._id} data={post} /> )}
            </div>
            </div>

        )
    }

}
