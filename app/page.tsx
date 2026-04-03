import Hero from "./components/Hero";
import HeroCartelera from './components/HeroCartelera';
import CarruselCartelera from './components/CarruselCartelera';
import { getEvents, formatTime, formatDate } from './lib/shopify'
import Newsletter from './components/Newsletter'

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
          <Newsletter />
        </main>
      </div>
    </div>
  );
}
