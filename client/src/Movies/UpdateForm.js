import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const initialItem = {
    id: Date.now(),
    title: '',
    director: '',
    metascore: '',
};

const UpdateForm = (props) => {
    const { push } = useHistory();
    const { id } = useParams();
    const[updatedMovie, setUpdatedMovie] = useState(initialItem);

    useEffect(() => {
        const getMovie = () => {
            axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then((res) => {
                setUpdatedMovie(res.data)
            })
            .catch((err) => {
                console.log(err)
            });
        };
        getMovie(id);
    }, [id]);

    const handleChange = (e) => {
        setUpdatedMovie({
            ...updatedMovie,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${id}`, updatedMovie)
            .then(res => {
                setUpdatedMovie(res.data);
                push('/movies')
            })
            .catch(err => {
                console.log(err)
            });
    };

    return(
        <div>
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>
                <input
                name="title" 
                placeholder="Movie Title"
                type="text"
                value={updatedMovie.title}
                onChange={handleChange}
                />
                <input 
                name="director" 
                placeholder="Director"
                type="text"
                value={updatedMovie.director}
                onChange={handleChange}
                />
                <input 
                name="metascore" 
                placeholder="Metascore"
                type="text"
                value={updatedMovie.metascore}
                onChange={handleChange}
                />
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default UpdateForm;