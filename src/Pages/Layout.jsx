import { Outlet } from 'react-router'
import useAuth from '@/CustomHooks/useAuth'
import Footer from '@/Components/Layout/Footer'
import Navbar from '@/Components/Layout/Navbar'

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
