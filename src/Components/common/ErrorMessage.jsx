import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router'

const ErrorMessage = ({
    message = 'Something went wrong',
    showBackButton = true,
}) => {
    const navigate = useNavigate()
    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="text-center">
                <h2 className="text-white text-2xl font-bold mb-4">
                    Content Not Found
                </h2>
                <p className="text-gray-400 mb-6">{message}</p>
                {showBackButton && (
                    <button
                        onClick={() => navigate(-1)}
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded font-semibold transition-colors flex items-center gap-2 mx-auto"
                    >
                        <FaArrowLeft />
                        Go Back
                    </button>
                )}
            </div>
        </div>
    )
}

export default ErrorMessage
