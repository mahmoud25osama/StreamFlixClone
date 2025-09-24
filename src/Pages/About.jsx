import FaqDataSection from '@/Components/common/FaqDataSection.jsx'

import { FaAward, FaFilm, FaGlobe, FaUsers } from 'react-icons/fa'

const About = () => {
    const stats = [
        { icon: FaUsers, number: '200M+', label: 'Global Subscribers' },
        { icon: FaFilm, number: '15,000+', label: 'Movies & Shows' },
        { icon: FaGlobe, number: '190+', label: 'Countries' },
        { icon: FaAward, number: '100+', label: 'Awards Won' },
    ]

    return (
        <div className="min-h-screen bg-black">
            {/* Page Content */}
            <div className="pt-16">
                <div className="min-h-screen bg-black text-white">
                    {/* Hero Section */}
                    <div className="relative h-screen flex items-center justify-center bg-gradient-to-b from-black/50 to-black">
                        <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 to-black/80"></div>
                        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
                            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                                StreamFlix
                            </h1>
                            <p className="text-2xl md:text-3xl mb-8 text-gray-300">
                                Redefining Entertainment for the Digital Age
                            </p>
                            <p className="text-lg md:text-xl text-gray-400 max-w-3xl">
                                We're passionate about bringing you the world's
                                best stories, from every corner of the globe,
                                delivered with cutting-edge technology and
                                unparalleled user experience.
                            </p>
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="py-20 bg-gray-900">
                        <div className="max-w-7xl mx-auto px-6">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                {stats.map((stat, index) => (
                                    <div
                                        key={index}
                                        className="text-center group"
                                    >
                                        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                                            <stat.icon className="w-8 h-8" />
                                        </div>
                                        <div className="text-3xl md:text-4xl font-bold text-red-500 mb-2">
                                            {stat.number}
                                        </div>
                                        <div className="text-gray-400 text-sm md:text-base">
                                            {stat.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Our Story Section */}
                    <div className="py-20 bg-black">
                        <div className="max-w-7xl mx-auto px-6">
                            <div className="grid md:grid-cols-2 gap-16 items-center">
                                <div>
                                    <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
                                        Our Story
                                    </h2>
                                    <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                                        <p>
                                            Founded in 2020, StreamFlix began
                                            with a simple mission: to
                                            democratize access to premium
                                            entertainment content worldwide.
                                            What started as a small team of
                                            passionate technologists has grown
                                            into a global platform serving
                                            millions.
                                        </p>
                                        <p>
                                            We believe that great stories have
                                            the power to connect people across
                                            cultures, languages, and borders.
                                            That's why we've invested heavily in
                                            original content from diverse
                                            creators and regions.
                                        </p>
                                        <p>
                                            Today, we're not just a streaming
                                            service—we're a cultural bridge,
                                            bringing together audiences and
                                            storytellers from around the world.
                                        </p>
                                    </div>
                                </div>
                                <div className="relative">
                                    <div className="aspect-video bg-gradient-to-br from-red-600 to-red-800 rounded-2xl flex items-center justify-center">
                                        <FaFilm className="w-24 h-24 text-white/50" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mission & Vision */}
                    <div className="py-20 bg-gray-900">
                        <div className="max-w-7xl mx-auto px-6">
                            <div className="text-center mb-16">
                                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                    Mission & Vision
                                </h2>
                            </div>
                            <div className="grid md:grid-cols-2 gap-12">
                                <div className="bg-black/50 p-8 rounded-2xl border border-gray-800 hover:border-red-600/50 transition-colors duration-300">
                                    <h3 className="text-2xl font-bold text-red-500 mb-4">
                                        Our Mission
                                    </h3>
                                    <p className="text-gray-300 text-lg leading-relaxed">
                                        To entertain the world by connecting
                                        people with stories they love, while
                                        empowering creators to bring their
                                        visions to life through innovative
                                        technology and global distribution.
                                    </p>
                                </div>
                                <div className="bg-black/50 p-8 rounded-2xl border border-gray-800 hover:border-red-600/50 transition-colors duration-300">
                                    <h3 className="text-2xl font-bold text-red-500 mb-4">
                                        Our Vision
                                    </h3>
                                    <p className="text-gray-300 text-lg leading-relaxed">
                                        To become the world's most beloved
                                        entertainment platform, where every
                                        story finds its audience and every
                                        viewer discovers their next favorite
                                        content, regardless of geography or
                                        language.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <FaqDataSection />
                </div>
            </div>
        </div>
    )
}

export default About
