import Hero from "./components/Hero";
import HeroCartelera from './components/HeroCartelera';
import CarruselCartelera from './components/CarruselCartelera';

export default function Home() {
  return (
    <div>
      <HeroCartelera />
      <Hero />
      <div style={{ display: 'flex' }}>
        <main style={{ flex: 1 }}>
          {/* 2. Carrusel Cartelera */}
          <CarruselCartelera />
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
