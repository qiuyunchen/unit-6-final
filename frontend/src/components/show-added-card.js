import React from 'react';
import './show-added-card.css';

export default (props) =>{
    const {title, img_url, genre_name} = props;
    console.log(genre_name);

    return <div className='show-card-box'>
        <img src={img_url} alt={title} className='show-img'/>
        <h1>{title}</h1>
        <h2>Genre: {genre_name}</h2>
    </div>;
}