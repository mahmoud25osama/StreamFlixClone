import { useState } from 'react'
import { FaSearch, FaCaretDown, FaBars, FaTimes } from 'react-icons/fa'
import { NavLink, useNavigate } from 'react-router'
import useAuth from '../../CustomHooks/useAuth'
import { useWindowScroll } from 'react-use'
import userLogo from '../../assets/profile_img.png'
import Logo from '../common/Logo'
const Navbar = () => {
    const [showSearch, setShowSearch] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [showProfileMenu, setShowProfileMenu] = useState(false)
    const [showMobileMenu, setShowMobileMenu] = useState(false)
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const { y } = useWindowScroll()
    const isScrolled = y > 0

    const handleSearch = (e) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            navigate('/search', { state: { searchQuery } })
            setShowSearch(false)
            setSearchQuery('')
        }
    }

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    const navLinks = [
        { to: '/browse', label: 'Home' },
        { to: '/tv-shows', label: 'TV Shows' },
        { to: '/movies', label: 'Movies' },
        { to: '/latest', label: 'New & Popular' },
        { to: '/myList', label: 'My List' },
    ]

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled
                    ? 'bg-black/95 backdrop-blur-sm'
                    : 'bg-gradient-to-b from-black/80 to-transparent'
            }`}
        >
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <Logo
                                variant={showMobileMenu ? 'compact' : 'main'}
                                width={showMobileMenu ? 120 : 200}
                                height={showMobileMenu ? 40 : 60}
                                className="transition-all duration-300"
                                onClick={() => navigate('/browse')}
                            />
                        </div>

                        {/* Desktop Navigation */}
                        {user && (
                            <div className="hidden lg:block ml-10">
                                <div className="flex items-baseline space-x-8">
                                    {navLinks.map((link) => (
                                        <NavLink
                                            key={link.to}
                                            to={link.to}
                                            className={({ isActive }) =>
                                                `text-sm font-medium transition-colors duration-200 hover:text-gray-300 ${
                                                    isActive
                                                        ? 'bg-red-600 text-white px-3 py-1 rounded'
                                                        : 'text-gray-300'
                                                }`
                                            }
                                        >
                                            {link.label}
                                        </NavLink>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right side controls */}
                    {user ? (
                        <div className="flex items-center space-x-1 lg:space-x-4">
                            {/* Search */}
                            <div className="relative">
                                {showSearch ? (
                                    <form
                                        onSubmit={handleSearch}
                                        className="flex items-center"
                                    >
                                        <div className="relative">
                                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                            <input
                                                type="text"
                                                value={searchQuery}
                                                onChange={(e) =>
                                                    setSearchQuery(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Titles, people, genres"
                                                className="bg-black/80 border border-white/20 rounded-sm pl-10 pr-4 py-2 w-64 text-white placeholder-gray-400 focus:outline-none focus:border-white/40"
                                                autoFocus
                                                onBlur={() =>
                                                    !searchQuery &&
                                                    setShowSearch(false)
                                                }
                                            />
                                        </div>
                                    </form>
                                ) : (
                                    <button
                                        onClick={() => setShowSearch(true)}
                                        className="text-white hover:text-gray-300 transition-colors p-2"
                                    >
                                        <FaSearch className="w-5 h-5" />
                                    </button>
                                )}
                            </div>

                            {/* Profile Dropdown */}
                            <div className="relative hidden lg:block">
                                <button
                                    onClick={() =>
                                        setShowProfileMenu(!showProfileMenu)
                                    }
                                    className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors p-2"
                                >
                                    <div className="cursor-pointer flex items-center justify-center">
                                        <img
                                            src={userLogo}
                                            className="lg:w-8 lg:h-8  w-6  h-6   rounded-sm"
                                            alt="userLogo"
                                        />
                                    </div>
                                    <FaCaretDown
                                        className={`w-4 h-4 hidden lg:block transition-transform ${
                                            showProfileMenu ? 'rotate-180' : ''
                                        }`}
                                    />
                                </button>

                                {showProfileMenu && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-40"
                                            onClick={() =>
                                                setShowProfileMenu(false)
                                            }
                                        />
                                        <div className="absolute right-0 mt-2 w-56 bg-black/95 backdrop-blur-sm border border-white/10 rounded-lg shadow-xl z-50">
                                            <div className="p-2">
                                                <NavLink
                                                    to="/contact"
                                                    className="block px-4 py-3 text-sm text-white hover:bg-white/10 rounded-lg transition-colors"
                                                    onClick={() =>
                                                        setShowProfileMenu(
                                                            false
                                                        )
                                                    }
                                                >
                                                    Contact Us
                                                </NavLink>
                                                <NavLink
                                                    to="/about"
                                                    className="block px-4 py-3 text-sm text-white hover:bg-white/10 rounded-lg transition-colors"
                                                    onClick={() =>
                                                        setShowProfileMenu(
                                                            false
                                                        )
                                                    }
                                                >
                                                    About Us
                                                </NavLink>
                                                <hr className="border-white/10 my-2" />
                                                <button
                                                    onClick={handleLogout}
                                                    className="block w-full text-left px-4 py-3 text-sm text-white hover:bg-white/10 rounded-lg transition-colors"
                                                >
                                                    Sign out of StreamFlix
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Mobile menu button */}
                            <button
                                onClick={() =>
                                    setShowMobileMenu(!showMobileMenu)
                                }
                                className="lg:hidden text-white hover:text-gray-300 transition-colors p-2"
                            >
                                {showMobileMenu ? (
                                    <FaTimes className="w-6 h-6" />
                                ) : (
                                    <FaBars className="w-6 h-6" />
                                )}
                            </button>
                        </div>
                    ) : (
                        <NavLink
                            to="/login"
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-semibold transition-colors"
                        >
                            Sign In
                        </NavLink>
                    )}
                </div>

                {/* Mobile Navigation */}
                {showMobileMenu && (
                    <div className="lg:hidden border-t border-white/10">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.to}
                                    to={link.to}
                                    className={({ isActive }) =>
                                        `block px-3 py-2 text-base font-medium rounded-lg transition-colors ${
                                            isActive
                                                ? 'bg-white/10 text-white'
                                                : 'text-gray-300 hover:bg-white/5 hover:text-white'
                                        }`
                                    }
                                    onClick={() => setShowMobileMenu(false)}
                                >
                                    {link.label}
                                </NavLink>
                            ))}
                            <div className="px-2">
                                <NavLink
                                    to="/contact"
                                    className="block  py-3 text-sm text-white hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    Contact Us
                                </NavLink>
                                <NavLink
                                    to="/about"
                                    className="block  py-3 text-sm text-white hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    About Us
                                </NavLink>
                                <hr className="border-white/10 my-2" />
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left  py-3 text-sm text-white hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    Sign out of StreamFlix
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar
