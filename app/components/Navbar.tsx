'use client'

import Link from "next/link";
import Image from "next/image";
import { usePathname } from 'next/navigation'

export default function Nav() {
    const pathname = usePathname()

    const links = [
        { href: '/', label: 'INICIO' },
        { href: '/calendario', label: 'CALENDARIO' },
        { href: '/tienda', label: 'TIENDA' },
        { href: '/blog', label: 'BLOG' },
        { href: '/nosotros', label: 'NOSOTROS' },
        { href: '/contacto', label: 'CONTACTO' },
    ]

    return (
        <div className="w-[277px] min-w-[277px] h-screen bg-white flex items-center justify-center sticky top-0 text-black text-xl">
            <div className="flex flex-col gap-2 items-center">
                <Image
                    src={'/logo-black.png'}
                    alt="logo"
                    width={160}
                    height={160}
                />
                {links.map(({ href, label }) => (
                    <Link
                        key={href}
                        href={href}
                        className={pathname === href ? 'text-red-800' : ''}
                    >
                        {label}
                    </Link>
                ))}
            </div>
        </div>
    )
}