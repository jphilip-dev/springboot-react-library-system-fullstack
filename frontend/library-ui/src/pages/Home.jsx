import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Home() {
    const [books, setBooks] = useState([])

    const [sortConfig, setSortConfig] = useState({ key: "title", asc: true });

    const [selectedValue, setSelectedValue] = useState('Title');

    const [searchText, setSearchText] = useState('');

    let isSearching = false

    const loadBooksSorted = async (field, dir) => {
        const result = await axios.get(`http://localhost:8080/api/books?field=${field}&asc=${dir}`)
        setBooks(result.data)
    }

    const loadBooksSearch = async (field, value) => {
        const result = await axios.get(`http://localhost:8080/api/books/search?field=${field}&value=${value}`)
        setBooks(result.data)
    }

    const deleteBook = async (id) => {
        const result = await axios.delete(`http://localhost:8080/api/books/${id}`)
        loadBooksSorted(sortConfig.key, sortConfig.asc);
    }

    useEffect(() => {
        loadBooksSorted(sortConfig.key, sortConfig.asc);
    }, []);

    const sortBooks = (key) => {
        if (isSearching == false) {
            let asc = true;

            if (sortConfig.key === key && sortConfig.asc === true) {
                asc = false;
            }

            loadBooksSorted(key, asc)

            setSortConfig({ key, asc });
        }

    };

    const handleSelect = (value) => {

        setSelectedValue(value);
    };

    const handleSearch = () => {
        if (!searchText || searchText.trim() === "") {
            alert("Please enter a search term.");
            return;
        }
        isSearching = true
        
        loadBooksSearch(selectedValue, searchText)
    }




    return (
        <div className='container'>


            <form
                className="input-group mb-1 d-flex mt-4"
                onSubmit={(e) => {
                    e.preventDefault(); // Prevent page reload
                    handleSearch();
                }}
            >
                <button
                    className="btn btn-outline-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    {selectedValue}
                </button>
                <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#" onClick={() => handleSelect('ISBN')}>ISBN</a></li>
                    <li><a className="dropdown-item" href="#" onClick={() => handleSelect('Title')}>Title</a></li>
                    <li><a className="dropdown-item" href="#" onClick={() => handleSelect('Author')}>Author</a></li>
                </ul>

                <input
                    type="text"
                    className="form-control flex-shrink-0"
                    aria-label="Text input with dropdown button"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />

                <button type="submit" className="btn btn-outline-primary px-4">Search</button>
            </form>

            <div className='py-4'>
                {books.length === 0 ? (
                    <p>No books available</p>
                ) : (
                    <table className='table border shadow text-center'>
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col" onClick={() => sortBooks('isbn')}>ISBN
                                    {sortConfig.key === 'isbn' && (sortConfig.asc ? ' ↑' : ' ↓')}
                                </th>
                                <th scope="col" onClick={() => sortBooks('title')}>Title
                                    {sortConfig.key === 'title' && (sortConfig.asc ? ' ↑' : ' ↓')}
                                </th>
                                <th scope="col" onClick={() => sortBooks('author')}>Author
                                    {sortConfig.key === 'author' && (sortConfig.asc ? ' ↑' : ' ↓')}
                                </th>
                                <th scope="col" onClick={() => sortBooks('publishedDate')}>Published Date
                                    {sortConfig.key === 'publishedDate' && (sortConfig.asc ? ' ↑' : ' ↓')}
                                </th>
                                <th scope="col">Action</th>
                            </tr>

                        </thead>

                        <tbody>
                            {
                                books.map((book, index) => {
                                    const formattedDate = book.publishedDate
                                        ? new Date(book.publishedDate).toLocaleDateString('en-GB')
                                        : '';

                                    return (
                                        <tr key={book.id}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{book.isbn}</td>
                                            <td>{book.title}</td>
                                            <td>{book.author}</td>
                                            <td>{formattedDate}</td>
                                            <td>
                                                <Link className='btn btn-primary mx-2' to={`/view-book/${book.id}`} >View</Link>
                                                <Link className="btn btn-outline-primary mx-2" to={`/edit-book/${book.id}`}>Edit</Link>
                                                <button type="button" className='btn btn-danger mx-2' onClick={() => {
                                                    const confirmed = window.confirm("Are you sure you want to delete this book?");
                                                    if (confirmed) {
                                                        deleteBook(book.id);
                                                    }
                                                }}>Delete</button>
                                            </td>
                                        </tr>
                                    )
                                }
                                )
                            }
                        </tbody>
                    </table>
                )
                }
            </div>


        </div>
    )
}
