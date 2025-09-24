import { useState } from 'react'
import { FaSearch, FaTimes } from 'react-icons/fa'
import { searchTMDB } from '../services/tmdbService'
import { useEffect } from 'react'
import { useLocation } from 'react-router'
import CardUi from '@/Components/common/Card'

function SearchResults() {
    const [filteredResults, setFilteredResults] = useState([])
    const location = useLocation()
    const searchQ = location.state?.searchQuery || ''
    const [searchQuery, setSearchQuery] = useState(searchQ)

    useEffect(() => {
        if (searchQ) {
            setSearchQuery(searchQ)
            handleSearch(searchQ)
        }
    }, [searchQ])

    const handleSearch = async (query) => {
        setSearchQuery(query)
        if (query.trim() === '') {
            setFilteredResults([])
            return
        }

        try {
            const data = await searchTMDB(query)
            setFilteredResults(data.results)
        } catch (err) {
            console.error('Search error:', err)
            setFilteredResults([])
        }
    }

    return (
        <div className="min-h-screen bg-black text-white pt-20">
            {/* Search Header */}
            <div className="px-6 md:px-16 mb-8">
                <div className="max-w-4xl mx-auto">
                    {/* Search Bar */}
                    <div className="relative mb-6">
                        <div className="relative">
                            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => handleSearch(e.target.value)}
                                placeholder="Search for movies, TV shows, actors, directors..."
                                className="w-full pl-12 pr-12 py-4 bg-gray-900 text-white rounded-lg border border-gray-700 focus:border-white focus:outline-none focus:ring-1 focus:ring-white transition-all duration-200 text-lg"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => {
                                        setSearchQuery('')
                                        setFilteredResults([])
                                    }}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                >
                                    <FaTimes className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Search Results Header */}
                {searchQuery && (
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                        <div>
                            <h2 className="text-2xl font-bold mb-2">
                                Search results for "{searchQuery}"
                            </h2>
                            <p className="text-gray-400">
                                {filteredResults.length} result
                                {filteredResults.length !== 1 ? 's' : ''} found
                            </p>
                        </div>
                    </div>
                )}

                {/* Results  */}
                {filteredResults.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3  md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {filteredResults.map((item) => (
                            <CardUi item={item} type={item.media_type} />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-400 text-center">
                        No results found.
                    </p>
                )}
            </div>
        </div>
    )
}
export default SearchResults
