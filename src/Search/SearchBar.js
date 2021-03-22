import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../user-context';
import "./SearchBar.scss";

export default function SearchBar() {

    const { txt, setTxt } = useContext(UserContext);
    const history = useHistory();
    console.log(history);

    return (
        <div className="SearchBar" >
            <input className="SearchBar_Input" type="text" value={txt} onChange={(e) => {
                setTxt(e.target.value)
                if (!history.location.pathname.includes('/search')) {
                    return history.push('/search');
                }
            }} />
                <img  className="SearchBar_Icon" alt="search icon" src={require("../styles/icons/search.svg").default}/>
        </div>

    )
}
