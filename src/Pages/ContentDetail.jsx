import { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router'
import { FaStar, FaCalendarAlt, FaClock } from 'react-icons/fa'
import {
    getMovieDetails,
    getTvDetails,
    getCredits,
} from '@/services/tmdbService.js'
import VideoPlayerModal from '@/Components/VideoPlayerModal.jsx'
import ErrorMessage from '@/Components/common/ErrorMessage.jsx'
import LoadingSpinner from '@/Components/common/LoadingSpinner.jsx'
import PlayerBtn from '@/Components/common/PlayerBtn.jsx'
import AddBtn from '@/Components/common/AddBtn.jsx'

function ContentDetail() {
    const { id } = useParams()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const type = queryParams.get('type') || 'movie'

    // States
    const [showFullDescription, setShowFullDescription] = useState(false)
    const [contentDetail, setContentDetail] = useState(null)
    const [cast, setCast] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [showPlayer, setShowPlayer] = useState(false)

    const formatRuntime = (minutes) => {
        if (!minutes) return 'N/A'
        const hours = Math.floor(minutes / 60)
        const mins = minutes % 60
        return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                setError(null)
                let data
                if (type === 'movie') {
                    data = await getMovieDetails(id)
                } else {
                    data = await getTvDetails(id)
                }
                setContentDetail(data)
                // Fetch credits
                const creditData = await getCredits(id, type)
                setCast(creditData.cast?.slice(0, 10))
            } catch (err) {
                console.error('Error fetching content details:', err)
                setError(err.message || 'Failed to load content')
            } finally {
                setLoading(false)
            }
        }

        if (id) {
            fetchData()
        }
    }, [id, type])

    if (loading) {
        return <LoadingSpinner size="xl" text="Loading content details..." />
    }

    if (error || !contentDetail) {
        return <ErrorMessage message={error} />
    }

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Hero Section */}
            <div className="relative h-screen">
                {/* bg image */}
                {contentDetail.backdrop_path && (
                    <div className="absolute inset-0">
                        <img
                            src={`https://image.tmdb.org/t/p/original${contentDetail.backdrop_path}`}
                            alt={contentDetail.title || contentDetail.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
                    </div>
                )}

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-16 max-w-4xl">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-2xl">
                        {contentDetail.title || contentDetail.name}
                    </h1>

                    {/* Metadata */}
                    <div className="flex flex-wrap items-center gap-4 mb-6 text-lg">
                        <div className="flex items-center gap-2">
                            <FaStar className="text-yellow-500" />
                            <span className="font-semibold">
                                {contentDetail.vote_average?.toFixed(1) ||
                                    'N/A'}
                            </span>
                        </div>
                        <span>
                            {new Date(
                                contentDetail.release_date ||
                                    contentDetail.first_air_date
                            ).getFullYear()}
                        </span>
                        <span className="border border-white/60 px-2 py-1 text-sm rounded">
                            {contentDetail.adult ? 'R' : 'PG-13'}
                        </span>
                        {contentDetail.type === 'tv' ? (
                            <>
                                {contentDetail.number_of_seasons && (
                                    <span>
                                        {contentDetail.number_of_seasons ||
                                            null}{' '}
                                        Season
                                        {contentDetail.number_of_seasons > 1
                                            ? 's'
                                            : ''}
                                    </span>
                                )}
                                {contentDetail.number_of_episodes && (
                                    <span>
                                        {contentDetail.number_of_episodes ||
                                            null}{' '}
                                        Episodes
                                    </span>
                                )}
                            </>
                        ) : (
                            contentDetail.runtime ||
                            (contentDetail.episode_run_time &&
                                contentDetail.episode_run_time[0] && (
                                    <div className="flex items-center gap-1">
                                        <FaClock />
                                        <span>
                                            {formatRuntime(
                                                contentDetail.runtime ||
                                                    (contentDetail.episode_run_time &&
                                                        contentDetail
                                                            .episode_run_time[0])
                                            )}
                                        </span>
                                    </div>
                                ))
                        )}
                    </div>

                    {/* Genres */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {contentDetail.genres.map((genre) => (
                            <span
                                key={genre.id}
                                className="bg-white/10 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm border border-white/20"
                            >
                                {genre.name}
                            </span>
                        ))}
                    </div>

                    {/* Description */}
                    <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed max-w-3xl drop-shadow">
                        {showFullDescription
                            ? contentDetail.overview
                            : `${contentDetail.overview.slice(0, 200)}${
                                  contentDetail.overview.length > 200
                                      ? '...'
                                      : ''
                              }`}
                        {contentDetail.overview.length > 200 && (
                            <button
                                onClick={() =>
                                    setShowFullDescription(!showFullDescription)
                                }
                                className="text-white cursor-pointer hover:text-gray-300 ml-2 underline transition-colors"
                            >
                                {showFullDescription
                                    ? 'Show Less'
                                    : 'Read More'}
                            </button>
                        )}
                    </p>

                    {/*  Buttons */}
                    <div className="flex flex-wrap gap-4 mb-4">
                        <PlayerBtn onClick={() => setShowPlayer(true)} />

                        <AddBtn id={contentDetail.id} type={type} />
                    </div>

                    {/* Created by */}
                    <div className="text-gray-300">
                        <span className="text-gray-400">
                            {contentDetail.type === 'tv'
                                ? 'Created by: '
                                : 'Produced by: '}
                        </span>
                        {contentDetail.created_by?.map((c) => c.name) ||
                            contentDetail.production_companies
                                ?.slice(0, 3)
                                .map((c) => c.name)}
                    </div>
                </div>
            </div>

            {/* Content Sections */}
            <div className="relative z-20 bg-black -mt-20 pt-20">
                <div className="px-6 md:px-16 pb-20">
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Cast */}
                        {cast.length > 0 && (
                            <div>
                                <h3 className="text-2xl font-bold mb-6">
                                    Cast
                                </h3>
                                <div className="space-y-4">
                                    {cast.map((actor) => (
                                        <div
                                            key={actor.id}
                                            className="flex items-center gap-4 p-4 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
                                        >
                                            <img
                                                src={
                                                    actor.profile_path
                                                        ? `https://image.tmdb.org/t/p/original${actor.profile_path}`
                                                        : "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23666'/%3E%3Ctext x='50' y='55' font-family='Arial' font-size='12' fill='white' text-anchor='middle'%3ENo Image%3C/text%3E%3C/svg%3E"
                                                }
                                                alt={actor.name}
                                                className="w-16 h-16 rounded-full object-cover"
                                            />
                                            <div>
                                                <h4 className="font-semibold text-lg">
                                                    {actor.name}
                                                </h4>
                                                <p className="text-gray-400">
                                                    {actor.character}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Details */}
                        <div>
                            <h3 className="text-2xl font-bold mb-6">Details</h3>
                            <div className="space-y-4">
                                <div className="bg-gray-900 p-4 rounded-lg">
                                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                                        <FaCalendarAlt className="w-4 h-4 text-gray-400" />
                                        Release Year
                                    </h4>
                                    <p className="text-gray-300">
                                        {new Date(
                                            contentDetail.release_date ||
                                                contentDetail.first_air_date
                                        ).getFullYear()}
                                    </p>
                                </div>

                                <div className="bg-gray-900 p-4 rounded-lg">
                                    <h4 className="font-semibold mb-2">
                                        Rating
                                    </h4>
                                    <p className="text-gray-300">
                                        {contentDetail.adult ? 'R' : 'PG-13'}
                                    </p>
                                </div>
                                <div className="bg-gray-900 p-4 rounded-lg">
                                    <h4 className="font-semibold mb-2">
                                        Genres
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {contentDetail.genres.map((g) => (
                                            <span
                                                key={g.id}
                                                className="bg-gray-700 px-2 py-1 rounded text-sm"
                                            >
                                                {g.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                {contentDetail.type === 'tv' ? (
                                    <div className="bg-gray-900 p-4 rounded-lg">
                                        <h4 className="font-semibold mb-2">
                                            Series Info
                                        </h4>
                                        <div className="text-gray-300 space-y-1">
                                            {contentDetail.number_of_seasons && (
                                                <p>
                                                    {
                                                        contentDetail.number_of_seasons
                                                    }{' '}
                                                    Season
                                                    {contentDetail.number_of_seasons >
                                                    1
                                                        ? 's'
                                                        : ''}
                                                </p>
                                            )}
                                            {contentDetail.number_of_episodes && (
                                                <p>
                                                    {
                                                        contentDetail.number_of_episodes
                                                    }{' '}
                                                    Episodes
                                                </p>
                                            )}
                                            {contentDetail.runtime && (
                                                <p>
                                                    ~
                                                    {formatRuntime(
                                                        contentDetail.runtime
                                                    )}{' '}
                                                    per episode
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    contentDetail.runtime ||
                                    (contentDetail.episode_run_time &&
                                        contentDetail.episode_run_time[0] && (
                                            <div className="bg-gray-900 p-4 rounded-lg">
                                                <h4 className="font-semibold mb-2 flex items-center gap-2">
                                                    <FaClock className="w-4 h-4 text-gray-400" />
                                                    Runtime
                                                </h4>
                                                <p className="text-gray-300">
                                                    {formatRuntime(
                                                        contentDetail.runtime
                                                    )}
                                                </p>
                                            </div>
                                        ))
                                )}

                                <div className="bg-gray-900 p-4 rounded-lg">
                                    <h4 className="font-semibold mb-2">
                                        {contentDetail.type === 'tv'
                                            ? 'Created by'
                                            : 'Produced by'}
                                    </h4>
                                    <p className="text-gray-300">
                                        {contentDetail.created_by?.map(
                                            (c) => c.name
                                        ) ||
                                            contentDetail.production_companies
                                                ?.slice(0, 3)
                                                .map((c) => c.name)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <VideoPlayerModal
                isOpen={showPlayer}
                onClose={() => setShowPlayer(false)}
                id={contentDetail.id}
                type={type}
                season="1"
                episode="1"
                title={contentDetail.title || contentDetail.name}
            />
        </div>
    )
}

export default ContentDetail
