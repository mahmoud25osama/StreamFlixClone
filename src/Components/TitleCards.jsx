import { useEffect, useState } from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/Components/ui/carousel.jsx'
import CardUi from '@/Components/common/Card.jsx'

const TitleCards = ({ title, fetchFunction, type = 'movie' }) => {
    const [cards, setCards] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchFunction()
                setCards(data.results || [])
            } catch (err) {
                console.error('Error fetching TMDB data:', err)
            }
        }
        if (fetchFunction) fetchData()
    }, [fetchFunction])

    return (
        <div className="mb-12">
            {title && (
                <h2 className="text-white text-2xl md:text-3xl font-bold mb-8 flex items-center gap-3">
                    <span className="w-1 h-8 bg-red-600 rounded"></span>
                    {title}
                </h2>
            )}

            <Carousel opts={{ align: 'start' }} className="w-full group">
                <CarouselContent>
                    {cards.map((item) => (
                        <CarouselItem
                            key={item.id}
                            className="basis-1/2 md:basis-1/3 lg:basis-1/5 px-2 "
                        >
                            <CardUi item={item} type={type} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <div className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />
                <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />
                <CarouselPrevious className="group-hover:flex hidden absolute top-1/2 -translate-y-1/2 -left-4 bg-black/50 hover:bg-black text-white rounded-full p-3 cursor-pointer z-20" />
                <CarouselNext className="group-hover:flex hidden absolute top-1/2 -translate-y-1/2 -right-4 bg-black/50 hover:bg-black text-white rounded-full p-3 cursor-pointer z-20" />
            </Carousel>
        </div>
    )
}

export default TitleCards
