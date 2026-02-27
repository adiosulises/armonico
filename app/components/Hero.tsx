'use client'

import Image from "next/image"
import { useState } from "react"

export default function Hero() {

    const [img, setImg] = useState<number>(1)
    return(
        <div className="relative h-screen w-full bg-gray-300 grid grid-cols-5 grid-rows-5">
            <Image 
                src={`/hero-imgs/${img}.webp`}
                alt={`imagen ${img}`}
                fill
                className="object-cover object-center"
            />
            <Image
                src={'/text-logo-white.png'}
                alt="armonico logo"
                width={6250}
                height={2084}
                className="absolute m-auto left-0 right-0 top-1/2 bottom-1/2 z-10 w-[70vw]"
            />
            {Array.from({ length: 25 }).map((_, i) => (
                <div key={i} className="z-20" onMouseEnter={() => setImg(i + 1)}>

                </div>
            ))}
        </div>
    )
}