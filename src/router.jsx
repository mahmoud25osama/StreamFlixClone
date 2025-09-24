import { createBrowserRouter } from 'react-router'
import Home from '@/Pages/Home.jsx'
import TvShows from '@/Pages/TvShows.jsx'
import Movies from '@/Pages/Movies.jsx'
import NewAndPopular from '@/pages/NewAndPopular.jsx'
import ContentDetail from '@/pages/ContentDetail.jsx'
import NotFoundPage from '@/pages/NotFoundPage.jsx'
import ProtectedRoute from '@/Components/ProtectedRoute.jsx'
import PublicRoute from '@/Components/PublicRoute.jsx'
import Layout from '@/Pages/Layout.jsx'
import VideoPlayerModal from '@/Components/VideoPlayerModal.jsx'
import Register from '@/Pages/Register.jsx'
import Login from '@/Pages/Login.jsx'
import MyList from '@/Pages/MyList.jsx'
import SearchResults from '@/Pages/SearchResults.jsx'
import About from '@/Pages/About.jsx'
import Contact from '@/Pages/Contact.jsx'
import LandingPage from '@/Pages/LandingPage.jsx'

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
                        <Home />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'tv-shows',
                element: (
                    <ProtectedRoute>
                        <TvShows />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'movies',
                element: (
                    <ProtectedRoute>
                        <Movies />
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
