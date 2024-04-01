import { Table } from 'flowbite-react';
import { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Context/AuthProvider';

export const ManageBook = () => {

    const [allBooks, setAllBooks] = useState([]);
    const [loading, setLoading] = useState(true);

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

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/delete-book/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete book');
            }
            toast.success('Book Deleted Successfully!!');
            setAllBooks(allBooks.filter(book => book._id !== id));
        } catch (error) {
            console.error('Error deleting book:', error);
            toast.error('Failed to delete book. Please try again later.');
        }
    };

    return (
        <div className='px-4 my-12'>
            <h2 className='mb-8 text-3xl font-bold text-center '>Manage Your Books</h2>

            {loading ? (
                <p>Loading...</p>
            ) : allBooks.length === 0 ? (
                <p>No books found.</p>
            ) : (
                <Table hoverable>
                    <Table.Head>
                        <Table.HeadCell>No.</Table.HeadCell>
                        <Table.HeadCell>Title</Table.HeadCell>
                        <Table.HeadCell>Author</Table.HeadCell>
                        <Table.HeadCell>Category</Table.HeadCell>
                        <Table.HeadCell>Price</Table.HeadCell>
                        <Table.HeadCell>Edit or Manage</Table.HeadCell>
                    </Table.Head>

                    {allBooks.map((book, index) => (
                        <Table.Body className="divide-y" key={book._id}>
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {index + 1}
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {book.title}
                                </Table.Cell>
                                <Table.Cell>{book.author}</Table.Cell>
                                <Table.Cell>{book.category}</Table.Cell>
                                <Table.Cell>{book.price}</Table.Cell>
                                <Table.Cell>
                                    <Link
                                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mr-5"
                                        to={`/admin/dashboard/edit/${book._id}`}
                                    >
                                        Edit
                                    </Link>
                                    <button className='bg-red-600 px-4 py-1 font-semibold text-white rounded-sm hover:bg-sky-600' onClick={() => handleDelete(book._id)}>Delete</button>
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    ))}
                </Table>
            )}
        </div>
    );
};
