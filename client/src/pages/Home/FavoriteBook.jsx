import { Link } from 'react-router-dom';
// import favBookImage from '../../assets/favBooks.png';
import Lottie from 'react-lottie';
import animationData from '../../assets/Animation/HomePageBook.json';

export const FavoriteBook = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    }
    
    return (
        <div className='px-6 lg:px-24 my-20 flex flex-col md:flex-row justify-between items-center'>
            {/* Image */}
            <div className='md:w-1/2'>
                {/* <img src={favBookImage} alt="Favorite Book" className='md:w-10/12' /> */}
                <Lottie
                    options={defaultOptions}
                    height={350}
                    width={350}
                />
            </div>

            {/* Text */}
            <div className='md:w-1/2 space-y-6'>
                <h2 className='text-4xl md:text-5xl font-bold my-5 md:w-3/4 leading-snug text-center md:text-left text-gray-800'>
                    Discover Your Next Favorite Book
                </h2>

                <p className='md:w-5/6 mb-10 text-lg text-center md:text-left text-gray-600'>
                    Looking for your next captivating read? Browse our extensive collection of books to find your next favorite. From classic literature to contemporary bestsellers, we have something for everyone.
                </p>

                <div className='flex flex-col sm:flex-row justify-between gap-6 md:w-3/4 my-14'>
                    <div className='text-center'>
                        <h3 className='text-3xl font-bold text-emerald-600'>500+</h3>
                        <p className='text-lg text-gray-800'>Books Available</p>
                    </div>
                    <div className='text-center'>
                        <h3 className='text-3xl font-bold text-emerald-600'>800+</h3>
                        <p className='text-lg text-gray-800'>Registered Users</p>
                    </div>
                    <div className='text-center'>
                        <h3 className='text-3xl font-bold text-emerald-600'>1000+</h3>
                        <p className='text-lg text-gray-800'>PDF Downloads</p>
                    </div>
                </div>

                <Link to="/shop" className='block text-center md:text-start'>
                    <button className='bg-blue-700 text-white font-semibold px-5 py-2 rounded hover:bg-black transition-all duration-200'>
                        Explore Books
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default FavoriteBook;
