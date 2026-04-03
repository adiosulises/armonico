'use client'

import Link from "next/link";
import Image from "next/image";
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Nav() {
    const pathname = usePathname()
    const [heroVisible, setHeroVisible] = useState(() => pathname === '/')

    useEffect(() => {
        const sentinel = document.getElementById('hero-sentinel')
        if (!sentinel) return

        const observer = new IntersectionObserver(
            ([entry]) => setHeroVisible(entry.isIntersecting),
            { threshold: 0 }
        )

        observer.observe(sentinel)
        return () => observer.disconnect()
    }, [])

    const links = [
        { href: '/', label: 'INICIO' },
        { href: '/calendario', label: 'CALENDARIO' },
        { href: '/tienda', label: 'TIENDA' },
        { href: '/blog', label: 'BLOG' },
        { href: '/nosotros', label: 'NOSOTROS' },
        { href: '/contacto', label: 'CONTACTO' },
    ]

    return (
        <div
            className="sticky top-0 h-screen bg-white flex items-center justify-center text-black text-xl shadow-xl"
            style={{
                width: heroVisible ? '0px' : '277px',
                minWidth: heroVisible ? '0px' : '277px',
                overflow: 'hidden',
                opacity: heroVisible ? 0 : 1,
                pointerEvents: heroVisible ? 'none' : 'auto',
                transition: 'width 0.3s ease, min-width 0.3s ease, opacity 0.3s ease',
            }}
        >
            <div className="w-[277px] flex flex-col gap-2 items-center">
                <Image src={'/logo-black.png'} alt="logo" width={160} height={160} />
                {links.map(({ href, label }) => (
                    <Link key={href} href={href} className={pathname === href ? 'text-red-800' : ''}>
                        {label}
                    </Link>
                ))}
            </div>
        </div>
    )
}