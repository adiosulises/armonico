'use client'

import Link from "next/link";
import Image from "next/image";
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const TikTokIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.74a4.85 4.85 0 01-1.01-.05z"/>
  </svg>
)

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
)

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
)

export default function Nav() {
    const pathname = usePathname()
    const [heroVisible, setHeroVisible] = useState(() => pathname === '/')
    const [mobileOpen, setMobileOpen] = useState(false)

    useEffect(() => {
        if (pathname !== '/') {
            return
        }
        const sentinel = document.getElementById('hero-sentinel')
        if (!sentinel) return
        const observer = new IntersectionObserver(
            ([entry]) => setHeroVisible(entry.isIntersecting),
            { threshold: 0 }
        )
        observer.observe(sentinel)
        return () => observer.disconnect()
    }, [pathname])

    const links = [
        { href: '/', label: 'INICIO' },
        { href: '/calendario', label: 'CALENDARIO' },
        // { href: '/tienda', label: 'TIENDA' },
        { href: '/nosotros', label: 'NOSOTROS' },
        { href: '/blog', label: 'BLOG' },
        { href: '/contacto', label: 'CONTACTO' },
    ]

    const socials = [
        { href: 'https://www.instagram.com/ar.monico/?hl=en', icon: <InstagramIcon /> },
        { href: 'https://www.tiktok.com/@armnicoforocultural?_r=1&_t=ZS-95IEUfZc4uK', icon: <TikTokIcon /> },
        { href: 'https://www.facebook.com/share/1RTTdjeE2B/?mibextid=wwXIfr', icon: <FacebookIcon /> },
    ]

    const navContent = (
        <div className="w-[277px] flex flex-col gap-2 items-center h-full justify-center py-6 relative">
            <div className="flex flex-col gap-2 items-center">
                <Image src={'/logo-black.png'} alt="logo" width={160} height={160} />
                {links.map(({ href, label }) => (
                    <Link
                        key={href}
                        href={href}
                        onClick={() => setMobileOpen(false)}
                        className={pathname === href ? 'text-[#C91E1F]' : 'hover:text-[#C91E1F] transition-colors'}
                    >
                        {label}
                    </Link>
                ))}
            </div>
            <div className="flex gap-6 absolute bottom-8">
                {socials.map(({ href, icon }) => (
                    <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                        className="text-black hover:text-[#C91E1F] transition-colors">
                        {icon}
                    </a>
                ))}
            </div>
        </div>
    )

    return (
        <>
            {/* Desktop nav */}
            <div
                className="sticky top-0 h-screen bg-white hidden md:flex items-center justify-center text-black text-xl shadow-xl"
                style={{
                    width: heroVisible ? '0px' : '277px',
                    minWidth: heroVisible ? '0px' : '277px',
                    overflow: 'hidden',
                    opacity: heroVisible ? 0 : 1,
                    pointerEvents: heroVisible ? 'none' : 'auto',
                    transition: 'width 0.3s ease, min-width 0.3s ease, opacity 0.3s ease',
                }}
            >
                {navContent}
            </div>

            {/* Mobile nav */}
            <div className="md:hidden">
                {/* Hamburger button */}
                <button
                    onClick={() => setMobileOpen(o => !o)}
                    className="fixed top-4 left-4 z-50 bg-white p-2 shadow-md"
                    aria-label="Menu"
                >
                    <div className="flex flex-col gap-1.5">
                        <span className={`block w-6 h-0.5 bg-black transition-all ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
                        <span className={`block w-6 h-0.5 bg-black transition-all ${mobileOpen ? 'opacity-0' : ''}`} />
                        <span className={`block w-6 h-0.5 bg-black transition-all ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                    </div>
                </button>

                {/* Drawer */}
                <div
                    className="fixed inset-y-0 left-0 z-40 bg-white shadow-xl flex items-center justify-center text-black text-xl transition-transform duration-300"
                    style={{
                        width: '277px',
                        transform: mobileOpen ? 'translateX(0)' : 'translateX(-100%)',
                    }}
                >
                    {navContent}
                </div>

                {/* Backdrop */}
                {mobileOpen && (
                    <div
                        className="fixed inset-0 z-30 bg-black/20"
                        onClick={() => setMobileOpen(false)}
                    />
                )}
            </div>
        </>
    )
}