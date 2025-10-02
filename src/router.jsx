import { lazy } from 'react'
import { createBrowserRouter } from 'react-router'
import Home from '@/Pages/Home.jsx'
import Layout from '@/Pages/Layout.jsx'
import Register from '@/Pages/Register.jsx'
import Login from '@/Pages/Login.jsx'
import NotFoundPage from '@/Pages/NotFoundPage.jsx'
import LandingPage from '@/Pages/LandingPage.jsx'
import ProtectedRoute from '@/Components/ProtectedRoute.jsx'
import PublicRoute from '@/Components/PublicRoute.jsx'
import VideoPlayerModal from '@/Components/VideoPlayerModal.jsx'
// Lazy loaded Pages
const TvShows = lazy(() => import('@/Pages/TvShows.jsx'))
const Movies = lazy(() => import('@/Pages/Movies.jsx'))
const NewAndPopular = lazy(() => import('@/Pages/NewAndPopular.jsx'))
const ContentDetail = lazy(() => import('@/Pages/ContentDetail.jsx'))
const MyList = lazy(() => import('@/Pages/MyList.jsx'))
import SearchResults from '@/Pages/SearchResults.jsx'
const About = lazy(() => import('@/Pages/About.jsx'))
const Contact = lazy(() => import('@/Pages/Contact.jsx'))

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
