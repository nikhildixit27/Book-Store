import React from 'react'
import Banner from './Banner'
import BestSellerBooks from './BestSellerBooks'
import { FavoriteBook } from './FavoriteBook'
import { Promo } from './Promo'
import { MoreBooks } from './MoreBooks'
import { Review } from './Review'
import Header from '../../components/Header'
import MainFooter from '../../components/MainFooter'
import ContactMe from './ContactMe'

function Home() {
    return (
        <>
            <Header />
            <div>
                <Banner />
                <BestSellerBooks />
                <FavoriteBook />
                {/* <Promo /> */}
                <Review />
                <MoreBooks />
                <ContactMe />
            </div>
            <MainFooter />
        </>
    )
}

export default Home