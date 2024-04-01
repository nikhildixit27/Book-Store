import React, { useState, useEffect } from 'react';
import BookCard from '../../components/BookCard';

function BestSellerBooks() {
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
            .then(data => setBooks(data.slice(0, 8)))
            .catch(error => setError(error.message));
    }, []);

    if (error) {
        return <div className="text-red-500" >Error: {error}</div>;
    }

    return (
        <div>
            <BookCard books={books} heading="Best Seller Books"/>
        </div>
    );
}

export default BestSellerBooks;
