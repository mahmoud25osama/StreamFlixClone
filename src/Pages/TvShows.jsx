import { getTrendingTV, getTVByGenre } from '../services/tmdbService'
import TitleCards from '../Components/TitleCards'
import FeaturedShow from '../Components/FeaturedShow'

function TvShows() {
    return (
        <div className="min-h-screen bg-black text-white ">
            {/* Hero Section */}
            <FeaturedShow fetchFunction={getTrendingTV} type={'tv'} />
            <div className="px-6 md:px-16 mb-10">
                <h2 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
                    <span className="w-2 h-8 bg-red-600 rounded"></span>
                    TV Shows
                </h2>
            </div>
            {/* Rows of TV Shows */}
            <div className="px-6 md:px-16">
                <TitleCards
                    title="Trending TV"
                    fetchFunction={getTrendingTV}
                    type={'tv'}
                />
                <TitleCards
                    title="Action & Adventure"
                    fetchFunction={() => getTVByGenre(10759)}
                    type={'tv'}
                />
                <TitleCards
                    title="Drama"
                    fetchFunction={() => getTVByGenre(18)}
                    type={'tv'}
                />
                <TitleCards
                    title="Comedy"
                    fetchFunction={() => getTVByGenre(35)}
                    type={'tv'}
                />
                <TitleCards
                    title="Animation"
                    fetchFunction={() => getTVByGenre(16)}
                    type={'tv'}
                />
                <TitleCards
                    title="Sci-Fi & Fantasy"
                    fetchFunction={() => getTVByGenre(10765)}
                    type={'tv'}
                />
            </div>
        </div>
    )
}

export default TvShows
