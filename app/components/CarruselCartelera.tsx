'use client'
import { useState, useEffect } from "react"
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

    const [current, setCurrent] = useState(0);
    const n = events.length;

    const front = events[current % n]
    const middle = events[(current + 1) % n]
    const back = events[(current + 2) % n]

    const next = () => setCurrent((current + 1) % n)
    const prev = () => setCurrent((current - 1 + n) % n)

    const [rotations, setRotations] = useState<number[]>([])

    useEffect(() => {
        setRotations(events.map(() => +(Math.random() * 20 - 10).toFixed(2)))
    }, [events])

    return (
        <section className="$[tay.className} min-h-screen flex flex-row items-center">

            {/* Contenedor Flyers */}
            <div className="w-3/5 flex items-center justify-center">
                <div className="relative" style={{ width: 620, height: 774 }}>
                    <div className="absolute inset-0" style={{ transform: `rotate(${rotations[(current + 2) % n]}deg)`, transformOrigin: 'center', zIndex: 1, transition: 'transform 0.4s ease, opacity 0.4s ease' }}>
                        <img src={back.flyer} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute inset-0" style={{ transform: `rotate(${rotations[(current + 1) % n]}deg)`, transformOrigin: 'center', zIndex: 2, transition: 'transform 0.4s ease, opacity 0.4s ease' }}>
                        <img src={middle.flyer} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute inset-0" style={{ transform: `rotate(${rotations[(current) % n]}deg)`, transformOrigin: 'center', zIndex: 3, transition: 'transform 0.4s ease, opacity 0.4s ease' }}>
                        <img src={front.flyer} alt="" className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
                    </div>
                </div>
            </div>
            {/* Contenedor Info del Evento */}
            <div className="w-2/5 h-[70vh] flex items-center justify-between flex-col">
                <div className="flex flex-col justify-center items-center">
                    <h2 className="text-7xl text-center">{front.title}</h2>
                    <p className="text-4xl">{front.support || '\u00A0'}</p>
                    <br />
                    <p className="text-2xl text-[#C91E1F]">{front.date}</p>
                    <p className="text-2xl text-[#C91E1F]">{front.time}</p>
                    <br />
                    <Link className="bg-black text-white px-8 py-1 tracking-widest text-2xl" href={`/${front.slug}`}>BOLETOS</Link>
                </div>

                {/* Controles Carrusel */}
                <div className="flex items-center gap-15 mt-50">
                    <button onClick={prev} className="p-10 cursor-pointer">
                        <img src="/icons/hero-carrusel-left-arrow.png" alt="anterior" />
                    </button>
                    {events.map((_, i) => (
                        <button key={i} onClick={() => setCurrent(i)}>
                            <img src={i === current ? '/icons/hero-carrusel-selected.png' : '/icons/hero-carrusel-unselected.png'} alt="" />
                        </button>
                    ))}
                    <button onClick={next} className="p-10 cursor-pointer">
                        <img src="/icons/hero-carrusel-right-arrow.png" alt="siguiente" />
                    </button>
                </div>
            </div>


        </section>
    )
}