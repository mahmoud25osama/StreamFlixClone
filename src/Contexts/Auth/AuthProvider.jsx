// src/context/AuthProvider.jsx
import { useState, useEffect } from 'react'
import AuthContext from './AuthContext'
import { supabase } from '@/supabaseClient'
import LoadingSpinner from '@/Components/common/LoadingSpinner'

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [session, setSession] = useState(null)
    const [loading, setLoading] = useState(true)
    const [authError, setAuthError] = useState(null)

    useEffect(() => {
        const getSession = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession()
            setSession(session)
            setUser(session?.user || null)
            setLoading(false)
        }
        getSession()

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
            setUser(session?.user || null)
            setLoading(false)
        })

        return () => subscription.unsubscribe()
    }, [])

    const login = async (email, password) => {
        setAuthError(null)
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })
        if (error) {
            setAuthError(error.message)
            return null
        }
        return data
    }

    const register = async (email, password) => {
        setAuthError(null)
        const { data, error } = await supabase.auth.signUp({ email, password })
        if (error) {
            setAuthError(error.message)
            return null
        }
        return data
    }

    const logout = async () => {
        await supabase.auth.signOut()
        setUser(null)
        setSession(null)
    }

    if (loading) {
        return <LoadingSpinner />
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                session,
                login,
                register,
                logout,
                authError,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
