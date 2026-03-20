'use client'
export default function HeroCartelera() {
  return (
    <>
      <section id="inicio" className="min-h-screen bg-black text-white uppercase flex items-center justify-center" style={{ fontFamily: 'var(--font-din)' }}>
        <div className="max-w-3xl w-full px-6 flex flex-col items-center px-10">
          <hr className="w-full border-white my-0" />
          <div className="w-full h-13 flex items-center justify-center text-center text-7xl font-bold">
            <h1 className="leading-none -mb-[3px]">ARMONICO</h1>
          </div>
          <hr className="w-full border-white my-0" />
          <div className="w-full h-13 flex items-end justify-center text-center text-4xl pb-[1px]">
            <p className="leading-none -mb-[7px]">PRESENTA</p>
          </div>
          <hr className="w-full border-white my-0" />
          <div className="w-full h-13" />
          <hr className="w-full border-white my-0 -mb-[1px]" />
          <div className="w-full h-13 flex items-center justify-center text-center text-7xl font-bold">
            <h1 className="leading-none -mb-[3px]">BUEN CAMINO DAN</h1>
          </div>
          <hr className="w-full border-white my-0" />
          <div className="w-full h-13 flex items-center justify-center text-center text-7xl font-bold -mb-[1px]">
            <h1>"HORMIGAS"</h1>
          </div>
          <hr className="w-full border-white my-0" />
          <div className="w-full h-13 flex items-end justify-center text-center text-4xl pb-[1px]">
            <p className="leading-none -mb-[7px]">EN VIVO</p>
          </div>
          <hr className="w-full border-white my-0" />
          <div className="w-full h-13" />
          <hr className="w-full border-white my-0 -mb-[1px]" />
          <div className="w-full h-13 flex items-center justify-center text-center text-7xl font-bold">
            <h1 className="leading-none -mb-[3px]">14.FEB.25 - 8PM</h1>
          </div>
          <hr className="w-full border-white my-0" />
          <button className="mt-10 bg-[#f5f0dc] text-black font-bold uppercase px-12 py-6 text-lg tracking-widest rounded">
            COMPRAR BOLETOS
          </button>

        </div>
      </section>
      <div id="hero-sentinel" />
    </>
  )
}
