'use client'
import { useState } from "react"

const events = [
{
    title: 'LA TEXANA',
    support: 'JUNTO A SAN CHARBEL',
    date: 'NOV 22 25',
    time: '20H00',
    flyer: 'img/flyer1.jpg',
    ticketUrl: '#',
},
{
    title: 'SVILD',
    support: 'SESIÓN DE DIBUJO',
    date: 'NOV 12 25',
    time: '19H00',
    flyer: 'img/flyer2.jpg',
    ticketUrl: '#',
},
{
    title: 'TEATRO MACABRO',
    support: '',
    date: 'NOV 15 25',
    time: '21H30',
    flyer: 'img/flyer3.jpg',
    ticketUrl: '#',
},
]


export default function CarruselCartelera() {

    const [current,setCurrent] = useState(0);
    const n = events.length;

    const front = events[current%n]
    const middle = events[(current+1)%n]
    const back = events[(current+2)%n]

    const next = () => setCurrent((current+1)%n)
    const prev = () => setCurrent((current-1+n)%n)

return (
    <section className="$[tay.className} min-h-screen bg-[#C9E5E8] flex flex-row">

        {/* Contenedor Flyers */}
        <div className="w-3/5 flex items-center justify-center">
            <div className="relative" style={{ width: 620, height: 774 }}>
                <div className="absolute inset-0" style={{ transform: 'rotate(-6deg)', transformOrigin: 'center', zIndex: 1, transition: 'transform 0.4s ease, opacity 0.4s ease'}}>
                    <img src={back.flyer} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="absolute inset-0" style={{ transform: 'rotate(6deg)', transformOrigin: 'center', zIndex: 2, transition: 'transform 0.4s ease, opacity 0.4s ease' }}>
                    <img src={middle.flyer} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="absolute inset-0" style={{ transform: 'rotate(0deg)', transformOrigin: 'center', zIndex: 3, transition: 'transform 0.4s ease, opacity 0.4s ease' }}>
                    <img src={front.flyer} alt="" className="w-full h-full object-cover" />
                </div>
            </div>
        </div>
        {/* Contenedor Info del Evento */}
        <div className="w-2/5 flex items-center justify-center flex-col">
            <h2 className="text-7xl">{front.title}</h2>
            <p className="text-4xl">{front.support}</p>
            <br />
            <p className="text-2xl text-[#C91E1F]">{front.date}</p>
            <p className="text-2xl text-[#C91E1F]">{front.time}</p>
            <br />
            <a className="bg-black text-white px-8 py-1 tracking-widest text-2xl" href={front.ticketUrl}>BOLETOS</a>
            
            {/* Controles Carrusel */}
            <div className="flex items-center gap-15 mt-50">
                <button onClick={prev}>
                    <img src="/icons/hero-carrusel-left-arrow.png" alt="anterior" />
                </button>
                {events.map((_, i) => (
                    <button key={i} onClick={() => setCurrent(i)}>
                        <img src={i === current ? '/icons/hero-carrusel-selected.png' : '/icons/hero-carrusel-unselected.png'} alt="" />
                    </button>
                ))}
                <button onClick={next}>
                    <img src="/icons/hero-carrusel-right-arrow.png" alt="siguiente" />
                </button>
            </div>
        </div>
        
        
    </section>
)}