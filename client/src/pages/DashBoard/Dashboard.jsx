import React, { useState, useRef, useEffect, useContext } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import { Link } from 'react-router-dom';
import { FaPlus } from "react-icons/fa";
import Lottie from 'react-lottie';
import dashboardAnimation from '../../assets/Animation/dashboardAnimation.json';
import moment from 'moment';

export function Dashboard() {
    const { user } = useContext(AuthContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);

    const [allBooks, setAllBooks] = useState([]);

    const searchContainerRef = useRef(null);

    const handleSearch = async () => {
        setLoading(true);
        try {
            const encodedSearchQuery = encodeURIComponent(searchQuery);
            const response = await fetch(`http://localhost:5000/books/search/${encodedSearchQuery}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setSearchResults(data);
            setShowResults(true);
        } catch (error) {
            console.error('Error fetching search results:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDocumentClick = (e) => {
        if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
            setShowResults(false);
            setSearchQuery('');
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleDocumentClick);
        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            handleSearch();
        }, 200);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    // animation from lottie
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: dashboardAnimation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch('http://localhost:5000/all-books');
                if (!response.ok) {
                    throw new Error('Failed to fetch books');
                }
                const data = await response.json();
                setAllBooks(data);
            } catch (error) {
                console.error('Error fetching books:', error);
                toast.error('Failed to fetch books. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    const lastFiveBooks = allBooks.slice(0, 3);

    return (
        <div className='w-full flex flex-col p-6'>
            {/* Header part */}
            <div className='flex flex-col md:flex-row md:justify-between'>
                <div className="flex flex-col">
                    <h1 className='text-4xl font-bold mb-2'>Hi, {user.displayName}👋</h1>
                </div>
                <div className="">
                    {/* Book search bar */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search for books..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full md:w-[400px] px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {showResults && (
                            <div ref={searchContainerRef} className="absolute z-10 w-full mt-1 bg-white border-gray-300 rounded shadow-md">
                                {searchResults.length > 0 ? (
                                    <ul className="divide-y divide-gray-200">
                                        {searchResults.map((book) => (
                                            <li key={book._id} className="px-4 py-2">
                                                <Link to={`/book/${book._id}`} className="block hover:bg-gray-100">{book.title}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                ) : 
                                    searchQuery.length > 0 && (
                                        <p className="px-4 py-2">No results found.</p>
                                    )
                                }
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Banner part */}
            <div className='mt-8 flex py-4 rounded-2xl bg-[#ffeee9] px-2 lg:px-12'>
                <div className='flex flex-col lg:flex-row justify-between items-center gap-12 md:w-full'>
                    <div className='p-2'>
                        <h3 className='text-3xl md:text-5xl font-bold mb-2 md:mb-4 leading-snug text-gray-800'>
                            Upload Your Book to increase your sales
                        </h3>
                        <p className='text-base font-medium md:text-xl mb-4 text-gray-400'>
                            Engage your shop books with this dashboard and make your shop more profitable.
                        </p>
                        <div className='items-center md:text-start'>
                            <Link to="/admin/dashboard/upload">
                                <button className='bg-[#a54814] text-white font-semibold px-6 py-3 rounded-xl hover:bg-orange-700 transition-all duration-200 flex items-center gap-2'>
                                    <FaPlus /> Add new book
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className='p-2'>
                        <Lottie
                            options={defaultOptions}
                            height={300}
                            width={300}
                        />
                    </div>
                </div>
            </div>

            {/* Table part */}
            <div className='mt-8'>
                <div className='flex justify-between items-center mb-4'>
                    <h1 className='text-3xl font-bold'>Recently Added</h1>
                    <Link to="/admin/dashboard/manage" className='text-orange-600 px-6 hover:underline'>View All</Link>
                </div>
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2 ">Book Name</th>
                            <th className="px-4 py-2">Author</th>
                            <th className="px-4 py-2">Date</th>
                            <th className="px-4 py-2">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lastFiveBooks.map((book) => (
                            <tr key={book._id} className="border-b border-gray-300">
                                <td className="px-4 py-2 text-center">{book.title}</td>
                                <td className="px-4 py-2 text-center">{book.author}</td>
                                <td className="px-4 py-2 text-center">{moment(book.createdAt).format('DD-MM-YYYY')}</td>
                                <td className="px-4 py-2 text-center"> ₹{book.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
