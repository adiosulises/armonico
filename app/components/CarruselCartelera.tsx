'use client'
import { useState, useEffect, useRef } from "react"
import Link from "next/link"

type CarruselEvent = {
    slug: string,
    title: string,
    support: string,
    date: string,
    time: string,
    flyer: string
}

export default function CarruselCartelera({ events }: { events: CarruselEvent[] }) {
    const [current, setCurrent] = useState(0)
    const [rotations, setRotations] = useState<number[]>([])
    const [isMobile, setIsMobile] = useState(false)
    const touchStartX = useRef<number | null>(null)
    const touchStartY = useRef<number | null>(null)

    const n = events.length
    const front = events[current % n]
    const middle = events[(current + 1) % n]
    const back = events[(current + 2) % n]

    const next = () => setCurrent((current + 1) % n)
    const prev = () => setCurrent((current - 1 + n) % n)

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX
        touchStartY.current = e.touches[0].clientY
    }

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX.current === null || touchStartY.current === null) return
        const dx = e.changedTouches[0].clientX - touchStartX.current
        const dy = e.changedTouches[0].clientY - touchStartY.current
        // Only trigger if horizontal swipe is dominant and exceeds threshold
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
            dx < 0 ? next() : prev()
        }
        touchStartX.current = null
        touchStartY.current = null
    }

    useEffect(() => {
        setRotations(events.map(() => +(Math.random() * 20 - 10).toFixed(2)))
    }, [events])

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768)
        check()
        window.addEventListener('resize', check)
        return () => window.removeEventListener('resize', check)
    }, [])

    const flyerW = isMobile ? '80vw' : 'clamp(280px, 32vw, 620px)'
    const flyerH = isMobile ? '100vw' : 'clamp(350px, 40vw, 774px)'

    return (
        <section className="min-h-screen flex flex-col md:flex-row items-center justify-center md:justify-start py-8 md:py-0">

            {/* Flyers — swipeable area */}
            <div
                className="w-full md:w-3/5 flex items-center justify-center"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                <div className="relative" style={{ width: flyerW, height: flyerH }}>
                    <div className="absolute inset-0" style={{ transform: `rotate(${rotations[(current + 2) % n]}deg)`, transformOrigin: 'center', zIndex: 1, transition: 'transform 0.4s ease' }}>
                        <img src={back.flyer} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute inset-0" style={{ transform: `rotate(${rotations[(current + 1) % n]}deg)`, transformOrigin: 'center', zIndex: 2, transition: 'transform 0.4s ease' }}>
                        <img src={middle.flyer} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute inset-0" style={{ transform: `rotate(${rotations[current % n]}deg)`, transformOrigin: 'center', zIndex: 3, transition: 'transform 0.4s ease' }}>
                        <img src={front.flyer} alt="" className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
                    </div>
                </div>
            </div>

            {/* Info */}
            <div className="w-full md:w-2/5 flex items-center justify-between flex-col gap-6 md:gap-0 md:h-[70vh] px-4 md:px-0 mt-8 md:mt-0">
                <div className="flex flex-col justify-center items-center text-center">
                    <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 4.5rem)' }} className="text-center leading-tight">
                        {front.title}
                    </h2>
                    <p style={{ fontSize: 'clamp(1.2rem, 3vw, 2.25rem)' }}>
                        {front.support || '\u00A0'}
                    </p>
                    <br />
                    <p style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)' }} className="text-[#C91E1F]">{front.date}</p>
                    <p style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)' }} className="text-[#C91E1F]">{front.time}</p>
                    <br />
                    <Link
                        className="bg-black text-white px-8 py-1 tracking-widest"
                        style={{ fontSize: 'clamp(1rem, 1.8vw, 1.5rem)' }}
                        href={`/${front.slug}`}
                    >
                        BOLETOS
                    </Link>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-4 md:gap-8">
                    <button onClick={prev} className="p-3 md:p-6 cursor-pointer">
                        <img src="/icons/hero-carrusel-left-arrow.png" alt="anterior" />
                    </button>
                    {events.map((_, i) => (
                        <button key={i} onClick={() => setCurrent(i)}>
                            <img src={i === current ? '/icons/hero-carrusel-selected.png' : '/icons/hero-carrusel-unselected.png'} alt="" />
                        </button>
                    ))}
                    <button onClick={next} className="p-3 md:p-6 cursor-pointer">
                        <img src="/icons/hero-carrusel-right-arrow.png" alt="siguiente" />
                    </button>
                </div>
            </div>
        </section>
    )
}