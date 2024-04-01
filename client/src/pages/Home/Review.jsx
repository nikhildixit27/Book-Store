import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import { Rating, Avatar } from 'flowbite-react';
import profilePic from '../../assets/profile.jpg';

export const Review = () => {
    // Fake reviews data
    const reviews = [
        {
            rating: 5,
            text: "Fantastic selection of books! I found exactly what I was looking for. The service was great too.",
            author: "Raghav Dixit",
            position: "Reader",
            profilePic: "https://randomuser.me/api/portraits/men/79.jpg",
            bgColor: "#ead7c3"
        },
        {
            rating: 4,
            text: "Absolutely love this bookstore! They have a wide range of books and the staff is very helpful.",
            author: "Dhruv Dixit",
            position: "Book Enthusiast",
            profilePic: "https://randomuser.me/api/portraits/men/32.jpg",
            bgColor: "#83c5be"
        },
        {
            rating: 5,
            text: "Great experience shopping here. The website is easy to navigate and they offer fast delivery.",
            author: "Prachi Dixit",
            position: "Bookworm",
            profilePic: "https://randomuser.me/api/portraits/women/82.jpg",
            bgColor: "#edf6f9"
        },
        // {
        //     rating: 5,
        //     text: "This bookstore exceeded my expectations! The variety of books available is impressive, and the staff is incredibly knowledgeable and helpful. I had a wonderful shopping experience and will definitely be coming back!",
        //     author: "Hardkika Bhardwaj",
        //     position: "Book Enthusiast",
        //     profilePic: "https://randomuser.me/api/portraits/women/78.jpg",
        //     bgColor: "#dce0d9"
        // },
        // {
        //     rating: 4,
        //     text: "I had a delightful experience shopping at this bookstore! The ambiance is cozy, and the selection of books is fantastic. The staff was friendly and provided excellent recommendations. I'll definitely be returning soon!",
        //     author: "Alexandra Johnson",
        //     position: "Book Lover",
        //     profilePic: "https://randomuser.me/api/portraits/women/65.jpg",
        //     bgColor: "#f8f7ff"
        // }
    ];

    return (
        <div className='my-12 px-4 lg:px-20'>
            <h2 className='text-5xl font-bold text-center mb-10'>Our Customers</h2>
            <Swiper
                slidesPerView={1}
                spaceBetween={20}
                pagination={{ clickable: true }}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                breakpoints={{
                    640: { slidesPerView: 1, spaceBetween: 20 },
                    768: { slidesPerView: 2, spaceBetween: 40 },
                    1024: { slidesPerView: 3, spaceBetween: 50 },
                }}
                modules={[Autoplay, Pagination]}
                className=""
            >
                {/* Render each review slide */}
                {reviews.map((review, index) => (
                    <SwiperSlide key={index} className='shadow-2xl py-8 px-4 rounded-lg border transform transition duration-300 hover:scale-105' style={{ backgroundColor: review.bgColor }}>
                        <div className='space-y-6'>
                            {/* Rating */}
                            <Rating>
                                {[...Array(5)].map((_, index) => (
                                    <Rating.Star key={index} filled={index < review.rating} />
                                ))}
                            </Rating>
                            {/* Review Text */}
                            <div className='mt-7'>
                                <p className='mb-5 text-gray-900'>{review.text}</p>
                                {/* Author Info */}
                                <div className='flex items-center'>
                                    <Avatar img={review.profilePic || "https://randomuser.me/api/portraits/lego/2.jpg"} alt="Customer Avatar" rounded className='w-10 mr-4' />
                                    <div>
                                        <h5 className='text-lg font-medium'>{review.author}</h5>
                                        <p className='text-base text-gray-700'>{review.position}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};
