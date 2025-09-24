import { Outlet } from 'react-router'
import useAuth from '@/CustomHooks/useAuth.jsx'
import Footer from '@/Components/Layout/Footer.jsx'
import Navbar from '@/Components/Layout/Navbar.jsx'

function Layout() {
    const { user } = useAuth()
    return (
        <div className="min-h-screen bg-black">
            <Navbar />
            <Outlet />
            {user && <Footer />}
        </div>
    )
}

export default Layout
