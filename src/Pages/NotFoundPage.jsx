import { FaHome, FaSearch, FaArrowLeft } from 'react-icons/fa'
import { NavLink } from 'react-router'

const NotFoundPage = () => {
    const suggestions = [
        { title: 'Stranger Things', path: '/browse', type: 'series' },
        { title: 'The Crown', path: '/browse', type: 'series' },
        { title: 'Glass Onion', path: '/movies', type: 'movie' },
        { title: 'Wednesday', path: '/tv-shows', type: 'series' },
    ]

    return (
        <div className="min-h-screen bg-black text-white">
            <div className="flex flex-col items-center justify-center px-6 py-20">
                <div className="max-w-2xl text-center">
                    <div className="mb-8">
                        <div className="relative">
                            <div className="text-8xl md:text-9xl font-bold text-red-600/60 select-none">
                                404
                            </div>
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        Lost your way?
                    </h1>

                    <p className="text-lg md:text-xl text-gray-400 mb-8 leading-relaxed">
                        Sorry, we can't find that page. You'll find lots to
                        explore on the home page.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                        <NavLink
                            to="/browse"
                            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded font-bold transition-colors flex items-center justify-center gap-2"
                        >
                            <FaHome className="w-4 h-4" />
                            StreamFlix Home
                        </NavLink>

                        <NavLink
                            to="/search"
                            className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded font-bold transition-colors border border-gray-600 hover:border-gray-500 flex items-center justify-center gap-2"
                        >
                            <FaSearch className="w-4 h-4" />
                            Search StreamFlix
                        </NavLink>
                    </div>

                    <div className="text-left">
                        <h3 className="text-xl font-bold mb-4 text-center">
                            Or try one of these popular titles:
                        </h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {suggestions.map((item, index) => (
                                <NavLink
                                    key={index}
                                    to={item.path}
                                    className="bg-gray-900 hover:bg-gray-800 p-4 rounded-lg transition-colors border border-gray-700 hover:border-gray-600 group"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-semibold text-white group-hover:text-gray-200">
                                                {item.title}
                                            </h4>
                                            <p className="text-gray-400 text-sm capitalize">
                                                {item.type}
                                            </p>
                                        </div>
                                        <FaArrowLeft className="rotate-180 text-gray-500 group-hover:text-white transition-colors" />
                                    </div>
                                </NavLink>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFoundPage
