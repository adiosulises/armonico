'use client'

import Image from "next/image"
import { useState } from "react"

export default function Hero() {
    const [img, setImg] = useState<number>(() => Math.floor(Math.random() * 25) + 1)

    return (
        <div className="relative h-screen w-full bg-black grid grid-cols-5 grid-rows-5">
            {Array.from({ length: 25 }).map((_, i) => (
                <Image
                    key={i + 1}
                    src={`/hero-imgs/${i + 1}.webp`}
                    alt={`imagen ${i + 1}`}
                    fill
                    className="object-cover object-center transition-opacity duration-100"
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
            {Array.from({ length: 25 }).map((_, i) => (
                <div key={i} className="z-20" onMouseEnter={() => setImg(i + 1)} />
            ))}
        </div>
    )
}