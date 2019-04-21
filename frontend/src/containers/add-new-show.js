import Axios from 'axios';
import React from 'react';
import './add-new-show.css';

export default class AddNewShow extends React.Component {
    state = {
        genres: [],
        title: '',
        img_url: '',
        genre_id: '',
        user_id: null,
        successPost: [],
    }

    componentDidMount (){
        Axios.get('http://localhost:5555/genres/all')
            .then( res =>{
                const {genres} = res.data;
                this.setState({genres});
            })
            .catch( err =>{
                console.log('get all genres Error!!!...', err);
            })

        console.log(this.props)
    }

    handleChange = (e) =>{
        this.setState({[e.target.name]: e.target.value}, ()=>{
            console.log(this.state);
        })
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        const {title, img_url, genre_id, user_id} = this.state;
        Axios.post('http://localhost:5555/shows', {
            title, 
            img_url, 
            genre_id, 
            user_id
        })
            .then(success =>{
                console.log(success);
            })
            .catch(err =>{
                console.log('post new show Error!!!...', err);
            })
    }

    render (){
        const {genres, title, img_url, genre_id, user_id} = this.state;

        return <>
            <h1>Add new show to watch...</h1>
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
                    Post new show for user id: {user_id}
                </button>
            </form>
        </>
    }
}