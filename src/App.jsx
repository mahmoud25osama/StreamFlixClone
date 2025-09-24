import { RouterProvider } from 'react-router'

import router from './router'
import { Toaster } from 'sonner'
import { Suspense } from 'react'
import LoadingSpinner from '@/Components/common/LoadingSpinner.jsx'

function App() {
    return (
        <>
            <Suspense fallback={<LoadingSpinner />}>
                <RouterProvider router={router} />
            </Suspense>
            <Toaster richColors position="top-center" />
        </>
    )
}

export default App
