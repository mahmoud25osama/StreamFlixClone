import Logo from '@/Components/common/Logo'
import { useState } from 'react'
import { FaPlay, FaCheck, FaStar, FaHeart } from 'react-icons/fa'
import bgHero from '../assets/bgBanner.jpg'
import { useNavigate } from 'react-router'
import FaqDataSection from '@/Components/common/FaqDataSection'
const FEATURES = [
    {
        id: 1,
        title: 'Enjoy on your TV',
        description:
            'Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.',
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Cdefs%3E%3ClinearGradient id='tvGrad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23e50914'/%3E%3Cstop offset='100%25' style='stop-color:%23b20710'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='300' fill='%23000'/%3E%3Crect x='50' y='50' width='300' height='180' fill='url(%23tvGrad)' rx='15'/%3E%3Crect x='65' y='65' width='270' height='130' fill='%23111'/%3E%3Ctext x='200' y='135' font-family='Arial' font-size='24' fill='%23e50914' text-anchor='middle' font-weight='bold'%3EStreamFlix %3C/text%3E%3Crect x='185' y='235' width='30' height='8' fill='%23666'/%3E%3Crect x='170' y='243' width='60' height='15' fill='%23888' rx='8'/%3E%3C/svg%3E",
        reverse: false,
        color: 'from-red-600 to-pink-600',
    },
    {
        id: 2,
        title: 'Download your shows to watch offline',
        description:
            'Save your favorites easily and always have something to watch.',
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Cdefs%3E%3ClinearGradient id='phoneGrad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%2300d4ff'/%3E%3Cstop offset='100%25' style='stop-color:%230099cc'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='300' fill='%23000'/%3E%3Crect x='150' y='40' width='100' height='180' fill='url(%23phoneGrad)' rx='15'/%3E%3Crect x='160' y='55' width='80' height='130' fill='%23111'/%3E%3Ccircle cx='200' cy='120' r='20' fill='%23e50914'/%3E%3Cpolygon points='190,110 210,120 190,130' fill='white'/%3E%3Ctext x='200' y='250' font-family='Arial' font-size='14' fill='%2300d4ff' text-anchor='middle' font-weight='bold'%3EDownloading...%3C/text%3E%3C/svg%3E",
        reverse: true,
        color: 'from-blue-500 to-cyan-500',
    },
    {
        id: 3,
        title: 'Watch everywhere',
        description:
            'Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.',
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Cdefs%3E%3ClinearGradient id='devicesGrad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23ff6b35'/%3E%3Cstop offset='100%25' style='stop-color:%23f7931e'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='300' fill='%23000'/%3E%3Crect x='50' y='80' width='120' height='80' fill='url(%23devicesGrad)' rx='8'/%3E%3Crect x='60' y='90' width='100' height='50' fill='%23111'/%3E%3Crect x='200' y='100' width='60' height='100' fill='url(%23devicesGrad)' rx='8'/%3E%3Crect x='210' y='120' width='40' height='60' fill='%23111'/%3E%3Crect x='300' y='60' width='80' height='50' fill='url(%23devicesGrad)' rx='5'/%3E%3Crect x='310' y='70' width='60' height='25' fill='%23111'/%3E%3Ctext x='200' y='250' font-family='Arial' font-size='16' fill='%23ff6b35' text-anchor='middle' font-weight='bold'%3EMultiple Devices%3C/text%3E%3C/svg%3E",
        reverse: false,
        color: 'from-orange-500 to-yellow-500',
    },
    {
        id: 4,
        title: 'Create profiles for kids',
        description:
            'Send kids on adventures with their favorite characters in a space made just for them—free with your membership.',
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Cdefs%3E%3ClinearGradient id='kidGrad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23ff6b9d'/%3E%3Cstop offset='100%25' style='stop-color:%23c44569'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='300' fill='%23000'/%3E%3Ccircle cx='200' cy='120' r='50' fill='url(%23kidGrad)'/%3E%3Ccircle cx='180' cy='105' r='6' fill='white'/%3E%3Ccircle cx='220' cy='105' r='6' fill='white'/%3E%3Cpath d='M 185 130 Q 200 140 215 130' stroke='white' stroke-width='3' fill='none'/%3E%3Ctext x='200' y='220' font-family='Arial' font-size='18' fill='%23ff6b9d' text-anchor='middle' font-weight='bold'%3EKids Profile%3C/text%3E%3Ctext x='200' y='240' font-family='Arial' font-size='12' fill='white' text-anchor='middle'%3ESafe Content%3C/text%3E%3C/svg%3E",
        reverse: true,
        color: 'from-pink-500 to-purple-500',
    },
]

