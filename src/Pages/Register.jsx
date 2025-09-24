import { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import {
    FaEye,
    FaEyeSlash,
    FaCheck,
    FaArrowLeft,
    FaArrowRight,
} from 'react-icons/fa'
import { NavLink, useLocation, useNavigate } from 'react-router'
import background_banner from '@/assets/bgBanner.jpg'
import useAuth from '@/CustomHooks/useAuth.jsx'
import { useEffect } from 'react'
import Logo from '@/Components/common/Logo.jsx'
// Validation Schemas for each step
const stepOneSchema = Yup.object().shape({
    email: Yup.string()
        .transform((value) => (value ? value.trim() : ''))
        .email('Please enter a valid email address')
        .required('Email is required'),
})

const stepTwoSchema = Yup.object().shape({
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            'Password must contain at least one uppercase letter, one lowercase letter, and one number'
        )
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Please confirm your password'),
})

const stepThreeSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'First name must be at least 2 characters')
        .required('First name is required'),
    lastName: Yup.string()
        .min(2, 'Last name must be at least 2 characters')
        .required('Last name is required'),
    phone: Yup.string()
        .matches(/^[+]?[1-9][\d]{10,14}$/, 'Please enter a valid phone number')
        .optional(),
    birthDate: Yup.date()
        .max(new Date(), 'Birth date cannot be in the future')
        .required('Birth date is required'),
    agreeToTerms: Yup.boolean().oneOf(
        [true],
        'You must agree to the terms and conditions'
    ),
})

