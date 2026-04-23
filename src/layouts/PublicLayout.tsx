import { Outlet } from "react-router-dom"
import { Navbar } from "../components/layout/Navbar/Navbar"
import { Footer } from "../components/layout/Footer/Footer"
// import { Footer } from "../components/layout/Footer/Footer"

export const PublicLayout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}
