import Hero from "./components/Hero";
import HeroCartelera from './components/HeroCartelera';
import CarruselCartelera from './components/CarruselCartelera';
import { getEvents, formatTime, formatDate } from './lib/shopify'

export default async function Home() {

  // Fetcher eventos
  const rawEvents = await getEvents()

  const events = rawEvents.map(e=>({
    slug: e.handle,
    title: e.title,
    support: e.support,
    date: formatDate(e.evey.start_at),
    time: formatTime(e.evey.start_at),
    flyer: e.flyer
  }))

  return (
    <div>
      <HeroCartelera />
      <Hero />
      <div style={{ display: 'flex' }}>
        <main style={{ flex: 1 }}>
          {/* 2. Carrusel Cartelera */}
          <CarruselCartelera events={events} />
          {/* 3. Newsletter */}
          <section style={{ minHeight: '327px', padding: '60px 40px', backgroundColor: '#000000', color: '#ffffff', fontFamily: 'var(--font-tecla)' }}>
            <div>
              <h2 className="text-4xl">suscríbete a nuestro newsletter<br />
                para enterarte de todo
              </h2>
              <div className="flex items-end">
                <input
                  type="email"
                  placeholder="tu correo"
                  className="text-4xl text-white placeholder:text-white mt-15 p-0 m-0 w-90 outline-none"
                />
                <button className="flex items-center mb-2">
                  <img src="icons/newsletter-arrow-body.png" />
                  <img src="icons/newsletter-arrow-head.png" />
                </button>
              </div>
              <img src="icons/newsletter-underline.png" />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
