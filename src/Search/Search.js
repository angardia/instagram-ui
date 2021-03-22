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
        // return !(users.length && query.length);
    }



    return (
        <div>
            <h1>search</h1>

            <div>
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


//<div>
//<input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
//</div>