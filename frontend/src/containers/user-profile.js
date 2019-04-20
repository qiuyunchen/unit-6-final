import React from 'react';
import Axios from 'axios';
import ShowCard from '../components/show-card';
import './user-profile.css';

export default class UserProfile extends React.Component {
    state = {
        shows: [],
    }

    componentDidMount (){
        const {id} = this.props.match.params;
        Axios.get(`http://localhost:5555/shows/user/${id}`)
            .then(res =>{
                this.setState({shows: res.data.shows});
            })
            .catch( err =>{
                console.log('get shows by user id ERROR!!!', err);
            })
    }

    render (){
        const {shows} = this.state;

        return <>
            <h1>Shows Watched By Logged In User</h1>
            <div className='shows-watched-by-user'>
                {shows.map( (e,i) =>{
                    return <ShowCard {...e} key={i}/>
                })}
            </div>
        </>;
    }
}