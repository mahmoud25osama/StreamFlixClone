import React from 'react'
import { useState } from 'react'
import { FaMailBulk, FaMapPin, FaPhone, FaRegPaperPlane } from 'react-icons/fa'
import { FaMessage } from 'react-icons/fa6'
import { toast } from 'sonner'

const Contact = () => {
    const [contactForm, setContactForm] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    })

    const handleInputChange = (e) => {
        setContactForm({
            ...contactForm,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = () => {
        setContactForm({ name: '', email: '', subject: '', message: '' })
        toast(
            <div className="flex items-center gap-3">
                <FaRegPaperPlane className="text-blue-500 w-6 h-6 mt-1" />
                <div>
                    <p className="font-semibold">Thanks {contactForm.name}!</p>
                    <p className="text-sm text-gray-700">
                        We've received your message. Our team will be in touch
                        with you shortly.
                    </p>
                </div>
            </div>,
            {
                duration: 5000,
            }
        )
    }
    return (
        <div className=" min-h-screen bg-black text-white">
            {/* Hero Section */}
            <div className="relative py-50 pb-40 bg-gradient-to-b from-red-900/20 to-black">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
                        Get in Touch
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 mb-8">
                        We'd love to hear from you. Send us a message and we'll
                        respond as soon as possible.
                    </p>
                </div>
            </div>

            <div className="py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16">
                        {/* Contact Form */}
                        <div className="bg-gray-900 p-8 pb-16 rounded-2xl border border-gray-800">
                            <h2 className="text-3xl font-bold text-white mb-8">
                                Send us a Message
                            </h2>
                            <div className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-gray-300 text-sm font-medium mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={contactForm.name}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:border-red-500 focus:outline-none text-white placeholder-gray-500"
                                            placeholder="Your name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-300 text-sm font-medium mb-2">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={contactForm.email}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:border-red-500 focus:outline-none text-white placeholder-gray-500"
                                            placeholder="your.email@example.com"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">
                                        Subject *
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={contactForm.subject}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:border-red-500 focus:outline-none text-white placeholder-gray-500"
                                        placeholder="What's this about?"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        name="message"
                                        value={contactForm.message}
                                        onChange={handleInputChange}
                                        required
                                        rows={6}
                                        className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:border-red-500 focus:outline-none text-white placeholder-gray-500 resize-none"
                                        placeholder="Tell us more about your inquiry..."
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                                >
                                    <FaMessage className="w-5 h-5" />
                                    <span>Send Message</span>
                                </button>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-3xl font-bold text-white mb-8">
                                    Contact Information
                                </h2>
                                <div className="space-y-6">
                                    <div className="flex items-start space-x-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                                            <FaMailBulk className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-white mb-1">
                                                Email
                                            </h3>
                                            <p className="text-gray-300">
                                                support@streamflix.com
                                            </p>
                                            <p className="text-gray-300">
                                                business@streamflix.com
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                                            <FaPhone className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-white mb-1">
                                                Phone
                                            </h3>
                                            <p className="text-gray-300">
                                                +1 (555) 123-4567
                                            </p>
                                            <p className="text-gray-400 text-sm">
                                                Mon-Fri, 9AM-6PM EST
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                                            <FaMapPin className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-white mb-1">
                                                Address
                                            </h3>
                                            <p className="text-gray-300">
                                                StreamFlix Headquarters
                                                <br />
                                                100 Netflix Way
                                                <br />
                                                Los Gatos, CA 95032
                                                <br />
                                                United States
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
                                <h3 className="text-xl font-bold text-white mb-4">
                                    Business Inquiries
                                </h3>
                                <p className="text-gray-300">
                                    Interested in partnerships, content
                                    licensing, or other business opportunities?
                                    Reach out to our business development team.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact
