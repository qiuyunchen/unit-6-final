import React from 'react';
import {Link} from 'react-router-dom';
import './header.css';

export default (props) =>{
    return <nav className='header'>
        <div className='app-name'>
            TV Show Watchlist
        </div>
        <ul className='nav-links'>
            <Link to='/' className='nav-link'>
                <li>
                    Home
                </li>
            </Link>
                <li>
                    -
                </li>
            <Link to='/users' className='nav-link'>
                <li>
                    Users
                </li>
            </Link>
                <li>
                    -
                </li>
            <Link to='/shows' className='nav-link'>
                <li>
                    TV Shows
                </li>
            </Link>
                <li>
                    -
                </li>
            <Link to='/user/post' className='nav-link'>
                <li>
                    Create
                </li>
            </Link>
        </ul>
    </nav>;
}