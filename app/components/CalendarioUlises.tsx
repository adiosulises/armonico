'use client'
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import localFont from 'next/font/local'

const tay = localFont({ src: '../../public/fonts/TAYBigBird.otf' })

type CalendarioEvent = {
    date: string
    title: string
    month: string
    slug: string
}

const months = [
    'ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO',
    'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE',
]

const PAGE_SIZE = 9

export default function Calendario({ events = [] }: { events: CalendarioEvent[] }) {
    const currentMonthName = months[new Date().getMonth()]
    const defaultMonth = months.find(m => events.some(e => e.month === m) && m === currentMonthName)
        ?? months.find(m => events.some(e => e.month === m))
        ?? currentMonthName

    const [selectedMonth, setSelectedMonth] = useState(defaultMonth)
    const [page, setPage] = useState(0)
    const [isMobile, setIsMobile] = useState(false)
    const [rotations, setRotations] = useState<number[]>([])

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768)
        check()
        window.addEventListener('resize', check)
        return () => window.removeEventListener('resize', check)
    }, [])

    const visibleEvents = events.filter(e => e.month === selectedMonth)
    const totalPages = Math.ceil(visibleEvents.length / PAGE_SIZE)
    const pageEvents = visibleEvents.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE)

    useEffect(() => {
        setRotations(Array.from({ length: PAGE_SIZE }, () => +(Math.random() * 14 - 7).toFixed(2)))
    }, [selectedMonth, page])

    const rows = [
        ...pageEvents,
        ...Array(Math.max(0, PAGE_SIZE - pageEvents.length)).fill({ date: '', title: '', slug: '' })
    ]

    const currentYear = new Date().getFullYear()

    function handleMonthSelect(m: string) {
        setSelectedMonth(m)
        setPage(0)
    }

    return (
        <section
            className="relative overflow-hidden h-screen flex flex-col"
            style={{ fontFamily: 'var(--font-tecla)' }}
        >
            {/* Watermark */}
            <img src="/img/armonico-wm.png" alt="" aria-hidden
                className="absolute inset-0 m-auto pointer-events-none select-none"
                style={{ opacity: 0.06, transform: 'rotate(-15deg)' }}
            />

            {/* Month selector */}
            <div className="flex flex-col items-center gap-3 py-4 z-10 shrink-0">
                {isMobile ? (
                    <select
                        value={selectedMonth}
                        onChange={e => handleMonthSelect(e.target.value)}
                        className="text-base uppercase bg-transparent border-b border-black outline-none px-2 py-1"
                        style={{ fontFamily: 'var(--font-tecla)' }}
                    >
                        {months.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                ) : (
                    <>
                        <div className="flex gap-8 xl:gap-16">
                            {months.slice(0, 6).map(m => (
                                <button key={m} onClick={() => handleMonthSelect(m)}
                                    className={`text-sm xl:text-base tracking-wide ${m === selectedMonth ? 'text-[#C91E1F]' : 'text-black'}`}>
                                    {m}
                                </button>
                            ))}
                        </div>
                        <div className="flex gap-8 xl:gap-16">
                            {months.slice(6).map(m => (
                                <button key={m} onClick={() => handleMonthSelect(m)}
                                    className={`text-sm xl:text-base tracking-wide ${m === selectedMonth ? 'text-[#C91E1F]' : 'text-black'}`}>
                                    {m}
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Card */}
            <div className="flex-1 flex items-center justify-center z-10">
                <div
                    className="c-bg shadow-2xl flex flex-col uppercase"
                    style={{
                        fontFamily: 'var(--font-tecla)',
                        width: 'clamp(300px, 90vw, 548px)',
                        padding: 'clamp(12px, 2vw, 24px)',
                        transform: isMobile ? 'none' : 'rotate(-3deg)',
                        fontSize: 'clamp(13px, 1vw, 13px)',
                    }}
                >
                    {/* Header */}
                    <div className="flex justify-between items-start">
                        <p>CUU.</p>
                        <div className="text-center" style={{ fontSize: 'clamp(15px, 1.4vw, 18px)', lineHeight: 1.3 }}>
                            <h2>ARM&Oacute;NICO<br />AGENDA MENSUAL</h2>
                        </div>
                        <p>MÉX.</p>
                    </div>

                    <hr className="c-hr mb-0.5" />
                    <hr className="c-hr" />

                    {/* Month + year */}
                    <div className="flex justify-between pt-1 pb-1">
                        <p>MES: {selectedMonth}</p>
                        <p>{currentYear}</p>
                    </div>

                    {/* Rows */}
                    <div className="border-t border-[var(--c-hr-color,#a0a0a0)]">
                        {rows.map((event, i) => (
                            <div key={i} className="c-hr flex border-b" style={{ height: '4em' }}>
                                <div
                                    className="border-r c-hr flex items-center justify-center"
                                    style={{ width: '30%' }}
                                >
                                    <span
                                        className={`text-[#C91E1F] ${tay.className}`}
                                        style={{
                                            fontSize: '20px',
                                            display: 'inline-block',
                                            transform: rotations[i] !== undefined ? `rotate(${rotations[i]}deg)` : 'none'
                                        }}
                                    >
                                        {event.date}
                                    </span>
                                </div>
                                <div className="flex items-center px-2" style={{ width: '70%' }}>
                                    {event.slug ? (
                                        <Link
                                            href={`/${event.slug}`}
                                            className="uppercase hover:underline overflow-hidden leading-tight text-black"
                                            style={{
                                                fontFamily: 'var(--font-grotesk75)',
                                                fontSize: '20',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical'
                                            }}
                                        >
                                            {event.title}
                                        </Link>
                                    ) : (
                                        <span style={{ fontFamily: 'var(--font-grotesk75)', fontSize: 'clamp(14px, 1.4vw, 20px)' }} />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-between items-center pt-1 pb-1" style={{ fontSize: 'clamp(12px, 0.9vw, 12px)' }}>
                            <button onClick={() => setPage(p => p - 1)} disabled={page === 0} className="disabled:opacity-30">← ANTERIOR</button>
                            <span>{page + 1} / {totalPages}</span>
                            <button onClick={() => setPage(p => p + 1)} disabled={page === totalPages - 1} className="disabled:opacity-30">SIGUIENTE →</button>
                        </div>
                    )}

                    {/* Footer */}
                    <div className="pt-4 flex justify-between items-end" style={{ fontSize: 'clamp(11px, 0.8vw, 11px)', lineHeight: 1.4 }}>
                        <div>
                            <p>ARM&Oacute;NICO CENTRO CULTURAL</p>
                            <p>L-V: 18H00-20H00</p>
                            <p>S-D: 18H00-20H00</p>
                            <br />
                            <div className="flex gap-1">
                                <div><p>DELICIAS,</p><p>CENTRO,</p></div>
                                <div><p>CUU</p><p>03300</p></div>
                            </div>
                        </div>
                        <div>
                            <Image src={'/logo-black.png'} alt="logo" width={80} height={100} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}