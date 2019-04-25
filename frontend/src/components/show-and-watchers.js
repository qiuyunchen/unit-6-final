import React from 'react';
import {Link} from 'react-router-dom';
import './show-and-watchers.css';

export default (props) =>{
    const showid = props[0].id;
    const title = props[0].title;
    const watchers = [];

    for(let key in props){
        watchers.push(props[key]);
    }

    return <li>
        <h2>{title}</h2>
        <p>Who's watching? &nbsp;&nbsp;
            {watchers.map( (e,i) =>{
                return <span key={i}>
                    <Link to={`/show/${showid}`} className='watcher-link'>
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