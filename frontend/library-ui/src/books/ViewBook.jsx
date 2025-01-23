import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BookDetails from '../layout/BookDetails'
import axios from 'axios';

export default function ViewBook() {
    const [errors, setErrors] = useState({});
    const [book, setBook] = useState({})

    const { id } = useParams()

    useEffect(() => {
        loadBook()
    },[id])

    const loadBook = async () => {

        try {
            const result = await axios.get(`http://localhost:8080/api/books/${id}`)
            setBook(result.data)
        } catch (error) {
            console.log(error)
           
        }


    }


    return (
        <div>
            <BookDetails
                book={book}
                errors={errors}
                onSave={() => { }}
                isEditing={false}
                isViewOnly={true}
            />
        </div>
    )
}
