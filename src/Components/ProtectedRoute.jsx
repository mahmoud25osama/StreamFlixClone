import { Navigate } from 'react-router'
import useAuth from '../CustomHooks/useAuth'

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth()

    if (loading) {
        return <div className="text-white text-center py-20">Loading...</div>
    }

    return user ? children : <Navigate to="/" replace />
}

export default ProtectedRoute
