import React from 'react';
import { Link } from 'react-router-dom';
import "./Header.scss";
import HeaderNav from './HeaderNav/HeaderNav';

export default function Header() {
    return (
        <header className="Header">
            <div className="Header_TitleWrap">
                <div className="Header_Title">
                    <a className="" href="/">GameShot</a>
                </div>
                <div className="Header_HomeWrap" >
                    <Link to="/">
                        <img className="Header_IconHome" alt="search icon" src={require("../styles/icons/home.svg").default} />
                    </Link>
                </div>
            </div>
            <HeaderNav />
        </header>
    );
}
