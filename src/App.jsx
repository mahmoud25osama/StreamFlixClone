import { RouterProvider } from 'react-router'

import router from './router'
import { Toaster } from 'sonner'

function App() {
    return (
        <>
            <RouterProvider router={router} />
            <Toaster richColors position="top-center" />
        </>
    )
}

export default App
