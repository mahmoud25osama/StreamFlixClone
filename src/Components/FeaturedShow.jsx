import { useEffect } from 'react'
import { useState } from 'react'
import VideoPlayerModal from '@/Components/VideoPlayerModal.jsx'
import PlayerBtn from '@/Components/common/PlayerBtn.jsx'
import AddBtn from '@/Components/common/AddBtn.jsx'

function FeaturedShow({ fetchFunction, type = 'movie' }) {
    const [featuredShow, setFeaturedShow] = useState(null)
    const [showPlayer, setShowPlayer] = useState(false)

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const data = await fetchFunction()
                setFeaturedShow({ ...data.results[0] })
            } catch (err) {
                console.error('Error fetching featured TV show:', err)
            }
        }
        fetchFeatured()
    }, [fetchFunction])
    return (
        <>
            {featuredShow && (
                <div className="relative h-screen overflow-hidden">
                    <div className="absolute inset-0">
                        <img
                            src={`https://image.tmdb.org/t/p/original${featuredShow.backdrop_path}`}
                            alt={featuredShow.name || featuredShow.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                    </div>
                    <div className="absolute flex flex-col justify-center z-10 h-full left-6 md:left-16 max-w-2xl">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                            {featuredShow.title || featuredShow.name}
                        </h1>
                        <p className="text-lg text-gray-200 mb-6 leading-relaxed drop-shadow line-clamp-3">
                            {featuredShow.overview}
                        </p>
                        <div className="flex gap-4">
                            <PlayerBtn onClick={() => setShowPlayer(true)} />
                            <AddBtn
                                title={featuredShow.title || featuredShow.name}
                                id={featuredShow.id}
                                type={type}
                            />
                        </div>
                    </div>
                    <VideoPlayerModal
                        isOpen={showPlayer}
                        onClose={() => setShowPlayer(false)}
                        id={featuredShow?.id}
                        type={type}
                        season="1"
                        episode="1"
                        title={featuredShow?.name || featuredShow?.title}
                        trailerKey={featuredShow?.id} // YouTube video key
                    />
                </div>
            )}
        </>
    )
}

export default FeaturedShow
