import React, { useState, useEffect } from 'react';
import BookCard from '../../components/BookCard';

export const MoreBooks = () => {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/all-books')
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to fetch books');
                }
                return res.json();
            })
            .then(data => setBooks(data.slice(4, 12)))
            .catch(error => setError(error.message));
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }
    return (
        <div>
            <BookCard books={books} heading="More Books" />
        </div>
    )
}
