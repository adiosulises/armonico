'use client'
import { useState } from "react"

const events = [
{ date: 'NOV 12.25', title: 'SESIÓN DE DIBUJO CON: SVIND', month: 'NOVIEMBRE' },
{ date: 'NOV 15.25', title: 'TEATRO MACABRO', month: 'NOVIEMBRE' },
{ date: 'NOV 22.25', title: 'LA TEXANA JUNTO A SAN CHARBEL', month: 'NOVIEMBRE' },
]

const months = [
'ENERO','FEBRERO','MARZO','ABRIL','MAYO','JUNIO',
'JULIO','AGOSTO','SEPTIEMBRE','OCTUBRE','NOVIEMBRE','DICIEMBRE',
]
export default function Calendario() {
return (
    <section className="min-h-screen flex flex-col"style={{fontFamily: 'var(--font-tecla)' }}>
        {/* Selector de meses */}
        <div>
            {months.map(m => (
                <button key={m}> {m} </button>
            ))}
        </div>
        {/* Tarjeta */}
        <div>
            <p>ARMONICO </p>
            <p>AGENDA MENSUAL</p>
            <p>MES: NOVIEMBRE</p>

            {/* Eventos */}
            <div>
                <span className="text-[#C91E1F]" style={{fontFamily: 'var(--font-tayvar'}}>NOV 12.25</span>
                <span style={{fontFamily: 'var(--font-grotesk75'}}>SESION DE DIBUJO CON: SVIND</span>
            </div>
            <p>ARMONICO CENTRO CULTURAL</p>
        </div>
    </section>
)}