const PLANS = [
    {
        id: 'mobile',
        name: 'Mobile',
        price: '$3.99',
        features: ['480p Quality', '1 Screen', 'Phone + Tablet'],
        popular: false,
        color: 'from-blue-600 to-blue-700',
    },
    {
        id: 'basic',
        name: 'Basic',
        price: '$6.99',
        features: ['720p Quality', '1 Screen', 'Phone, Tablet, Computer, TV'],
        popular: false,
        color: 'from-green-600 to-green-700',
    },
    {
        id: 'standard',
        name: 'Standard',
        price: '$10.99',
        features: ['1080p Quality', '2 Screens', 'Phone, Tablet, Computer, TV'],
        popular: true,
        color: 'from-red-600 to-red-700',
    },
    {
        id: 'premium',
        name: 'Premium',
        price: '$13.99',
        features: [
            '4K + HDR Quality',
            '4 Screens',
            'Phone, Tablet, Computer, TV',
        ],
        popular: false,
        color: 'from-purple-600 to-purple-700',
    },
]

const LandingPage = () => {
    const [email, setEmail] = useState('')
    const [selectedPlan, setSelectedPlan] = useState('standard')

    const navigate = useNavigate()
    const handleGetStarted = () => {
        if (email) {
            navigate('/register', { state: { email } })
        }
    }

    return (
        <div className="min-h-screen bg-black text-white overflow-x-hidden">
            {/* Hero Section  */}
            <section className="relative min-h-screen flex items-center justify-center">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img
                        src={bgHero}
                        alt="StreamFlix Background"
                        className="w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-red-900/10 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-2 leading-tight">
                        <span className="bg-gradient-to-r from-white via-red-200 to-red-400 bg-clip-text text-transparent">
                            Unlimited Movies
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                            TV Shows & More
                        </span>
                    </h1>

                    <p className="text-xl md:text-3xl mb-4 text-gray-200 font-light">
                        Watch anywhere. Cancel anytime.
                    </p>

                    <p className="text-lg md:text-xl mb-8 text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Ready to watch? Enter your email to create or restart
                        your membership.
                    </p>

                    {/*  Email Signup */}
                    <div className="flex flex-col sm:flex-row gap-4 max-w-3xl mx-auto mb-8">
                        <div className="flex-1 relative">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email address"
                                className="w-full px-6 py-5 text-lg bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-4 focus:ring-red-600/50 focus:border-red-500 transition-all duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-pink-600/10 rounded-xl -z-10 blur-xl"></div>
                        </div>
                        <button
                            onClick={handleGetStarted}
                            className="cursor-pointer bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-10 py-5 text-xl font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-2xl shadow-red-600/30 hover:shadow-red-600/50 hover:scale-105 transform"
                        >
                            Get Started
                            <FaPlay className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Animated Scroll Indicator */}
                <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2">
                    <div className="animate-bounce">
                        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/*  Features Sections */}
            {FEATURES.map((feature) => (
                <section
                    key={feature.id}
                    className="py-32 border-b border-gray-800/50 relative overflow-hidden"
                >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                        <div
                            className="absolute inset-0"
                            style={{
                                backgroundImage: `radial-gradient(circle at 50% 50%, ${
                                    feature.color.split(' ')[1]
                                }, transparent 70%)`,
                            }}
                        ></div>
                    </div>

                    <div className="max-w-7xl mx-auto px-6 md:px-16 relative z-10">
                        <div
                            className={`flex flex-col lg:flex-row items-center gap-16 ${
                                feature.reverse ? 'lg:flex-row-reverse' : ''
                            }`}
                        >
                            <div className="flex-1 text-center lg:text-left space-y-6">
                                <h2
                                    className={`text-4xl lg:text-6xl font-bold bg-gradient-to-r ${feature.color} bg-clip-text text-transparent mb-6`}
                                >
                                    {feature.title}
                                </h2>
                                <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed">
                                    {feature.description}
                                </p>
                                <div className="flex items-center gap-4 justify-center lg:justify-start">
                                    <div className="flex text-yellow-400">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar
                                                key={i}
                                                className="w-5 h-5"
                                            />
                                        ))}
                                    </div>
                                    <span className="text-gray-400">
                                        User Rating
                                    </span>
                                </div>
                            </div>
                            <div className="flex-1 relative group">
                                <div
                                    className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-3xl blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-300`}
                                ></div>
                                <img
                                    src={feature.image}
                                    alt={feature.title}
                                    className="relative w-full max-w-lg mx-auto rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        </div>
                    </div>
                </section>
            ))}

            {/*  Pricing Section */}
            <section className="py-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-black to-gray-900/50"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-transparent to-transparent"></div>

                <div className="max-w-7xl mx-auto px-6 md:px-16 relative z-10">
                    <div className="text-center mb-20">
                        <div className="inline-block mb-6">
                            <span className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-6 py-3 rounded-full text-lg font-semibold">
                                Choose Your Plan
                            </span>
                        </div>
                        <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
                            Choose the plan that's right for you
                        </h2>
                        <p className="text-xl lg:text-2xl text-gray-300">
                            Downgrade or upgrade at any time
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {PLANS.map((plan) => (
                            <div
                                key={plan.id}
                                className={`relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border-2 transition-all duration-500 hover:scale-105 cursor-pointer group ${
                                    plan.popular
                                        ? 'border-red-500 shadow-2xl shadow-red-500/30 transform scale-105'
                                        : selectedPlan === plan.id
                                        ? 'border-white shadow-xl shadow-white/20'
                                        : 'border-gray-600 hover:border-gray-400'
                                }`}
                                onClick={() => setSelectedPlan(plan.id)}
                            >
                                {/* Glowing effect */}
                                <div
                                    className={`absolute inset-0 bg-gradient-to-r ${plan.color} rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl`}
                                ></div>

                                {plan.popular && (
                                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                                        <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white text-sm px-6 py-3 rounded-full font-bold flex items-center gap-2 shadow-lg">
                                            <FaStar className="w-4 h-4" />
                                            Most Popular
                                        </div>
                                    </div>
                                )}

                                <div className="text-center mb-8 relative z-10">
                                    <h3 className="text-2xl font-bold text-white mb-4">
                                        {plan.name}
                                    </h3>
                                    <div
                                        className={`text-4xl font-bold bg-gradient-to-r ${plan.color} bg-clip-text text-transparent mb-2`}
                                    >
                                        {plan.price}
                                    </div>
                                    <div className="text-gray-400 text-sm">
                                        /month
                                    </div>
                                </div>

                                <div className="space-y-4 mb-8 relative z-10">
                                    {plan.features.map((feature, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center text-gray-300 group/item hover:text-white transition-colors"
                                        >
                                            <div
                                                className={`p-1 rounded-full bg-gradient-to-r ${plan.color} mr-3`}
                                            >
                                                <FaCheck className="text-white w-3 h-3" />
                                            </div>
                                            {feature}
                                        </div>
                                    ))}
                                </div>

                                <button
                                    className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 relative z-10 ${
                                        plan.popular || selectedPlan === plan.id
                                            ? `bg-gradient-to-r ${plan.color} hover:shadow-lg text-white transform hover:scale-105`
                                            : 'bg-gray-700 hover:bg-gray-600 text-white hover:scale-105'
                                    }`}
                                >
                                    Choose Plan
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/*  FAQ Section */}
            <FaqDataSection />
            <div className="max-w-5xl mx-auto px-6 md:px-16 relative z-10">
                {/*  CTA after FAQ */}
                <div className="text-center mt-20">
                    <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-xl rounded-3xl p-12 border border-gray-700/50">
                        <div className="mb-8">
                            <FaHeart className="w-12 h-12 text-red-500 mx-auto mb-4" />
                            <h3 className="text-3xl font-bold text-white mb-4">
                                Ready to Join Millions of Subscribers?
                            </h3>
                            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                                Enter your email to create or restart your
                                membership and enjoy the best content.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 max-w-3xl mx-auto">
                            <div className="flex-1 relative">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email address"
                                    className="w-full px-6 py-5 text-lg bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-4 focus:ring-red-600/50 focus:border-red-500 transition-all duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-pink-600/10 rounded-xl -z-10 blur-xl"></div>
                            </div>
                            <button
                                onClick={handleGetStarted}
                                className="cursor-pointer bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-10 py-5 text-xl font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-2xl shadow-red-600/30 hover:shadow-red-600/50 hover:scale-105 transform"
                            >
                                Get Started
                                <FaPlay className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Landing Footer */}
            <footer className="py-16 bg-gradient-to-t from-gray-900 to-transparent border-t border-gray-800/50">
                <div className="max-w-7xl mx-auto px-6 md:px-16">
                    <div className="text-center">
                        <h3 className=" flex justify-center  font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-6">
                            <Logo variant="dark" width={350} height={155} />
                        </h3>
                        <p className="text-gray-400 mb-8">
                            The world's leading streaming entertainment service
                        </p>
                        <div className="flex justify-center items-center gap-4 text-sm text-gray-500">
                            <span>© 2024 StreamFlix Clone</span>
                            <span>•</span>
                            <span>by Mahmoud Osama</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default LandingPage
