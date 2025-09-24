import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthProvider from './Contexts/Auth/AuthProvider.jsx'
import MyListProvider from './Contexts/myList/MyListProvider.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthProvider>
            <MyListProvider>
                <App />
            </MyListProvider>
        </AuthProvider>
    </StrictMode>
)
