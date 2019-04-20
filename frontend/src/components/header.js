import React from 'react';
import {Link} from 'react-router-dom';
import './header.css';

export default (props) =>{
    return <nav className='header'>
        <div>
            TV Show Watchlist
        </div>
        <ul className='nav-links'>
            <Link to='/'>
                <li>
                    Home
                </li>
            </Link>
            <Link to='/users'>
                <li>
                    Users
                </li>
            </Link>
            <Link to='/shows'>
                <li>
                    TV Shows
                </li>
            </Link>
            <Link to='/user/post'>
                <li>
                    Post
                </li>
            </Link>
        </ul>
    </nav>;
}