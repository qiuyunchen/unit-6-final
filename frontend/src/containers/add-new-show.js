import Axios from 'axios';
import React from 'react';
import ShowAddedCard from '../components/show-added-card';
import './add-new-show.css';

export default class AddNewShow extends React.Component {
    state = {
        genres: [],
        title: '',
        img_url: '',
        genre_id: '',
        genre_name: '',
        userLoggedIn: null,
        successfulPosts: [],
        error: '',
    }

    componentDidMount (){
        const userLoggedIn = localStorage.getItem('userLoggedIn');
        if (userLoggedIn){
            const userObject = JSON.parse(userLoggedIn);
            this.setState({userLoggedIn: userObject});
        } else {
            this.setState({userLoggedIn: null});
        }

        Axios.get('http://localhost:5555/genres/all')
            .then( res =>{
                const {genres} = res.data;
                this.setState({genres});
            })
            .catch( err =>{
                console.log('get all genres Error!!!...', err);
            })
    }

    handleChange = (e) =>{
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        const {title, img_url, genre_id, userLoggedIn, successfulPosts} = this.state;

        if (!userLoggedIn){
            this.setState({error: 'Hi, you are not logged in, so you cannot add a new show.'});
        } else if (!title || !img_url || !genre_id) {
            this.setState({error: 'Please fill out all information por favor...'});
        } else {
            Axios.post('http://localhost:5555/shows', {
                title, 
                img_url, 
                genre_id, 
                user_id: userLoggedIn.id,
            })
                .then(success =>{
                    const {showCreated} = success.data;
                    const newPosts = [...successfulPosts];
                    newPosts.unshift(showCreated);
                    this.setState({
                        successfulPosts: newPosts,
                        title: '',
                        img_url: '',
                        genre_id: '',
                    });
                })
                .catch(err =>{
                    console.log('post new show Error!!!...', err);
                })

            Axios.get(`http://localhost:5555/genre/${genre_id}`)
                .then( success =>{
                    const {genre_name} = success.data.genre;
                    this.setState({genre_name});
                })
                .catch(err =>{
                    console.log('get genre name request error: ', err);
                })
        }
    }

    render (){
        const {genres, title, img_url, genre_id, genre_name, userLoggedIn, error, successfulPosts} = this.state;

        const userId = userLoggedIn? userLoggedIn.id : '';
        const username = userLoggedIn? userLoggedIn.username : '';

        const displayGreeting = error
        ? <div className='error-msg'>{error}</div> 
        : <div>
            <h1>Hi, {username}</h1>
            <h1>Add new show to watch...</h1>
        </div>;

        const showsAdded = successfulPosts.length === 0 ? null :
            <>
                {successfulPosts.map( (e,i) =>{
                    return <ShowAddedCard {...e} genre_name={genre_name} key={i} />
                })}
            </>


        return <>
            {displayGreeting}

            <form>
                <div>
                    <input type='text' 
                        className='text-input-bar' 
                        placeholder='Title Text Input'
                        name='title'
                        onChange={this.handleChange}
                        value={title}
                    />
                </div>
                
                <div>
                    <input type='text' 
                        className='text-input-bar' 
                        placeholder='Image URL Text Input' 
                        name='img_url'
                        onChange={this.handleChange}
                        value={img_url}
                    />
                </div>

                <div>
                    <select className='select-genre-dd'
                        onChange={this.handleChange}
                        name='genre_id'
                        value={genre_id}
                    >
                        <option>Genre Selection Dropdown</option>
                        {genres.map((e,i) => <option value={e.id} key={i}>{e.genre_name}</option>)}
                    </select>
                </div>

                <button type='submit' className='submit-btn' onClick={this.handleSubmit}>
                    Post new show for user id: {userId}
                </button>
            </form>

            <h1>Shows Added:</h1>
            <div className='shows-added-display-area'>
                {showsAdded}
            </div>
        </>
    }
}