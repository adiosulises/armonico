import Hero from "./components/Hero";
import HeroCartelera from './components/HeroCartelera';
import CarruselCartelera from './components/CarruselCartelera';
import { getEvents, formatTime, formatDate } from './lib/shopify'
import Newsletter from './components/Newsletter'

export default async function Home() {

  // Fetcher eventos
  const rawEvents = await getEvents()

  const now = new Date()
  const upcoming = rawEvents
    .filter(e => new Date(e.evey.start_at) >= now)
    .sort((a, b) => new Date(a.evey.start_at).getTime() - new Date(b.evey.start_at).getTime())
  const past = rawEvents
    .filter(e => new Date(e.evey.start_at) < now)
    .sort((a, b) => new Date(b.evey.start_at).getTime() - new Date(a.evey.start_at).getTime())
  const needed = Math.max(0, 4 - upcoming.length)
  const visibleRaw = [...upcoming, ...past.slice(0, needed)]

  const events = visibleRaw.map(e=>({
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
