import Image from 'next/image'

type Poster = {
  src: string
  name: string
}

// 10 páginas del recetario que giran en loop
const posters: Poster[] = [
  { src: '/dulces/posters/brigadeiro-tradicional.png', name: 'Brigadeiro Tradicional' },
  { src: '/dulces/posters/boli-de-chocolate-cremoso.png', name: 'Boli de Chocolate Cremoso' },
  { src: '/dulces/posters/tartaleta-de-limon.png', name: 'Tartaleta de Limón' },
  { src: '/dulces/posters/pastel-en-vaso-de-chocolate.png', name: 'Pastel en Vaso de Chocolate' },
  { src: '/dulces/posters/mousse-de-maracuya.png', name: 'Mousse de Maracuyá' },
  { src: '/dulces/posters/boli-de-fresa-con-leche.png', name: 'Boli de Fresa con Leche' },
  { src: '/dulces/posters/tartaleta-de-fresa.png', name: 'Tartaleta de Fresa' },
  { src: '/dulces/posters/brigadeiro-de-nutella.png', name: 'Brigadeiro de Nutella' },
  { src: '/dulces/posters/copa-de-oreo.png', name: 'Copa de Oreo' },
  { src: '/dulces/posters/pastel-en-vaso-de-fresa.png', name: 'Pastel en Vaso de Fresa' },
]

// Duplicamos la lista para que el loop sea continuo (sin cortes)
const loop = [...posters, ...posters]

export function PeekInsideSection() {
  return (
    <section className="overflow-hidden bg-deal py-16 text-deal-foreground sm:py-20">
      <div className="mx-auto max-w-3xl px-5 text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-xs font-bold uppercase tracking-wide text-accent-foreground">
          Contenido del recetario
        </span>
        <h2 className="mt-6 font-serif text-4xl font-black text-balance sm:text-5xl">
          Espía por dentro
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-deal-foreground/70 sm:text-lg">
          Conoce algunas de las 150 recetas listas para vender que encontrarás dentro de este
          material.
        </p>
      </div>

      {/* Carrusel giratorio en loop */}
      <div className="peek-marquee relative mt-14 flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <ul className="peek-track flex shrink-0 items-center gap-5 pr-5">
          {loop.map((p, i) => (
            <li key={`${p.name}-${i}`} className="shrink-0">
              <figure className="overflow-hidden rounded-2xl border border-white/10 bg-card shadow-2xl">
                <Image
                  src={p.src || '/placeholder.svg'}
                  alt={`Página de la receta: ${p.name}`}
                  width={480}
                  height={640}
                  className="h-64 w-44 object-cover sm:h-80 sm:w-56"
                  aria-hidden={i >= posters.length}
                />
                <figcaption className="sr-only">{p.name}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-16 text-center text-sm font-semibold text-deal-foreground/60 sm:mt-20">
        + de 150 recetas organizadas por categoría, con ingredientes, preparación y precio sugerido.
      </p>

      <style>{`
        .peek-track {
          animation: peek-scroll 32s linear infinite;
          will-change: transform;
        }
        .peek-marquee:hover .peek-track {
          animation-play-state: paused;
        }
        @keyframes peek-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .peek-track { animation: none; }
        }
      `}</style>
    </section>
  )
}
