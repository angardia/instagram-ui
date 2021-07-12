import React, { useContext, useEffect, useState } from 'react';
import "./Search.scss";
import { UserService } from "../services/user.service";
import SearchResult from './SearchResult/SearchResult';
import { UserContext } from '../user-context';


export default function Search() {

    const {txt} = useContext(UserContext);
    const query = txt;

    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (!query) {
            setUsers([]);
            return;
        }
        async function getUsers() {

            try {
                setUsers(await UserService.search(query));
            }
            catch (e) {
                console.log(e);
            }
        }
        getUsers();
    }, [query]);

    function hasNoResult() {
        return (users.length === 0 && query.length > 0);
    }



    return (
        <div className="Search">
            <div className="Search_Header">
            <h1>search</h1>
            </div>
           

            <div className="Search_Feed">
                {
                    users.map(user => {
                        return <SearchResult key={user._id} user={user} />;
                    })
                }
            </div>
            {hasNoResult() && <p>no results</p>}
        </div>
    )
}