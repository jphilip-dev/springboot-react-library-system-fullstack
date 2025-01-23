import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import BookDetails from '../layout/BookDetails'

export default function EditBook() {
    let navigate = useNavigate()
    const [errors, setErrors] = useState({});
    
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

    const { id } = useParams()


    useEffect(() => {
        loadBook()
    }, [id])

    const loadBook = async () => {

        try {
            const result = await axios.get(`http://localhost:8080/api/books/${id}`)
            setBook((prev) => ({
                ...prev,
                ...result.data,  // Merging API data with existing setters
            }));

        } catch (error) {
            console.log(error)
            
        }


    }

    const handleSave =async () => {
        try {
            const result = await axios.put(`http://localhost:8080/api/books/${id}`, book)
            navigate('/')
        } catch (error) {
            console.log(error)
            // Handle API validation errors
            if (error.response && error.response.data) {
                console.log(error.response.data.errors)
                setErrors(error.response.data.errors || {});
            }
            
        }
    }

    return (
        <div>
            <BookDetails
                book={book}
                errors={errors}
                onSave={handleSave}
                isEditing={true}
                isViewOnly={false}
            />
        </div>
    )
}
