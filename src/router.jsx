import { lazy } from 'react'
import { createBrowserRouter } from 'react-router'
const Home = lazy(() => import('@/Pages/Home.jsx'))
const TvShows = lazy(() => import('@/Pages/TvShows.jsx'))
const Movies = lazy(() => import('@/Pages/Movies.jsx'))
const NewAndPopular = lazy(() => import('@/Pages/NewAndPopular.jsx'))
const ContentDetail = lazy(() => import('@/Pages/ContentDetail.jsx'))
const NotFoundPage = lazy(() => import('@/Pages/NotFoundPage.jsx'))
const Layout = lazy(() => import('@/Pages/Layout.jsx'))
const Register = lazy(() => import('@/Pages/Register.jsx'))
const Login = lazy(() => import('@/Pages/Login.jsx'))
const MyList = lazy(() => import('@/Pages/MyList.jsx'))
const SearchResults = lazy(() => import('@/Pages/SearchResults.jsx'))
const About = lazy(() => import('@/Pages/About.jsx'))
const Contact = lazy(() => import('@/Pages/Contact.jsx'))
const LandingPage = lazy(() => import('@/Pages/LandingPage.jsx'))
const ProtectedRoute = lazy(() => import('@/Components/ProtectedRoute.jsx'))
const PublicRoute = lazy(() => import('@/Components/PublicRoute.jsx'))
const VideoPlayerModal = lazy(() => import('@/Components/VideoPlayerModal.jsx'))

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
