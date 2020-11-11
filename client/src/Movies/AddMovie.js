import React, { useState } from 'react';
import axios from 'axios';
import e from 'express';

const initialMovie = {
    id: Date.now(),
    title: '',
    director: '',
    metascore: '',
    stars: []
};

const AddMovie = () => {
    const[addMovie, setAddMovie] = useState(initialMovie);

    const handleChange = () => {
        setAddMovie({
            ...addMovie,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:5000/api/movies')
            .then(res => {
                console.log(res)
            })
            .catch(err => console.log(err))
    };

    return(
        <div>
            <h2>Add a New Movie</h2>
            <form onSubmit={handleSubmit}>
                <input 
                name="title" 
                placeholder="Movie Title"
                type="text"
                value={addMovie.title}
                onChange={handleChange}
                />
                <input 
                name="director" 
                placeholder="Director"
                type="text"
                value={addMovie.director}
                onChange={handleChange}
                />
                <input 
                name="metascore" 
                placeholder="Metascore"
                type="text"
                value={addMovie.metascore}
                onChange={handleChange}
                />
                <input 
                name="stars"
                placeholder="Stars"
                />
                <button type="submit">Add Movie</button>
            </form>
        </div>
    );
};

export default AddMovie;