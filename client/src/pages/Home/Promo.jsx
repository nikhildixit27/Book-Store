import { Link } from 'react-router-dom';
import awardBook from '../../assets/awardbooks.png';

export const Promo = () => {
    return (
        <div className='mt-16 py-12 bg-teal-100 px-4 lg:px-24'>
            <div className='flex flex-col md:flex-row justify-between items-center gap-12'>
                <div className='md:w-1/2'>
                    <h3 className='text-4xl md:text-5xl font-bold mb-6 leading-snug text-gray-800'>
                        Explore Award-Winning Books
                    </h3>
                    <p className='text-lg md:text-xl mb-6 text-gray-600'>
                        Discover the bestsellers honored at the 2024 National Book Awards.
                    </p>

                    <Link to="/shop" className='block text-center md:text-start'>
                        <button className='bg-blue-700 text-white font-semibold px-6 py-3 rounded hover:bg-black transition-all duration-200'>
                            Get Promo
                        </button>
                    </Link>
                </div>

                <div className=''>
                    <img src={awardBook} alt="Award Books" className='w-96' />
                </div>
            </div>
        </div>
    );
};
