import {
    getPopularMovies,
    getTrendingMovies,
    getTopRated,
    getMovieByGenre,
} from '../services/tmdbService'
import TitleCards from '../Components/TitleCards'
import FeaturedShow from '../Components/FeaturedShow'

function Movies() {
    return (
        <div className="min-h-screen bg-black text-white ">
            {/* Hero Section */}
            <FeaturedShow fetchFunction={getPopularMovies} />

            <div className="px-6 md:px-16 mb-10">
                <h2 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
                    <span className="w-2 h-8 bg-red-600 rounded"></span>
                    Movies
                </h2>
            </div>

            {/* Rows of Movies */}
            <div className="px-6 md:px-16">
                <TitleCards
                    title="Trending This Week"
                    fetchFunction={getTrendingMovies}
                />
                <TitleCards
                    title="Popular Movies"
                    fetchFunction={getPopularMovies}
                />
                <TitleCards title="Top Rated" fetchFunction={getTopRated} />
                <TitleCards
                    title="Action Movies"
                    fetchFunction={() => getMovieByGenre(28)}
                />
                <TitleCards
                    title="Adventure"
                    fetchFunction={() => getMovieByGenre(12)}
                />
                <TitleCards
                    title="Comedy"
                    fetchFunction={() => getMovieByGenre(35)}
                />
                <TitleCards
                    title="Family"
                    fetchFunction={() => getMovieByGenre(99)}
                />
            </div>
        </div>
    )
}

export default Movies
