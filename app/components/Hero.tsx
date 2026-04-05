'use client'

import Image from "next/image"
import { useState, useEffect, useRef } from "react"

const TOTAL = 25
const MOBILE_COUNT = 10
const INTERVAL_MS = 1500

function pickRandom(count: number, total: number): number[] {
    const all = Array.from({ length: total }, (_, i) => i + 1)
    for (let i = all.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [all[i], all[j]] = [all[j], all[i]]
    }
    return all.slice(0, count)
}

export default function Hero() {
    const [img, setImg] = useState(1)
    const [isMobile, setIsMobile] = useState(false)
    const [mobileImgs, setMobileImgs] = useState<number[]>([])
    const mobileIndex = useRef(0)

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768)
        check()
        window.addEventListener('resize', check)
        return () => window.removeEventListener('resize', check)
    }, [])

    // Desktop: random starting image
    useEffect(() => {
        if (!isMobile) setImg(Math.floor(Math.random() * TOTAL) + 1)
    }, [isMobile])

    // Mobile: pick 10 random imgs and cycle through them
    useEffect(() => {
        if (!isMobile) return
        const imgs = pickRandom(MOBILE_COUNT, TOTAL)
        setMobileImgs(imgs)
        setImg(imgs[0])
        mobileIndex.current = 0

        const interval = setInterval(() => {
            mobileIndex.current = (mobileIndex.current + 1) % MOBILE_COUNT
            setImg(imgs[mobileIndex.current])
        }, INTERVAL_MS)

        return () => clearInterval(interval)
    }, [isMobile])

    return (
        <div className="relative h-[110vh] md:h-screen w-full bg-black grid grid-cols-5 grid-rows-5">
            {Array.from({ length: TOTAL }).map((_, i) => (
                <Image
                    key={i + 1}
                    src={`/hero-imgs/${i + 1}.webp`}
                    alt={`imagen ${i + 1}`}
                    fill
                    className="object-cover object-center transition-opacity duration-500"
                    style={{ opacity: img === i + 1 ? 1 : 0 }}
                />
            ))}
            <Image
                src={'/text-logo-white.png'}
                alt="armonico logo"
                width={6250}
                height={2084}
                className="absolute m-auto left-0 right-0 top-1/2 bottom-1/2 z-10 w-[70vw]"
            />
            {!isMobile && Array.from({ length: TOTAL }).map((_, i) => (
                <div key={i} className="z-20" onMouseEnter={() => setImg(i + 1)} />
            ))}
        </div>
    )
}