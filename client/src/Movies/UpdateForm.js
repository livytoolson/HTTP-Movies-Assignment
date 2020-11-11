import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const initialItem = {
    id: Date.now(),
    title: '',
    director: '',
    metascore: '',
    stars: []
};

const UpdateForm = (props) => {
    const { push } = useHistory();
    const { id } = useParams();
    const[item, setItem] = useState(initialItem);

    useEffect(() => {
        const getItems = () => {
            axios
                .get(`http://localhost:5000/api/movies/${id}`)
                .then((res) => {
                    setItem(res.data)
                })
                .catch((err) => {
                    console.log(err)
                });
        };
        getItems();
    }, []);

    const handleChange = (e) => {
        setItem({
            ...item,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${id}`, item)
            .then(res => {
                console.log(res)
                props.setMovieList(res.data);
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
                placeholder="Title"
                type="text"
                value={item.title}
                onChange={handleChange}
                />
                <input 
                name="director" 
                placeholder="Director"
                type="text"
                value={item.director}
                onChange={handleChange}
                />
                <input 
                name="metascore" 
                placeholder="Metascore"
                type="text"
                value={item.metascore}
                onChange={handleChange}
                />
                <input 
                name="stars"
                placeholder="Stars"
                type="text"
                value={item.stars}
                onChange={handleChange}
                />
                <button>Update</button>
            </form>
        </div>
    );
};

export default UpdateForm;