const Register = () => {
    const [currentStep, setCurrentStep] = useState(1)
    const [showPassword, setShowPassword] = useState(false)
    const { register } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const emailFromState = location.state?.email || ''
    const [email, setEmail] = useState(emailFromState)
    const [formData, setFormData] = useState({
        email: email,
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        phone: '',
        birthDate: '',
        agreeToTerms: false,
    })

    useEffect(() => {
        if (emailFromState) {
            setEmail(emailFromState)
        }
    }, [emailFromState])
    const getValidationSchema = () => {
        switch (currentStep) {
            case 1:
                return stepOneSchema
            case 2:
                return stepTwoSchema
            case 3:
                return stepThreeSchema
            default:
                return stepOneSchema
        }
    }

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await register(values.email, values.password)
            navigate('/browse')
        } catch (err) {
            console.error('Registration error:', err.message)
        } finally {
            setSubmitting(false)
        }
    }

    const handleNext = (values) => {
        setFormData({ ...formData, ...values })
        if (currentStep < 4) {
            setCurrentStep(currentStep + 1)
        }
    }

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1)
        }
    }

    const StepOne = ({ values }) => (
        <div>
            <h2 className="text-2xl font-bold text-white mb-4">
                What's your email?
            </h2>
            <p className="text-gray-400 mb-6">
                We'll use this email to create your Netflix account and send you
                updates.
            </p>
            <Field
                type="email"
                name="email"
                value={values.email}
                placeholder="Enter your email address"
                className="w-full px-4 py-4 bg-gray-700 text-white rounded-md border border-gray-600 focus:border-white focus:outline-none focus:ring-1 focus:ring-white transition-all duration-200 placeholder-gray-400"
            />
            <ErrorMessage
                name="email"
                component="p"
                className="text-red-500 text-sm mt-2"
            />
        </div>
    )

    const StepTwo = () => (
        <div>
            <h2 className="text-2xl font-bold text-white mb-4">
                Create your password
            </h2>
            <p className="text-gray-400 mb-6">
                Choose a strong password to secure your Netflix account.
            </p>

            <div className="space-y-4">
                <div className="relative">
                    <Field
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="Password"
                        className="w-full px-4 py-4 bg-gray-700 text-white rounded-md border border-gray-600 focus:border-white focus:outline-none focus:ring-1 focus:ring-white transition-all duration-200 placeholder-gray-400 pr-12"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                    <ErrorMessage
                        name="password"
                        component="p"
                        className="text-red-500 text-sm mt-2"
                    />
                </div>

                <div>
                    <Field
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm password"
                        className="w-full px-4 py-4 bg-gray-700 text-white rounded-md border border-gray-600 focus:border-white focus:outline-none focus:ring-1 focus:ring-white transition-all duration-200 placeholder-gray-400"
                    />
                    <ErrorMessage
                        name="confirmPassword"
                        component="p"
                        className="text-red-500 text-sm mt-2"
                    />
                </div>
            </div>

            <div className="mt-4 text-sm text-gray-400">
                <p>Password requirements:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>At least 6 characters long</li>
                    <li>Contains uppercase and lowercase letters</li>
                    <li>Contains at least one number</li>
                </ul>
            </div>
        </div>
    )

    const StepThree = () => (
        <div>
            <h2 className="text-2xl font-bold text-white mb-4">
                Tell us about yourself
            </h2>
            <p className="text-gray-400 mb-6">
                We need some basic information to complete your Netflix account.
            </p>

            <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <Field
                            type="text"
                            name="firstName"
                            placeholder="First name"
                            className="w-full px-4 py-4 bg-gray-700 text-white rounded-md border border-gray-600 focus:border-white focus:outline-none focus:ring-1 focus:ring-white transition-all duration-200 placeholder-gray-400"
                        />
                        <ErrorMessage
                            name="firstName"
                            component="p"
                            className="text-red-500 text-sm mt-1"
                        />
                    </div>

                    <div>
                        <Field
                            type="text"
                            name="lastName"
                            placeholder="Last name"
                            className="w-full px-4 py-4 bg-gray-700 text-white rounded-md border border-gray-600 focus:border-white focus:outline-none focus:ring-1 focus:ring-white transition-all duration-200 placeholder-gray-400"
                        />
                        <ErrorMessage
                            name="lastName"
                            component="p"
                            className="text-red-500 text-sm mt-1"
                        />
                    </div>
                </div>

                <div>
                    <Field
                        type="tel"
                        name="phone"
                        placeholder="Phone number (optional)"
                        className="w-full px-4 py-4 bg-gray-700 text-white rounded-md border border-gray-600 focus:border-white focus:outline-none focus:ring-1 focus:ring-white transition-all duration-200 placeholder-gray-400"
                    />
                    <ErrorMessage
                        name="phone"
                        component="p"
                        className="text-red-500 text-sm mt-1"
                    />
                </div>

                <div>
                    <label className="block text-white text-sm font-medium mb-2">
                        Date of Birth
                    </label>
                    <Field
                        type="date"
                        name="birthDate"
                        className="w-full px-4 py-4 bg-gray-700 text-white rounded-md border border-gray-600 focus:border-white focus:outline-none focus:ring-1 focus:ring-white transition-all duration-200"
                    />
                    <ErrorMessage
                        name="birthDate"
                        component="p"
                        className="text-red-500 text-sm mt-1"
                    />
                </div>

                <div className="flex items-center space-x-3">
                    <Field
                        type="checkbox"
                        name="agreeToTerms"
                        className="w-5 h-5 text-red-600 bg-gray-700 border-gray-600 rounded focus:ring-red-500 focus:ring-2"
                    />
                    <label className="text-sm text-gray-300">
                        I agree to the{' '}
                        <a href="#" className="text-red-500 hover:underline">
                            Terms of Use
                        </a>{' '}
                        and{' '}
                        <a href="#" className="text-red-500 hover:underline">
                            Privacy Policy
                        </a>
                    </label>
                </div>
                <ErrorMessage
                    name="agreeToTerms"
                    component="p"
                    className="text-red-500 text-sm"
                />
            </div>
        </div>
    )

    return (
        <div className="min-h-screen relative bg-black">
            {/* background */}
            <div className="absolute inset-0">
                <img
                    src={background_banner}
                    alt="Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-black" />
            </div>
            {/* Header */}
            <header className="relative z-10 px-6 py-6 md:px-16">
                <div className="flex justify-between items-center">
                    <NavLink to="/" className="inline-block cursor-pointer">
                        <Logo
                            variant={'main'}
                            width={200}
                            height={60}
                            className="transition-all duration-300"
                        />
                    </NavLink>
                </div>
            </header>

            {/* Registration Form */}
            <div className="flex items-center justify-center px-6 py-12">
                <div className="w-full max-w-2xl">
                    <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 md:p-12 border border-gray-800">
                        {/* StepIndicator  */}
                        <div className="mb-8">
                            <div className="flex items-center justify-center space-x-4">
                                {[1, 2, 3].map((step) => (
                                    <div
                                        key={step}
                                        className="flex items-center"
                                    >
                                        <div
                                            className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                                                step < currentStep
                                                    ? 'bg-green-600 border-green-600 text-white'
                                                    : step === currentStep
                                                    ? 'bg-red-600 border-red-600 text-white'
                                                    : 'border-gray-600 text-gray-400'
                                            }`}
                                        >
                                            {step < currentStep ? (
                                                <FaCheck />
                                            ) : (
                                                step
                                            )}
                                        </div>
                                        {step < 3 && (
                                            <div
                                                className={`w-12 h-0.5 mx-2 ${
                                                    step < currentStep
                                                        ? 'bg-green-600'
                                                        : 'bg-gray-600'
                                                }`}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="text-center mt-4">
                                <p className="text-gray-400 text-sm">
                                    Step {currentStep} of 3:{' '}
                                    {currentStep === 1
                                        ? 'Email Verification'
                                        : currentStep === 2
                                        ? 'Create Password'
                                        : 'Personal Information'}
                                </p>
                            </div>
                        </div>

                        <Formik
                            initialValues={formData}
                            validationSchema={getValidationSchema()}
                            onSubmit={
                                currentStep === 3 ? handleSubmit : handleNext
                            }
                            enableReinitialize
                        >
                            {({ values }) => (
                                <Form>
                                    {/* Step Content */}
                                    <div className="mb-8">
                                        {currentStep === 1 && (
                                            <StepOne values={values} />
                                        )}
                                        {currentStep === 2 && <StepTwo />}
                                        {currentStep === 3 && <StepThree />}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-col sm:flex-row gap-4 justify-between">
                                        {currentStep > 1 && (
                                            <button
                                                type="button"
                                                onClick={handleBack}
                                                className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-md transition-colors font-medium flex items-center justify-center gap-2"
                                            >
                                                <FaArrowLeft />
                                                Back
                                            </button>
                                        )}

                                        <button
                                            type="submit"
                                            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md transition-all duration-200 font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed flex-1 sm:flex-initial"
                                        >
                                            <>
                                                {currentStep === 3
                                                    ? 'Create Account'
                                                    : 'Continue'}
                                                {currentStep < 3 && (
                                                    <FaArrowRight />
                                                )}
                                            </>
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>

                        {/* Footer Text */}
                        <div className="mt-8 pt-6 border-t border-gray-700">
                            <p className="text-center text-gray-400 text-sm">
                                Already have an account?{' '}
                                <NavLink
                                    to="/login"
                                    className="text-red-500 hover:text-red-400 font-medium"
                                >
                                    Sign in here
                                </NavLink>
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

export default Register
