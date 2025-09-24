import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card.jsx'
import { useMyList } from '@/CustomHooks/useMyList.jsx'
import { FaPlay, FaPlus, FaStar } from 'react-icons/fa'
import { useNavigate } from 'react-router'

const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original'
const Genres = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Science Fiction',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western',
    10759: 'Action & Adventure',
    10762: 'Kids',
    10763: 'News',
    10764: 'Reality',
    10765: 'Sci-Fi & Fantasy',
    10766: 'Soap',
    10767: 'Talk',
    10768: 'War & Politics',
}

export function CardUi({ item, type = 'movie' }) {
    const navigate = useNavigate()
    const { addToList } = useMyList()

    return (
        <Card
            className="relative cursor-pointer border-0 overflow-hidden group/item transition-all duration-300 w-full aspect-[2/3] max-w-[250px]"
            onClick={() =>
                navigate(
                    `/contentDetail/${item.id}?type=${
                        item.media_type || 'movie'
                    }`
                )
            }
        >
            {/* Poster */}
            <div className="absolute inset-0 rounded-lg overflow-hidden bg-gray-800">
                <img
                    src={`${TMDB_IMAGE_BASE_URL}${item.poster_path}`}
                    alt={item.title || item.name}
                    className="w-full h-full object-cover object-center transition-all duration-300 group-hover/item:scale-105"
                />
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 hidden group-hover/item:flex flex-col justify-between bg-gradient-to-t from-black/90 via-black/20 to-transparent p-3 transition-all duration-300">
                {/* Top buttons */}
                <div className="flex items-center gap-2 self-end ">
                    <button className="bg-white text-black p-2 rounded-full hover:bg-gray-200 transition-colors">
                        <FaPlay className="w-3 h-3 cursor-pointer" />
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            addToList(item.title || item.name, item.id, type)
                        }}
                        className="bg-gray-800/80 text-white cursor-pointer p-2 rounded-full border border-white/30 hover:border-white transition-colors"
                    >
                        <FaPlus className="w-3 h-3" />
                    </button>
                </div>

                {/* Item Info - Fixed at bottom */}
                <div className="flex flex-col gap-2">
                    <CardHeader className="p-0">
                        <CardTitle className="text-white text-sm font-bold line-clamp-2 leading-tight">
                            {item.title || item.name}
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="p-0 text-xs text-gray-300 space-y-1">
                        {/* Rating and Year */}
                        <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1">
                                <FaStar className="text-yellow-500 w-3 h-3" />
                                {item.vote_average?.toFixed(1) || 'N/A'}
                            </span>
                            {item.release_date && (
                                <span>
                                    {new Date(item.release_date).getFullYear()}
                                </span>
                            )}
                            {item.first_air_date && (
                                <span>
                                    {new Date(
                                        item.first_air_date
                                    ).getFullYear()}
                                </span>
                            )}
                        </div>

                        {/* Genres */}
                        {item.genre_ids && item.genre_ids.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                                {item.genre_ids.slice(0, 2).map((g, idx) => (
                                    <span
                                        key={idx}
                                        className="bg-gray-700/80 px-2 py-1 rounded text-xs truncate"
                                    >
                                        {Genres[g] || 'Unknown'}
                                    </span>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </div>
            </div>
        </Card>
    )
}

export default CardUi
