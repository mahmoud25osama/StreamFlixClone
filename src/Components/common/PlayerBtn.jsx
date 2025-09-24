import { FaPlay } from 'react-icons/fa'

function PlayerBtn({ onClick }) {
    return (
        <>
            <button
                onClick={onClick}
                className="cursor-pointer  flex items-center justify-center gap-3 bg-white hover:bg-white/90 text-black font-bold text-lg px-8 py-3 rounded-md transition-all duration-200 hover:scale-105 shadow-lg"
            >
                <FaPlay /> Play
            </button>
        </>
    )
}

export default PlayerBtn
