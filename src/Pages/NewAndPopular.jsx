import {
    getUpcomingMovies,
    getTopRated,
    getTrending,
} from '@/services/tmdbService'
import TitleCards from '@/Components/TitleCards'
import FeaturedShow from '@/Components/FeaturedShow'

function NewAndPopular() {
    return (
        <div className="min-h-screen bg-black text-white ">
            {/* Hero Section */}
            <FeaturedShow fetchFunction={getTrending} />

            <div className="px-6 md:px-16 mb-10">
                <h2 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
                    <span className="w-2 h-8 bg-red-600 rounded"></span>
                    New & Popular
                </h2>
            </div>

            {/* Content Sections */}
            <div className="px-6 md:px-16">
                <TitleCards title="New Releases" fetchFunction={getTopRated} />
                <TitleCards title="Trending Now" fetchFunction={getTrending} />
                <TitleCards
                    title="Coming Soon"
                    fetchFunction={getUpcomingMovies}
                />
            </div>
        </div>
    )
}

export default NewAndPopular
