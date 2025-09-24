import Logo from './Logo.jsx'

const LoadingSpinner = ({
    width = 250,
    height = 75,
    text = 'Loading...',
    className = '',
}) => {
    return (
        <div
            className={`flex flex-col h-screen items-center justify-center ${className}`}
        >
            <Logo
                variant="main"
                width={width}
                height={height}
                className="animate-pulse"
            />
            {text && (
                <p className="mt-1 text-gray-400 text-sm font-bold animate-pulse">
                    {text}
                </p>
            )}
        </div>
    )
}

export default LoadingSpinner
