'use client'
import Image from "next/image"
import { useState, useEffect } from "react"

const GMAPS = "https://maps.app.goo.gl/Lz49m2LSe4REeXh56"
const GEO = "geo:28.636213478486578, -106.06887468465658"

export default function ContactoComponent() {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent))
    }, [])

    return (
        <div className="flex items-center justify-center min-h-screen bg-white p-4">
            <div className="bg-[#ffffc3] shadow-xl flex flex-row items-center
                            w-full max-w-[420px] aspect-[1.75/1]
                            sm:max-w-2xl sm:aspect-auto sm:p-6
                            overflow-hidden px-3 py-2 sm:py-6">

                {/* Mascot */}
                <div className="flex-shrink-0">
                    <Image
                        src={'/mascot-black.png'}
                        height={406} width={261}
                        alt="personaje"
                        className="h-full w-auto max-h-[140px] sm:max-h-64 object-contain"
                    />
                </div>

                {/* Content */}
                <div className="flex flex-col justify-center"
                    style={{ fontSize: 'clamp(0.5rem, 2.8vw, 1.2rem)' }}>

                    {/* Curved text */}
                    <div className="flex justify-center -mb-1">
                        <svg viewBox="0 0 500 180" className="w-[clamp(120px,40vw,220px)] h-auto">
                            <defs>
                                <path id="curve" d="M73.2,148.6c4-6.1,65.5-96.8,178.6-95.6c111.3,1.2,170.8,90.3,175.1,97" />
                            </defs>
                            <text>
                                <textPath href="#curve" startOffset="50%" textAnchor="middle"
                                    style={{ fontSize: '76px', letterSpacing: '6px' }}>
                                    ARMÓNICO
                                </textPath>
                            </text>
                        </svg>
                    </div>
                    <a

                        href={isMobile ? GEO : GMAPS}
                        target={isMobile ? undefined : "_blank"}
                        rel="noopener noreferrer"
                        className="hover:underline leading-snug"
                    >
                        <p>C. 11 2008, bolivar, zona centro <br />chihuahua, chihuahua 31000</p>
                    </a>

                    <p className="rotate-[.04rad] pl-[10%] py-1">shows + arte + cultura</p>

                    <div className="rotate-[-.02rad] flex flex-col pt-1">
                        <a className="underline hover:text-[#C91E1F]" href="mailto:armonico@hoyesunbuendia.mx">armonico@hoyesunbuendia.mx</a>
                        <a className="hover:text-[#C91E1F]" href="tel:+526141912220">+<span className="underline">52 614 191 2220</span></a>
                    </div>
                </div>
            </div>
        </div>
    )
}