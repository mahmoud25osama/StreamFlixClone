// Components/common/showToast.js

export const showToast = (title, message) => {
    const baseStyle = 'flex items-center gap-2 '

    return (
        <div className={baseStyle}>
            <div>
                <p className="font-bold">{title}</p>
                {message && <p className="text-sm text-gray-400">{message}</p>}
            </div>
        </div>
    )
}
