import Header from "../../components/Header"
import MainFooter from "../../components/MainFooter"
import AllBooks from "./AllBooks"

const Shop = () => {
    return (
        <>
            <Header />
            <div className="w-full flex flex-col p-6">
                <AllBooks />
            </div>
            <MainFooter />
        </>
    )
}

export default Shop
