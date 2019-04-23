import Axios from 'axios';
import React from 'react';
import {Link} from 'react-router-dom';
import './users.css';

export default class Users extends React.Component{
    state = {
        users: [],
        userLoggedIn: null,
    }
    
    componentDidMount (){
        const userLoggedIn = localStorage.getItem('userLoggedIn');
        if (userLoggedIn){
            const userObject = JSON.parse(userLoggedIn);
            this.setState({userLoggedIn: userObject});
        } else {
            this.setState({userLoggedIn: null});
        }

        Axios.get('http://localhost:5555/users/all')
            .then(res =>{
                this.setState({users: res.data.users})
            })
            .catch(err =>{
                console.log('Get all users error!...', err);
            })
    }

    signInUser = e =>{
        const userid = parseInt(e.target.getAttribute('userid'));
        const {users} = this.state;
        const [theUser] = users.filter(e => e.id === userid);
        this.setState({userLoggedIn: theUser}, ()=>{
            const value = JSON.stringify(theUser);
            localStorage.setItem('userLoggedIn', value);
        });
    }

    logout = e =>{
        this.setState({userLoggedIn: null}, ()=>{
            localStorage.removeItem('userLoggedIn');
        });
    }

    render(){
        const {users, userLoggedIn} = this.state;
        let displayLoggedInUser = null;
        if (userLoggedIn){
            displayLoggedInUser = <>
                <h1>Welcome, {userLoggedIn.username}!</h1>
                <h2>Your user id is: {userLoggedIn.id}</h2>
                <button type='text' onClick={this.logout} className='logout-btn'>Log Out</button>
            </>
        } else {
            displayLoggedInUser = <div>
                <h2 className='not-signed-in-text'>No one is logged in. Click on username to log in.</h2>
            </div>
        }


        return <div>
            <div className='logged-in-user-box'>
                {displayLoggedInUser}
            </div>
            <hr></hr>
            <div>
                <h1>Master List of all users:</h1>
                <span>Click on user to log in. Click on arrow to go to user profile page.</span>
                <ol className='users-ol'>
                    {users.map( (e,i) =>{
                        return <li userid={e.id} onClick={this.signInUser} className='user-name' key={i}>
                            {e.username} &nbsp;&nbsp;
                            <Link to={'/user/' + e.id} title={`Go to ${e.username}'s profile`} className='no-deco arrow'> 
                                &#9654;
                            </Link>
                        </li>
                    })}
                </ol>
            </div>
        </div>
    }
}