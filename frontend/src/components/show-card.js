import React from 'react';
import './show-card.css';

export default (props) =>{
    const {id, title, img_url, genre_name} = props;
    return <div className='show-card' showid={id}>
        <img className='show-img' src={img_url} alt={title}></img>
        <h3>{title}</h3>
        <p>Genre: {genre_name}</p>
    </div>;
}