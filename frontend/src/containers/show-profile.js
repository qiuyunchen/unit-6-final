import React from 'react';
import Axios from 'axios';
import './show-profile.css';

export default class ShowProfile extends React.Component {
    state = {
        show: {},
        comment: '',
        comments: [],
    }

    componentDidMount (){
        const showId = this.props.match.params.id;

        Axios.get(`http://localhost:5555/shows/${showId}`)
            .then(res =>{
                const {show} = res.data;
                this.setState({show});
            })
            .catch( err =>{
                console.log('get show by show id error!!! ', err);
            })
    }

    render (){
        const {show, comment, comments} = this.state;
        const {title, img_url, genre_name, username} = show;

        return <>
        <div className='show-profile-display'>
            <img src={img_url} alt={title} className='show-profile-img'/>
            <div className='show-profile-txt'>
                <h1>{title}</h1>
                <h2>Genre: {genre_name}</h2>
            </div>
        </div>
        <h1 className='show-profile-txt'>Being watched by {username}</h1>
        <hr></hr>

        
        </>;
    }
}