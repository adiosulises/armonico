'use client'
import { useState, useMemo } from "react"

const events = [
  { date: 'NOV 01.25', title: 'APERTURA DE TEMPORADA', month: 'NOVIEMBRE' },
  { date: 'NOV 05.25', title: 'CONCIERTO DE JAZZ EN VIVO', month: 'NOVIEMBRE' },
  { date: 'NOV 08.25', title: 'TALLER DE FOTOGRAFÍA ANALÓGICA', month: 'NOVIEMBRE' },
  { date: 'NOV 12.25', title: 'SESIÓN DE DIBUJO CON: SVIND', month: 'NOVIEMBRE' },
  { date: 'NOV 15.25', title: 'TEATRO MACABRO', month: 'NOVIEMBRE' },
  { date: 'NOV 17.25', title: 'FERIA DE ZINES INDEPENDIENTES', month: 'NOVIEMBRE' },
  { date: 'NOV 20.25', title: 'PROYECCIÓN: CINE DE CULTO', month: 'NOVIEMBRE' },
  { date: 'NOV 22.25', title: 'LA TEXANA JUNTO A SAN CHARBEL', month: 'NOVIEMBRE' },
  { date: 'NOV 26.25', title: 'LECTURA DE POESÍA SONORA', month: 'NOVIEMBRE' },
  { date: 'NOV 29.25', title: 'NOCHE DE IMPROVISACIÓN', month: 'NOVIEMBRE' },
  { date: 'DIC 06.25', title: 'MERCADO NAVIDEÑO ARTESANAL', month: 'DICIEMBRE' },
  { date: 'DIC 13.25', title: 'CONCIERTO FIN DE AÑO', month: 'DICIEMBRE' },
  { date: 'DIC 20.25', title: 'CIERRE DE TEMPORADA', month: 'DICIEMBRE' },
]

const months = [
  'ENERO','FEBRERO','MARZO','ABRIL','MAYO','JUNIO',
  'JULIO','AGOSTO','SEPTIEMBRE','OCTUBRE','NOVIEMBRE','DICIEMBRE',
]

const PAGE_SIZE = 9

export default function Calendario() {

  const [selectedMonth, setSelectedMonth] = useState('NOVIEMBRE')
  const [page, setPage] = useState(0)

  const visibleEvents = events.filter(e => e.month === selectedMonth)
  const totalPages = Math.ceil(visibleEvents.length / PAGE_SIZE)
  const pageEvents = visibleEvents.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE)

  const rotations = useMemo(
    () => pageEvents.map(() => +(Math.random() * 14 - 7).toFixed(2)),
    [selectedMonth, page]
  )

  function handleMonthSelect(m: string) {
    setSelectedMonth(m)
    setPage(0)
  }

  return (
    <section className="flex flex-col relative overflow-hidden" style={{fontFamily: 'var(--font-tecla)', height: '1117px'}}>
      {/* Watermark */}
      <img src="/img/armonico-wm.png" alt="" aria-hidden className="absolute inset-0 m-auto pointer-events-none select-none" style={{ opacity: 0.06, transform: 'rotate(-15deg)' }} />
      {/* Selector de meses */}
      <div className="flex flex-col items-center gap-6 py-6">
        <div className="flex gap-20">
          {months.slice(0,6).map(m => (
            <button
              key={m}
              onClick={() => handleMonthSelect(m)}
              className={m === selectedMonth ? 'text-[#C91E1F]' : 'text-black text-lg'}>
              {m}
            </button>
          ))}
        </div>
        <div className="flex gap-20">
          {months.slice(6).map(m => (
            <button
              key={m}
              onClick={() => handleMonthSelect(m)}
              className={m === selectedMonth ? 'text-[#C91E1F]' : 'text-black text-lg'}>
              {m}
            </button>
          ))}
        </div>
      </div>
      {/* Tarjeta */}
      <div className='mx-auto p-6 flex flex-col mt-8' style={{ backgroundImage: "url('/img/calendario-bg.png')", backgroundSize: '100% 100%', width: '548px', height: '874px', transform: 'rotate(-3deg)'}}>
        <div className='mt-18.5 ml-8.5 text-sm'>
          <p>{selectedMonth}</p>
        </div>

        {/* Eventos */}
        <div style={{ height: '548px' }}>
          {pageEvents.map((event, i) => (
            <div key={event.date} className={`flex items-center gap-10 ${i === 0 ? 'mt-5' : 'mt-3'}`}>
              <div className="text-[#C91E1F] text-xl shrink-0" style={{fontFamily: 'var(--font-tayvar', transform: `rotate(${rotations[i]}deg)`}}>{event.date}</div>
              <div className="text-xl overflow-hidden flex items-center" style={{fontFamily: 'var(--font-grotesk75)', width: '297px', height: '48px'}}>{event.title}</div>
            </div>
          ))}
        </div>

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="mt-5 flex justify-between items-center px-2 pb-2">
            <button
              onClick={() => setPage(p => p - 1)}
              disabled={page === 0}
              className="disabled:opacity-30">
              ← ANTERIOR
            </button>
            <span>{page + 1} / {totalPages}</span>
            <button
              onClick={() => setPage(p => p + 1)}
              disabled={page === totalPages - 1}
              className="disabled:opacity-30">
              SIGUIENTE →
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
