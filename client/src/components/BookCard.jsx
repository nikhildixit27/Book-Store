import React from 'react';
import { Link } from 'react-router-dom';
import { FaCartShopping } from 'react-icons/fa6'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';

function BookCard({ heading, books }) {
    return (
        <div className='mx-auto px-4 my-8 lg:px-24'>
            <h1 className='text-4xl text-center text-gray-900 font-bold mb-6'>{heading}</h1>

            <div className='mt-12'>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 2000, pauseOnMouseEnter: true }}
                    breakpoints={{
                        640: { slidesPerView: 2, spaceBetween: 20 },
                        768: { slidesPerView: 4, spaceBetween: 40 },
                        1024: { slidesPerView: 5, spaceBetween: 50 },
                    }}
                    modules={[Autoplay, Pagination]}
                    className="mySwiper"
                >
                    {books.map(book => (
                        <SwiperSlide key={book._id}>
                            <Link to={`/book/${book._id}`} className='block'>
                                <div className='relative overflow-hidden rounded-lg shadow-md'>
                                    <img src={book.image} alt={book.title} className='w-full h-80 object-cover' />
                                    {/* <div className='absolute top-2 right-2 bg-blue-600 hover:bg-black rounded-full p-2 transition duration-300'>
                                        <FaCartShopping className='w-5 h-5 text-white' />
                                    </div> */}
                                </div>
                                <div className='mt-4'>
                                    <h3 className='text-lg font-semibold text-gray-900 truncate'>{book.title}</h3>
                                    <p className='text-sm text-gray-700'>{book.author}</p>
                                    <p className='text-lg font-semibold text-red-600 mt-2'>₹{book.price}</p>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}

export default BookCard;
