import React, { useState } from 'react'
import BookDetails from '../layout/BookDetails'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AddBook() {
    let navigate = useNavigate()

    const [book, setBook] = useState({
        isbn: '',
        title: '',
        author: '',
        description: '',
        publishedDate:'',
        setIsbn: (value) => setBook((prev) => ({ ...prev, isbn: value })),
        setTitle: (value) => setBook((prev) => ({ ...prev, title: value })),
        setAuthor: (value) => setBook((prev) => ({ ...prev, author: value })),
        setDescription: (value) => setBook((prev) => ({ ...prev, description: value })),
        setPublishedDate: (value) => setBook((prev) => ({ ...prev, publishedDate: value }))

    });

    const [errors, setErrors] = useState({});

    const handleSave = async () => {
       
        console.log('Book to Add:', book);
        try {
            const result = await axios.post(`http://localhost:8080/api/books`, book)
            navigate('/')
        } catch (error) {
            // Handle API validation errors
            if (error.response && error.response.data) {
                console.log(error.response.data.errors)
                setErrors(error.response.data.errors || {});
            }
        }

       
    };


    return (
        <div>
            <BookDetails
                book={book}
                errors={errors}
                onSave={handleSave}
                isEditing={false}
                isViewOnly={false}
            />
        </div>
    )
}
