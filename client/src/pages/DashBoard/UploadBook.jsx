import React, { useContext, useEffect, useState } from 'react'
import { Button, Checkbox, Label, TextInput, FileInput, Select, Textarea } from 'flowbite-react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Context/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';

export const UploadBook = () => {

    // const { user } = useContext(AuthContext);
    // alert(user);

    // const location = useLocation();
    // const navigate = useNavigate();;

    // useEffect(() => {
    //     if (!user) {
    //         navigate('/login', { replace: true });
    //     }
    // }, [user])

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

    const [selectedCategory, setSelectedCategory] = useState(bookCategories[0]);

    const handleChangeSelectedValue = (e) => {
        setSelectedCategory(e.target.value);
    }

    const handleBookSubmit = (e) => {
        e.preventDefault();
        const form = e.target;

        const title = form.title.value;
        const author = form.author.value;
        const image = form.image.value;
        const description = form.description.value;
        const link = form.link.value;
        const category = form.category.value;
        const price = form.price.value;

        const newBook = { title, author, image, description, link, category, price };

        // Add to database

        fetch('http://localhost:5000/upload-book', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newBook)
        })
            .then(res => res.json())
            .then(data => {
                toast.success('Book Uploaded Successfully!!');
                form.reset();
            })
    }

    return (
        <div className='px-4 my-12'>
            <h2 className='mb-8 text-3xl font-bold text-center'>
                Upload book
            </h2>

            <form onSubmit={handleBookSubmit} className="flex lg:w-[1180px] flex-col flex-wrap gap-4">
                {/* First Row */}
                <div className='flex gap-8'>
                    <div className='lg:w-1/2'>
                        <div className="mb-2 block">
                            <Label htmlFor="title" value="Book Title" />
                        </div>
                        <TextInput id="title" name='title' type="text" placeholder="Book Name" required />
                    </div>

                    <div className='lg:w-1/2'>
                        <div className="mb-2 block">
                            <Label htmlFor="author" value="Author" />
                        </div>
                        <TextInput id="author" name='author' type="text" placeholder="Author Name" required />
                    </div>
                </div>

                {/* Second Row */}
                <div className='flex gap-8'>
                    <div className='lg:w-1/2'>
                        <div className="mb-2 block">
                            <Label htmlFor="image" value="Image URL" />
                        </div>
                        <TextInput id="image" name='image' type="text" placeholder="Book Image URL" required />
                    </div>

                    <div className='lg:w-1/2'>
                        <div className="mb-2 block">
                            <Label htmlFor="inputState" value="Book Category" />
                        </div>

                        <Select id="inputState" name='category' value={selectedCategory} onChange={handleChangeSelectedValue} className='w-full rounded'>
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
                    <Textarea id="description" placeholder="Add Book Description" required rows={6}
                        className='w-full'
                    />
                </div>

                {/* Row 4 */}

                <div className='flex gap-8'>
                    <div className='lg:w-1/2'>
                        <div className="mb-2 block">
                        <Label htmlFor="link" value="Book Link" />
                    </div>
                    <TextInput id="link" name='link' type="text" placeholder="Book Link" required />
                    </div>

                    <div className='lg:w-1/2'>
                        <div className="mb-2 block">
                            <Label htmlFor="price" value="Price" />
                        </div>
                        <TextInput id="price" name='price' type="text" placeholder="Enter Price" required />
                    </div>
                </div>

                <Button type="submit">Upload Book</Button>


            </form >
        </div >
    )
}