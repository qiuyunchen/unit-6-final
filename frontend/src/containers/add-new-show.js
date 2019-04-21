import React from 'react';
import './add-new-show.css';

export default class AddNewShow extends React.Component {
    state = {
        genres: [],
        title: '',
        img_url: '',
        genre: '',
    }

    render (){
        return <>
            <h1>Add new show to watch...</h1>
            <form>
                <div>
                    <input type='text' className='text-input-bar' placeholder='Title Text Input'></input>
                </div>
                
                <div>
                    <input type='text' className='text-input-bar' placeholder='Image URL Text Input'></input>
                </div>

                <div>
                    <select className='select-genre-dd'>
                        <option selected>Genre Selection Dropdown</option>
                        <option>what</option>
                        <option>lol</option>
                        {}
                    </select>
                </div>

                <button type='submit' className='submit-btn btn-success'>Post new show for user id: {}</button>
            </form>
        </>
    }
}