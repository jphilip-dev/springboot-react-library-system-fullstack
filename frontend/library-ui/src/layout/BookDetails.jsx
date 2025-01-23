import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export default function BookDetails({ book, errors, onSave, isEditing, isViewOnly }) {

    const handleSubmit = (e) => {
        e.preventDefault();  // Prevent default form submission
        onSave(); // Pass book data to the onSave function
    };
    return (

        <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
            <h2>{isEditing ? 'Edit Book' : isViewOnly ? 'View Book' : 'Add Book'}</h2>

            <form onSubmit={handleSubmit} className='needs-validation'>
                <div className='mb-3'>
                    <label className='form-label'>ISBN</label>
                    <input
                        type='text'
                        className={`form-control ${errors.isbn ? 'is-invalid' : ''}`}
                        value={book.isbn || ''}
                        readOnly={isViewOnly}
                        onChange={(e) => !isViewOnly && book.setIsbn(e.target.value)}
                    />
                    {errors.isbn && <div className="invalid-feedback">{errors.isbn}</div>}
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Title</label>
                    <input
                        type='text'
                        className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                        value={book.title || ''}
                        readOnly={isViewOnly}
                        onChange={(e) => !isViewOnly && book.setTitle(e.target.value)}
                    />
                    {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Author</label>
                    <input
                        type='text'
                        className={`form-control ${errors.author ? 'is-invalid' : ''}`}
                        value={book.author || ''}
                        readOnly={isViewOnly}
                        onChange={(e) => !isViewOnly && book.setAuthor(e.target.value)}
                    />
                    {errors.author && <div className="invalid-feedback">{errors.author}</div>}
                </div>

                <div className='mb-3'>
                    <label className='form-label'>Published Date</label>
                    <input
                        type='date'
                        className={`form-control ${errors.publishedDate ? 'is-invalid' : ''}`}
                        value={book.publishedDate || ''}
                        readOnly={isViewOnly}
                        onChange={(e) => !isViewOnly && book.setPublishedDate(e.target.value)}
                    />
                    {errors.publishedDate && <div className="invalid-feedback">{errors.publishedDate}</div>}
                </div>

                <div className='mb-3'>
                    <label className='form-label'>Description</label>
                    <textarea
                        type='text'
                        rows={4}
                        className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                        value={book.description || ''}
                        readOnly={isViewOnly}
                        onChange={(e) => !isViewOnly && book.setDescription(e.target.value)}
                    />
                    {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                </div>

                {!isViewOnly && (
                    <div className='text-center'>
                        <button type='submit' className='btn btn-primary'>
                            {isEditing ? 'Save Changes' : 'Add Book'}
                        </button>
                        <Link to={'/'} className='btn btn-outline-danger mx-2'>Cancel</Link>
                    </div>
                )}
                {isViewOnly && (
                    <div className='text-center'>
                        <Link to={'/'} className='btn btn btn-primary px-4'>Back</Link>
                    </div>
                )}
                

                
                
            </form>
        </div>
    )
}
