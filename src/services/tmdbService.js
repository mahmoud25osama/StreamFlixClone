import { TMDB_API_KEY, TMDB_API_URL } from '../config'

const fetchFromTMDB = async (endpoint, params = {}) => {
    const url = new URL(`${TMDB_API_URL}${endpoint}`)
    url.searchParams.append('api_key', TMDB_API_KEY)
    Object.keys(params).forEach((key) =>
        url.searchParams.append(key, params[key])
    )

    const res = await fetch(url)
    if (!res.ok) throw new Error(`TMDB Error: ${res.statusText}`)
    return res.json()
}

// Movies
export const getPopularMovies = () => fetchFromTMDB('/movie/popular')
export const getUpcomingMovies = () => fetchFromTMDB('/movie/upcoming')
export const getTrendingMovies = () => fetchFromTMDB('/trending/movie/week')
export const getMovieByGenre = async (genreId) =>
    fetchFromTMDB('/discover/movie', { with_genres: genreId })

export const getTopRated = () => fetchFromTMDB('/movie/top_rated')
export const getTrending = () => fetchFromTMDB('/movie/now_playing')
// TV Shows
export const getTrendingTV = () => fetchFromTMDB('/trending/tv/week')
export const getTVByGenre = (genreId) =>
    fetchFromTMDB('/discover/tv', { with_genres: genreId })

// Search
export const searchTMDB = (query) => fetchFromTMDB('/search/multi', { query })

// Details
export const getMovieDetails = (id) => fetchFromTMDB(`/movie/${id}`)
export const getTvDetails = (id) => fetchFromTMDB(`/tv/${id}`)

// Credits (cast & crew)
export const getCredits = (id, type = 'movie') =>
    fetchFromTMDB(`/${type}/${id}/credits`)

//get youtube key
export const getTrailerKey = async (id, type = 'movie') => {
    try {
        const res = await fetch(
            `${TMDB_API_URL}/${type}/${id}/videos?api_key=${TMDB_API_KEY}&language=en-US`
        )

        if (!res.ok) throw new Error(`TMDB error: ${res.status}`)

        const data = await res.json()
        console.log('TMDB videos response:', data)

        if (!data.results || data.results.length === 0) return null

        const trailer = data.results.find(
            (vid) =>
                vid.type === 'Trailer' &&
                vid.site === 'YouTube' &&
                !vid.official
        )

        const key = trailer ? trailer.key : data.results[0].key

        return key
            ? `https://www.youtube.com/embed/${key}?autoplay=1&modestbranding=1&rel=0`
            : null
    } catch (err) {
        console.error('Failed to fetch trailer:', err)
        return null
    }
}

export default {
    getTrailerKey,
    getTvDetails,
    getCredits,
    getPopularMovies,
    getTrendingMovies,
    getMovieByGenre,
    getTrendingTV,
    getTVByGenre,
    searchTMDB,
    getMovieDetails,
    getTopRated,
    getTrending,
}
