import React from 'react';
import {Link} from 'react-router-dom';
import './show-and-watchers.css';

export default (props) =>{
    const title = props[0].title;
    const watchers = [];

    for(let key in props){
        watchers.push(props[key]);
    }

    return <li>
        <h2>{title}</h2>
        <p>Who's watching? &nbsp;&nbsp;
            {watchers.map(e =>{
                return <span>
                    <Link to={`/user/${e.user_id}`} className='watcher-link'>
                        {e.username}
                    </Link> 
                    <span className='pipe'>
                        &nbsp;|&nbsp;
                    </span>
                </span>
            })}
        </p>
        
    </li>;
}