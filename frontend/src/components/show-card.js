import React from 'react';
import {Link} from 'react-router-dom';
import './show-card.css';

export default (props) =>{
    const {id, title, img_url, genre_name} = props;

    return <div className='show-card' showid={id}>
        <Link to={'/show/'+id} className='no-deco show-link'>
            <img className='show-img' src={img_url} alt={title}></img>
            <h1>{title}</h1>
            <p>Genre: {genre_name}</p>
        </Link>
    </div>;
}