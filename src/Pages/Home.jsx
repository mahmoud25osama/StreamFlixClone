import { FaInfoCircle } from 'react-icons/fa'
import {
    getTrending,
    getMovieByGenre,
    getTopRated,
    getPopularMovies,
} from '@/services/tmdbService'

import heroImage from '@/assets/heroBanner.jpg'
import heroTitle from '@/assets/heroTitle.png'
import TitleCards from '@/Components/TitleCards'
import { Link } from 'react-router'
import { useState } from 'react'
import VideoPlayerModal from '@/Components/VideoPlayerModal'
import PlayerBtn from '@/Components/common/PlayerBtn'

function Home() {
    const [showPlayer, setShowPlayer] = useState(false)

    return (
        <div className="min-h-screen bg-black">
            {/* Hero Section */}
            <div className="relative h-screen overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src={heroImage}
                        alt="Hero Background"
                        className="w-full h-full object-cover scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
                </div>

                {/* Hero Content */}
                <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-16 max-w-7xl">
                    <div className="max-w-2xl">
                        <div className="mb-8">
                            <img
                                src={heroTitle}
                                alt="The Protector"
                                className="w-full max-w-md mb-6 drop-shadow-2xl"
                            />
                        </div>

                        <p className="text-white text-lg md:text-xl leading-relaxed mb-8 drop-shadow-lg font-light max-w-xl">
                            The epic adventure of Hakan, a young shopkeeper
                            whose modern world gets turned upside down when he
                            learns he’s connected to a secret, ancient order,
                            tasked with protecting Istanbul.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mb-12">
                            <PlayerBtn onClick={() => setShowPlayer(true)} />

                            <Link
                                to={`/contentDetail/${79026}?type=tv`}
                                className="group flex items-center justify-center gap-3 bg-gray-600/70 hover:bg-gray-600/50 text-white font-semibold text-lg px-8 py-3 rounded-md transition-all duration-200 backdrop-blur-sm border border-white/20 hover:border-white/40"
                            >
                                <FaInfoCircle className="text-white group-hover:scale-110 transition-transform duration-200" />
                                More Info
                            </Link>
                        </div>

                        <div className="flex items-center gap-4 text-white/60">
                            <div className="flex items-center gap-2">
                                <span className="text-sm">18+</span>
                                <span className="px-2 py-1 border border-white/40 text-xs rounded">
                                    HD
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                    <div className="animate-bounce">
                        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Sections */}
            <div className="relative z-20 bg-gradient-to-b from-transparent via-black to-black -mt-32 pt-32">
                <div className="px-6 md:px-16 space-y-12">
                    {/* Featured Row */}
                    <div className="mb-12">
                        <h2 className="text-white text-2xl md:text-3xl font-bold mb-8 flex items-center gap-3">
                            <span className="w-1 h-8 bg-red-600 rounded"></span>
                            Continue Watching
                        </h2>
                        <TitleCards fetchFunction={getPopularMovies} />
                    </div>

                    {/* Content Rows */}
                    <div className="space-y-12">
                        <div>
                            <TitleCards
                                title="Trending Now"
                                fetchFunction={getTrending}
                            />
                        </div>

                        <div>
                            <TitleCards
                                title="Action & Adventure"
                                fetchFunction={() => getMovieByGenre(12)}
                            />
                        </div>

                        <div>
                            <TitleCards
                                title="Action & Adventure"
                                fetchFunction={() => getMovieByGenre(35)}
                            />
                        </div>

                        <div>
                            <TitleCards
                                title="Top Picks for You"
                                fetchFunction={getTopRated}
                            />
                        </div>
                    </div>
                </div>

                {/* Footer spacing */}
                <div className="h-20"></div>
            </div>
            <VideoPlayerModal
                isOpen={showPlayer}
                onClose={() => setShowPlayer(false)}
                id={79026}
                type={'tv'}
                season="1"
                episode="1"
                title={'The Protector'}
            />
        </div>
    )
}

export default Home
