import Axios from 'axios';
import React from 'react';
import ShowAndWatchers from '../components/show-and-watchers';

export default class Shows extends React.Component {
    state = {
        shows: [],
    }
    
    componentDidMount (){
        Axios.get('http://localhost:5555/shows/unique')
            .then(res =>{
                return res.data.uniqueShows;
            })
            .then(uniqueShowsArr =>{
                return Promise.all(uniqueShowsArr.map(e => {
                    return Axios.get(`http://localhost:5555/shows/title/${e.title}`);
                }))
            })
            .then(dataArr =>{
                return dataArr.map(e =>{
                    return e.data.watchers;
                })
            })
            .then(uniqueWatchers =>{
                this.setState({shows: uniqueWatchers});
            })
            .catch(err =>{
                console.log('GET request for unique shows Error!!!...', err);
            })
    }

    render (){
        const {shows} = this.state;

        return <>
            <h1>Masterlist of TV Shows</h1>
            <ul>
                {shows.map( (e,i) =>{
                    return <ShowAndWatchers {...e} key={i}/>
                })}
            </ul>
        </>;
    }
}