import { useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'

const FAQ_DATA = [
    {
        question: 'What is StreamFlix ?',
        answer: "StreamFlix  is a streaming service that offers a wide variety of award-winning TV shows, movies and documentaries on thousands of internet-connected devices. You can watch as much as you want, whenever you want – all for one low monthly price. There's always something new to discover and new TV shows and movies are added every week!",
    },
    {
        question: 'How much does StreamFlix  cost?',
        answer: 'Watch StreamFlix  on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from $3.99 to $13.99 a month. No extra costs, no contracts.',
    },
    {
        question: 'Where can I watch?',
        answer: 'Watch anywhere, anytime. Sign in with your StreamFlix  account to watch instantly on the web at StreamFlix .com from your personal computer or on any internet-connected device that offers the StreamFlix  app, including smart TVs, smartphones, tablets, streaming media players and game consoles.',
    },
    {
        question: 'How do I cancel?',
        answer: 'StreamFlix  is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime.',
    },
    {
        question: 'What can I watch on StreamFlix ?',
        answer: 'StreamFlix  has an extensive library of feature films, documentaries, TV shows, anime, award-winning StreamFlix  originals, and more. Watch as much as you want, anytime you want.',
    },
    {
        question: 'Is StreamFlix  good for kids?',
        answer: 'The StreamFlix  Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and movies in their own space. Kids profiles come with PIN-protected parental controls.',
    },
]
function FaqDataSection() {
    const [openFaq, setOpenFaq] = useState(null)

    return (
        <>
            <section className="py-32 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/30 to-transparent"></div>

                <div className="max-w-5xl mx-auto px-6 md:px-16 relative z-10">
                    <h2 className="text-4xl lg:text-6xl font-bold text-white text-center mb-20">
                        <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            Frequently Asked Questions
                        </span>
                    </h2>

                    <div className="space-y-6">
                        {FAQ_DATA.map((faq, index) => (
                            <div
                                key={index}
                                className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl rounded-2xl overflow-hidden border border-gray-700/50 hover:border-gray-600 transition-all duration-300"
                            >
                                <button
                                    onClick={() =>
                                        setOpenFaq(
                                            openFaq === index ? null : index
                                        )
                                    }
                                    className="w-full p-8 text-left flex justify-between items-center hover:bg-white/5 transition-colors group"
                                >
                                    <span className="text-xl lg:text-2xl font-medium text-white pr-4 group-hover:text-red-400 transition-colors">
                                        {faq.question}
                                    </span>
                                    <div
                                        className={`p-2 rounded-full bg-gradient-to-r from-red-600 to-pink-600 transition-transform duration-300 ${
                                            openFaq === index
                                                ? 'rotate-180'
                                                : ''
                                        }`}
                                    >
                                        <FaChevronDown className="text-white w-4 h-4" />
                                    </div>
                                </button>

                                {openFaq === index && (
                                    <div className="px-8 pb-8 animate-fadeIn">
                                        <div className="border-t border-gray-600/50 pt-8">
                                            <p className="text-lg text-gray-300 leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default FaqDataSection
