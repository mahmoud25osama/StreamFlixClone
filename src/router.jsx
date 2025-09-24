import { createBrowserRouter } from 'react-router'
import HomePage from '@/Pages/Home'
import TVShowsPage from '@/pages/TVShows'
import MoviesPage from '@/pages/Movies'
import NewAndPopular from '@/pages/NewAndPopular'
import ContentDetail from '@/pages/ContentDetail'
import NotFoundPage from '@/pages/NotFoundPage'
import ProtectedRoute from '@/Components/ProtectedRoute'
import PublicRoute from '@/Components/PublicRoute'
import Layout from '@/Pages/Layout'
import VideoPlayerModal from '@/Components/VideoPlayerModal'
import Register from '@/Pages/Register'
import Login from '@/Pages/Login'
import MyList from '@/Pages/MyList'
import SearchResults from '@/Pages/SearchResults'
import About from '@/Pages/About'
import Contact from '@/Pages/Contact'
import LandingPage from '@/Pages/LandingPage'

const router = createBrowserRouter([
    {
        path: '',
        element: <Layout />,
        children: [
            {
                index: true,
                element: (
                    <PublicRoute>
                        <LandingPage />
                    </PublicRoute>
                ),
            },
            {
                path: 'browse',
                element: (
                    <ProtectedRoute>
                        <HomePage />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'tv-shows',
                element: (
                    <ProtectedRoute>
                        <TVShowsPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'movies',
                element: (
                    <ProtectedRoute>
                        <MoviesPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: '/watch/:id',
                element: (
                    <ProtectedRoute>
                        <VideoPlayerModal />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'latest',
                element: (
                    <ProtectedRoute>
                        <NewAndPopular />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'myList',
                element: (
                    <ProtectedRoute>
                        <MyList />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'search',
                element: (
                    <ProtectedRoute>
                        <SearchResults />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'contentDetail/:id',
                element: (
                    <ProtectedRoute>
                        <ContentDetail />
                    </ProtectedRoute>
                ),
            },

            {
                path: 'about',
                element: (
                    <ProtectedRoute>
                        <About />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'contact',
                element: (
                    <ProtectedRoute>
                        <Contact />
                    </ProtectedRoute>
                ),
            },
        ],
    },
    {
        path: 'register',
        element: (
            <PublicRoute>
                <Register />
            </PublicRoute>
        ),
    },
    {
        path: 'login',
        element: (
            <PublicRoute>
                <Login />
            </PublicRoute>
        ),
    },
    { path: '*', element: <NotFoundPage /> },
])
export default router
