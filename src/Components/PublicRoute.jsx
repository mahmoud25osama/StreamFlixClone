import { Navigate } from 'react-router'
import useAuth from '@/CustomHooks/useAuth'

const PublicRoute = ({ children }) => {
    const { user, loading } = useAuth()

    if (loading) {
        return <div className="text-white text-center py-20">Loading...</div>
    }

    return user ? <Navigate to="/browse" replace /> : children
}

export default PublicRoute
