"use client"

import { useState } from 'react'
import Hero from "./components/Hero";
import HeroCartelera from './components/HeroCartelera';
import CarruselCartelera from './components/CarruselCartelera';

export default function Home() {
  return (
    <div>
      <Hero />
    <div style={{ display: 'flex' }}>
      <main style={{ flex: 1 }}>
        {/* 1. Hero Cartelera */}
        <HeroCartelera />
        {/* 2. Carrusel Cartelera */}
        <CarruselCartelera />
        {/* 3. Newsletter */}
        <section style={{ minHeight: '327px', padding: '60px 40px', backgroundColor:'#000000', color:'#ffffff', fontFamily: 'var(--font-tecla)' }}>
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
            <img src="icons/newsletter-underline.png"/>
          </div>
        </section>
        {/* 4. Calendario */}
        <section id="calendario" style={{ minHeight: '100vh', padding: '60px 40px', backgroundColor:'#F8C8C8' }}>
          <h2>Calendario</h2>
        </section>
        {/* 5. Tienda */}
        <section id="tienda" style={{ minHeight: '100vh', padding: '60px 40px', backgroundColor:'#F1E0C4' }}>
          <h2>Tienda</h2>
        </section>
        {/* 6. Blog */}
        <section id="blog" style={{ minHeight: '100vh', padding: '60px 40px', backgroundColor:'#ffffff' }}>
          <h2>Blog</h2>
        </section>
        {/* 7. Contacto */}
        <section id="contacto" style={{ minHeight: '100vh', padding: '60px 40px' }}>
          <h2>Contacto</h2>
        </section>
      </main>
    </div>
    </div>
  );
}
