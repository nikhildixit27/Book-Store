import React, { useContext, useState, useEffect } from 'react';
import Header from '../../components/Header';
import { useParams } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import BookCard from '../../components/BookCard';
import { CartContext } from '../../Context/CartProvider';

export const SingleBook = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [rating, setRating] = useState(0); // this functionality is pending

    const { addToCart, cartItems, removeFromCart } = useContext(CartContext);

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:5000/book/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch book');
                }
                return response.json();
            })
            .then(data => {
                setBook(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching book:', error);
                setLoading(false);
            });
    }, [id]);


    const [relatedBooks, setRelatedBooks] = useState([]);
    const [relatedBooksError, setRelatedBooksError] = useState(null);

    useEffect(() => {
        if (book) {
            setLoading(true);
            fetch(`http://localhost:5000/books/${book.category}`)
                .then(res => {
                    if (!res.ok) {
                        throw new Error('Failed to fetch books');
                    }
                    return res.json();
                })
                .then(data => {
                    const filteredBooks = data.filter(relatedBook => relatedBook._id !== id);
                    setRelatedBooks(filteredBooks);
                    setLoading(false);
                })
                .catch(error => {
                    setRelatedBooksError(error.message);
                    setLoading(false);
                });
        }
    }, [book, id]);

    // Function to handle user's rating for the book
    const handleRating = (value) => {
        setRating(value);
        // Complete the functionaity by calling the API
    };

    const handleAddToCart = () => {
        addToCart(book);
    }

    const handleRemoveFromCart = () => {
        removeFromCart(book._id);
    }

    const isInCart = book && book._id && cartItems.some(item => item._id === book._id);

    const handleCartButtonClick = () => {
        if (isInCart) {
            handleRemoveFromCart();
        } else {
            handleAddToCart();
        }
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!book) {
        return <div>Book not found</div>;
    }

    return (
        <>
            <Header />
            <div className='pt-4 md:p-8 px-6 lg:px-24'>
                <div className='flex flex-col md:flex-row gap-x-10'>
                    <img src={book.image} alt={book.title} className='h-full md:h-96 w-auto rounded-md shadow-lg object-cover mb-4 md:mb-0' />

                    <div className='flex flex-col justify-between'>
                        <div>
                            <h1 className="text-4xl font-bold mb-2">{book.title}</h1>
                            <p className="text-xl font-medium text-gray-600 mb-4">By {book.author}</p>
                            <p className="text-lg text-gray-700 mb-6">{book.description}</p>
                            <p className="text-lg text-gray-700 mb-4">Genre: <span className='text-blue-700 font-semibold underline'>{book.category}</span></p>
                        </div>

                        <div className='flex flex-col md:flex-row justify-between'>
                            <div className='flex items-center gap-x-8 mb-6 md:mb-0 justify-between'>
                                <p className='text-xl text-green-600 font-bold'>₹{book.price}</p>
                                <button onClick={handleCartButtonClick} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400">
                                    {isInCart ? 'Remove from Cart' : 'Add to Cart'}
                                </button>

                            </div>

                            <div className='flex items-center gap-x-2'>
                                <p className='text-gray-900 font-semibold'>Rate this book:</p>
                                {/* Star Rating */}
                                {[...Array(5)].map((_, index) => {
                                    const ratingValue = index + 1;
                                    return (
                                        <label key={index} className="cursor-pointer">
                                            <input
                                                type="radio"
                                                name="rating"
                                                value={ratingValue}
                                                onClick={() => handleRating(ratingValue)}
                                                className="hidden bg-gray-800 border-4"
                                            />
                                            <FaStar
                                                className="text-yellow-500 transition-colors duration-200 hover:text-yellow-600"
                                                size={24}
                                                color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}
                                            />
                                        </label>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="">
                    <div>
                        <BookCard books={relatedBooks} heading="Related Books" />
                    </div>

                    {relatedBooksError && <div>Error: {relatedBooksError}</div>}
                    {relatedBooks.length === 0 && <div className=''>No related books found.</div>}
                </div>
            </div>
        </>
    );
};

export default SingleBook;
