import { useEffect } from 'react'
import { FaTimes } from 'react-icons/fa'
import { useState } from 'react'
import { getTrailerKey } from '../services/tmdbService'
import Logo from './common/Logo'

const VideoPlayerModal = ({ isOpen, onClose, id, type, title = '' }) => {
    const [trailerUrl, setTrailerUrl] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!isOpen) return
        const fetchFeatured = async () => {
            try {
                setIsLoading(true)
                const data = await getTrailerKey(id, type)
                console.log('key', data)

                setTrailerUrl(data)
            } catch (err) {
                console.error('Error fetching featured TV show:', err)
            } finally {
                setIsLoading(false)
            }
        }
        fetchFeatured()
        if (isOpen) {
            document.body.classList.add('overflow-hidden')
        } else {
            document.body.classList.remove('overflow-hidden')
        }
        return () => {
            document.body.classList.remove('overflow-hidden')
        }
    }, [id, type, isOpen])
    if (!isOpen) return null

    const handleIframeLoad = () => {
        setIsLoading(false)
    }
    const handleClose = () => {
        setIsLoading(true)
        onClose()
    }

    return (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
            <div className="relative w-full h-full max-w-7xl max-h-[90vh]">
                {/* Video iframe */}
                <iframe
                    src={trailerUrl}
                    className="w-full h-full rounded-lg border-0"
                    allowFullScreen
                    title={title}
                    onLoad={handleIframeLoad}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-20">
                        <div className="text-center text-white">
                            <Logo
                                variant="main"
                                width={250}
                                height={75}
                                className="animate-pulse"
                            />
                        </div>
                    </div>
                )}
                {/* Top Header */}
                <div className="absolute top-0 left-0 right-0 p-4 z-10 flex items-center justify-between ">
                    <h2 className="text-lg md:text-xl font-bold text-white">
                        {title}
                    </h2>
                    <button
                        onClick={handleClose}
                        className="text-white cursor-pointer hover:text-gray-300 transition-colors p-2 hover:bg-white/20 rounded-full"
                    >
                        <FaTimes className="w-6 h-6" />
                    </button>
                </div>

                {/* Bottom Info Bar */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 z-10">
                    <div className="text-center text-white">
                        <p className="text-sm text-gray-300">
                            Official Trailer
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoPlayerModal
