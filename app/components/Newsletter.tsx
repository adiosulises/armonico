
'use client'
import { useState } from 'react'
import { toast } from "sonner"

export default function Newsletter() {
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [message, setMessage] = useState('')

    const handleSubmit = async () => {
        if (!email) return
        setStatus('loading')

        const res = await fetch('/api/subscribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        })

        const data = await res.json()
        if (res.ok) {
            setStatus('success')
            setEmail('')
            setMessage('¡Listo! Ya estás suscrito.')
            toast('¡Listo! Ya estás suscrito.')
        } else {
            setStatus('error')
            setMessage(data.error)
            toast(data.error)
        }
    }

    return (
        <section style={{
            minHeight: '327px',
            padding: 'clamp(40px, 6vw, 60px) clamp(20px, 5vw, 40px)',
            backgroundColor: '#000000',
            color: '#ffffff',
            fontFamily: 'var(--font-tecla)'
        }}>
            <h2 style={{ fontSize: 'clamp(1.25rem, 4vw, 2.25rem)', lineHeight: 1.2, margin: 0 }}>
                suscríbete a nuestro newsletter<br />
                para enterarte de todo
            </h2>

            <div className="flex items-end mt-10 gap-2" style={{ maxWidth: '600px' }}>
                <div className="flex flex-col flex-1">
                    <div className="flex flex-row justify-between items-baseline">
                        <input
                            type="email"
                            placeholder="tu correo"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                            style={{ fontSize: 'clamp(1.25rem, 4vw, 2.25rem)' }}
                            className="text-white placeholder:text-white bg-transparent p-0 outline-none w-full"
                        />
                        {/* arrow */}
                        <button onClick={handleSubmit} className="mb-3 shrink-0 hover:opacity-70 transition-opacity">
                            <svg width="29" height="11" viewBox="0 0 29 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.7373 0.107666C23.2302 -0.141223 23.832 0.0562968 24.0811 0.549072C24.1051 0.596699 24.1254 0.630933 24.1904 0.713135L24.6074 1.21313L24.6123 1.21997C25.1439 1.86975 25.7462 2.54929 26.3184 3.21411C26.8685 3.85333 27.4124 4.50217 27.7461 5.02368L28.0898 5.56177L27.7471 6.09985C27.6546 6.24507 27.5691 6.39111 27.4756 6.55298C27.3854 6.70898 27.2845 6.88539 27.1748 7.05786C26.9498 7.41161 26.6648 7.79166 26.2422 8.13013C25.7495 8.52478 24.3101 9.72343 23.5879 10.3254C23.1637 10.6791 22.5323 10.6217 22.1787 10.1975C21.8255 9.77335 21.8827 9.14287 22.3066 8.78931C22.8999 8.29479 24.0137 7.36916 24.665 6.83618C24.3578 6.72644 24.049 6.62331 23.6641 6.52075C22.8542 6.305 21.7535 6.11029 19.8623 5.97876C16.0409 5.71301 9.36363 5.71216 5.71191 5.71216H1C0.447838 5.71203 1.64862e-05 5.26435 0 4.71216C0 4.15995 0.447827 3.71229 1 3.71216H5.71191C9.33316 3.71216 16.0935 3.71191 20.001 3.98364C21.9737 4.12084 23.2091 4.32955 24.1797 4.58813C24.5071 4.67539 24.8119 4.77364 25.1016 4.87231C25.006 4.75892 24.9072 4.64016 24.8027 4.5188C24.2581 3.88596 23.6169 3.16188 23.0645 2.48657V2.4856C22.7171 2.06889 22.4845 1.82481 22.2959 1.45142C22.047 0.958502 22.2445 0.356684 22.7373 0.107666Z" fill="white" />
                            </svg>
                        </button>
                    </div>
                    {/* underline */}
                    <svg width="736" height="9" viewBox="0 0 736 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 7.16835C2.02636 7.16835 6.14733 6.89395 22.3669 6.47819C56.5094 5.603 80.8069 6.06243 89.0489 5.64667C105.431 4.82027 118.129 5.23091 127.91 4.81514C164.162 3.27426 172.526 3.84226 182.898 3.1521C191.59 2.57374 199.507 2.73633 224.435 2.32057C246.787 1.94776 288.877 2.17921 311.582 2.31641C336.349 2.46608 340.506 3.28514 354.65 3.7009C388.757 4.70351 413.595 3.56786 419.015 3.1521C433.174 2.06582 442.582 2.17921 455.792 1.48905C483.443 0.0444521 498.005 2.17921 508.704 3.00658C522.367 4.06312 535.918 4.39107 549.113 4.81099C555.115 5.00201 582.353 5.50531 620.445 5.64251C635.463 5.6966 654.478 6.33683 682.197 6.47403C700.244 7.16836 706.993 7.44276 713.431 7.85852C718.329 7.99988 726.54 7.99988 735 7.99988" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </div>
            </div>
        </section>
    )
}