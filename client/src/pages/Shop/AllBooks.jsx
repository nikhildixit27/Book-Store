import { useState, useEffect } from "react";
import { Card } from 'flowbite-react';
import { Link } from 'react-router-dom';

const AllBooks = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/all-books')
            .then(res => res.json())
            .then(data => setBooks(data))
    }, []);

    const [expandedDescriptionId, setExpandedDescriptionId] = useState(null);

    const toggleDescription = (id) => {
        setExpandedDescriptionId(expandedDescriptionId === id ? null : id);
    };

    return (
        <div className="container px-6 lg:px-24 py-8 mx-auto">
            <h1 className="text-5xl font-bold text-center mb-12 text-gray-800">All Books</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {books.map(book => (
                    <Card key={book.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <Link to={`/book/${book._id}`}>

                            <img src={book.image} alt={book.title} className='h-96 w-full items-center justify-center object-contain' />
                        </Link>

                        <div className="p-6">
                            <h2 className="text-xl font-semibold mb-2 text-gray-800 truncate">{book.title}</h2>
                            <p className="text-gray-600 mb-4">{book.author}</p>
                            {expandedDescriptionId === book._id ? (
                                <p className="text-gray-700 mb-4">{book.description}</p>
                            ) : (
                                <p className="text-gray-700 mb-4 line-clamp-3">{book.description}</p>
                            )}
                            <button className="text-blue-700 hover:underline" onClick={() => toggleDescription(book._id)}>
                                {expandedDescriptionId === book._id ? "View Less" : "View More"}
                            </button>
                            <div className="flex justify-between items-center mt-4">
                                <p className="text-lg font-semibold text-blue-700">₹ {book.price}</p>
                                <button className="bg-blue-700 text-white font-semibold px-6 py-2 rounded hover:bg-black transition-all duration-200">
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default AllBooks;

