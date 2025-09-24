import { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { FaEye, FaEyeSlash, FaSpinner } from 'react-icons/fa'
import { NavLink, useNavigate } from 'react-router'
import background_banner from '../assets/background_banner.jpg'
import useAuth from '../CustomHooks/useAuth'
import Logo from '@/Components/common/Logo'

// Validation Schema
const loginSchema = Yup.object().shape({
    email: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
})

const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
        try {
            await login(values.email, values.password)
            navigate('/browse')
        } catch (err) {
            setFieldError('email', 'Invalid username or password', err)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen bg-black relative overflow-hidden">
            <div className="absolute inset-0">
                <img
                    src={background_banner}
                    alt="Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-black" />
            </div>

            {/* Header */}
            <header className="relative z-10 px-6 py-4 md:px-16">
                <NavLink to="/" className="inline-block cursor-pointer">
                    <Logo
                        variant={'main'}
                        width={200}
                        height={60}
                        className="transition-all duration-300"
                    />
                </NavLink>
            </header>

            {/* Login Form */}
            <div className="relative z-10 flex items-center justify-center px-6 py-12">
                <div className="w-full max-w-md">
                    <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 md:p-12 border border-gray-800">
                        <h1 className="text-white text-3xl font-bold mb-8">
                            Sign In
                        </h1>

                        <Formik
                            initialValues={{
                                email: '',
                                password: '',
                                rememberMe: false,
                            }}
                            validationSchema={loginSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting, touched, errors }) => (
                                <Form className="space-y-6">
                                    {/* Email Field */}
                                    <div className="relative">
                                        <Field
                                            type="email"
                                            name="email"
                                            placeholder="Email or phone number"
                                            className={`w-full px-4 py-4 bg-gray-700 text-white rounded-md border transition-all duration-200 placeholder-gray-400 focus:outline-none focus:ring-1 ${
                                                touched.email && errors.email
                                                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                                    : 'border-gray-600 focus:border-white focus:ring-white'
                                            }`}
                                        />
                                        <ErrorMessage
                                            name="email"
                                            component="p"
                                            className="text-red-500 text-sm mt-2"
                                        />
                                    </div>

                                    {/* Password Field */}
                                    <div className="relative">
                                        <Field
                                            type={
                                                showPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            name="password"
                                            placeholder="Password"
                                            className={`w-full px-4 py-4 bg-gray-700 text-white rounded-md border pr-12 transition-all duration-200 placeholder-gray-400 focus:outline-none focus:ring-1 ${
                                                touched.password &&
                                                errors.password
                                                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                                    : 'border-gray-600 focus:border-white focus:ring-white'
                                            }`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                                        >
                                            {showPassword ? (
                                                <FaEyeSlash />
                                            ) : (
                                                <FaEye />
                                            )}
                                        </button>
                                        <ErrorMessage
                                            name="password"
                                            component="p"
                                            className="text-red-500 text-sm mt-2"
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-md transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <FaSpinner className="animate-spin" />
                                                Signing In...
                                            </>
                                        ) : (
                                            'Sign In'
                                        )}
                                    </button>

                                    {/* Remember Me */}
                                    <div className="flex items-center">
                                        <Field
                                            type="checkbox"
                                            name="rememberMe"
                                            id="rememberMe"
                                            className="w-4 h-4 text-red-600 bg-gray-700 border-gray-600 rounded focus:ring-red-500 focus:ring-2"
                                        />
                                        <label
                                            htmlFor="rememberMe"
                                            className="ml-3 text-gray-300 text-sm cursor-pointer"
                                        >
                                            Remember me
                                        </label>
                                    </div>
                                </Form>
                            )}
                        </Formik>

                        {/* Help Links */}
                        <div className="text-right mt-4">
                            <NavLink
                                to="/help"
                                className="text-gray-300 hover:text-white text-sm hover:underline transition-colors duration-200"
                            >
                                Need help?
                            </NavLink>
                        </div>

                        <div className="flex-1 mt-8 border-t border-gray-600"></div>
                        <div className="mt-8 text-center">
                            <p className="text-gray-400">
                                New to StreamFlix?{' '}
                                <NavLink
                                    to="/register"
                                    className="text-white hover:underline font-medium transition-colors duration-200"
                                >
                                    Sign up now
                                </NavLink>
                            </p>
                        </div>

                        {/* Terms */}
                        <div className="mt-4">
                            <p className="text-gray-500 text-xs leading-relaxed">
                                This page is protected by Google reCAPTCHA to
                                ensure you're not a bot.{' '}
                                <button className="text-blue-500 hover:underline">
                                    Learn more
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="relative z-10 mt-auto px-6 py-8 md:px-16">
                <div className="max-w-4xl">
                    <p className="text-gray-400 text-sm mb-4">
                        Questions? Call{' '}
                        <a
                            href="tel:1-844-505-2993"
                            className="hover:underline"
                        >
                            1-844-505-2993
                        </a>
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        {[
                            ['FAQ', 'Help Center', 'Terms of Use', 'Privacy'],
                            [
                                'Cookie Preferences',
                                'Corporate Information',
                                '',
                                '',
                            ],
                        ]
                            .flat()
                            .filter(Boolean)
                            .map((link, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className="text-gray-400 hover:text-white hover:underline block transition-colors duration-200"
                                >
                                    {link}
                                </a>
                            ))}
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Login
