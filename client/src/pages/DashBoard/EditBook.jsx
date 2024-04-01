import React, { useState, useEffect, useContext } from 'react';
import { Button, Label, Select, TextInput, Textarea } from 'flowbite-react';
import {useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Context/AuthProvider';

export const EditBook = () => {

    const { id } = useParams();

    const [bookData, setBookData] = useState({
        title: '',
        author: '',
        image: '',
        category: '',
        description: '',
        link: '',
        price: ''
    });

    const [loading, setLoading] = useState(true);
    const [selectedBookCategory, setSelectedBookCategory] = useState('');

    useEffect(() => {
        const fetchBookData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/book/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch book data');
                }
                const data = await response.json();
                setBookData(data);
                setSelectedBookCategory(data.category);
            } catch (error) {
                console.error('Error fetching book data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookData();
    }, [id]);

    const bookCategories = [
        "Fiction",
        "Non-Fiction",
        "Poetry",
        "Mistery",
        "Fantasy",
        "Science",
        "Self-Help",
        "History",
        "Thriller",
        "Autobiography",
        "Romance",
        "Biography",
        "Bussiness",
        "Comics",
        "Cooking",
        "Travel",
        "Art",
        "Health"
    ]

    const handleChangeSelectedValue = (event) => {
        setSelectedBookCategory(event.target.value);
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/update-book/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ ...bookData, category: selectedBookCategory }),
            });
            if (!response.ok) {
                throw new Error('Failed to update book');
            }
            console.log(await response.json());
            toast.success('Book updated successfully');
        } catch (error) {
            console.error('Error updating book:', error);
            toast.error('Failed to update book');
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className='px-4 my-12'>
            <h2 className='mb-8 text-3xl font-bold'>Edit Book Details</h2>
            <form className="flex lg:w-[1180px] flex-col flex-wrap gap-4" onSubmit={handleUpdate}>

                {/* first row */}
                <div className='flex gap-8'>
                    <div className='lg:w-1/2'>
                        <div className="mb-2 block">
                            <Label htmlFor="title" value="Book Title" />
                        </div>
                        <TextInput id="title" name='title' type="text" placeholder="Book Name" defaultValue={bookData.title} onInput={()=> {
                                let value = document.getElementById("title").value;
                                setBookData({...bookData, title: value});
                            }} required />
                    </div>

                    <div className='lg:w-1/2'>
                        <div className="mb-2 block">
                            <Label htmlFor="author" value="Author" />
                        </div>
                        <TextInput id="author" name='author' type="text" placeholder="Author Name" required defaultValue={bookData.author} />
                    </div>
                </div>

                {/* Second Row */}
                <div className='flex gap-8'>
                    <div className='lg:w-1/2'>
                        <div className="mb-2 block">
                            <Label htmlFor="image" value="Image URL" />
                        </div>
                        <TextInput id="image" name='image' type="text" placeholder="Book Image URL" required defaultValue={bookData.image} />
                    </div>

                    <div className='lg:w-1/2'>
                        <div className="mb-2 block">
                            <Label htmlFor="inputState" value="Book category" />
                        </div>
                        <Select id="inputState" name='category' value={selectedBookCategory} onChange={handleChangeSelectedValue} className='w-full rounded'>
                            {
                                bookCategories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))
                            }
                        </Select>
                    </div>
                </div>

                {/* Third Row */}
                <div className="">
                    <div className="mb-2 block">
                        <Label htmlFor="description" value="Description" />
                    </div>
                    <Textarea id="description" placeholder="Add Book Description" required rows={6} className='w-full' defaultValue={bookData.description} />
                </div>

                {/* Row 4 */}
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="link" value="Book Link" />
                    </div>
                    <TextInput id="link" name='link' type="text" placeholder="Book Link" required defaultValue={bookData.link} />
                </div>

                <Button type="submit">Update Book</Button>
            </form>
        </div>
    );
};
