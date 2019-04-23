import React from 'react';
import Axios from 'axios';
import './show-profile.css';

export default class ShowProfile extends React.Component {
    state = {
        show: {},
        comment: '',
        comments: [],
        userLoggedIn: null,
        error: '',
    }

    componentDidMount (){
        const userLoggedIn = localStorage.getItem('userLoggedIn');
        if (userLoggedIn){
            const theUser = JSON.parse(userLoggedIn);
            this.setState({userLoggedIn: theUser});
        } else {
            this.setState({userLoggedIn: null});
        }

        const showId = this.props.match.params.id;

        Axios.get(`http://localhost:5555/shows/${showId}`)
            .then(res =>{
                const {show} = res.data;
                this.setState({show});
            })
            .catch( err =>{
                console.log('get show by show id error!!! ', err);
            })

        Axios.get(`http://localhost:5555/comments/show/${showId}`)
            .then(res =>{
                const {comments} = res.data;
                this.setState({comments});
            })
            .catch(err =>{
                console.log('get comments by show id error!!! ', err);
            })
    }

    handleChange = e =>{
        this.setState({comment: e.target.value})
    }

    handleSubmit = e =>{
        const {comment, show, userLoggedIn} = this.state;
        const {id} = show;

        if (!userLoggedIn){
            this.setState({
                error: 'Please log in to post a comment.',
                comment: '',
            })
        } else {
            Axios.post('http://localhost:5555/comments',{
                comment_body: comment, 
                user_id: userLoggedIn.id, 
                show_id: id,
            })
                .then(success =>{
                    const {show_id} = success.data.commentCreated;
                    return Axios.get(`http://localhost:5555/comments/show/${show_id}`)
                })
                .then( res =>{
                    const {comments} = res.data;
                    this.setState({comments, comment: ''});
                })
                .catch(err =>{
                    console.log('post comments request error!!! ', err);
                })
        }
    }

    render (){
        const {show, comment, comments, error} = this.state;
        const {title, img_url, genre_name, username} = show;

        const displayComments = comments.length === 0 ?
            <div>
                <h1>{comments.length} Comments:</h1>
                <h3>You'll be the first to add a comment! 😀</h3>
            </div>
            : 
            <div>
                <h1>{comments.length} Comments:</h1>
                {comments.map( (e,i) =>{
                    return <h3 key={i}> {`${e.username}: ${e.comment_body}`} </h3>
                })}
            </div>

        const displayError = error ?
                <h1 className='error-msg'>{error}</h1> : null;

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

            <div>
                {displayError}
                <input type='text' 
                    placeholder='Insert new comment...'
                    className='comment-input-bar'
                    onChange={this.handleChange}
                    value={comment}
                />
                <button type='text'
                    className='submit-btn'
                    onClick={this.handleSubmit}
                >Submit</button>
                {displayComments}
            </div>
        </>;
    }
}