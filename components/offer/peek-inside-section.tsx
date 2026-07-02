import Image from 'next/image'

type Poster = {
  src: string
  name: string
  rotate: number
  y: number
  /** distância do centro: controla em qual breakpoint a carta aparece */
  reveal: 'always' | 'sm' | 'md' | 'lg' | 'xl'
}

// Leque de páginas: centro em destaque, laterais inclinadas e rebaixadas
const posters: Poster[] = [
  {
    src: '/dulces/posters/boli-de-fresa-con-leche.png',
    name: 'Boli de Fresa con Leche',
    rotate: -16,
    y: 52,
    reveal: 'lg',
  },
  {
    src: '/dulces/posters/tartaleta-de-limon.png',
    name: 'Tartaleta de Limón',
    rotate: -12,
    y: 36,
    reveal: 'md',
  },
  {
    src: '/dulces/posters/pastel-en-vaso-de-chocolate.png',
    name: 'Pastel en Vaso de Chocolate',
    rotate: -8,
    y: 22,
    reveal: 'always',
  },
  {
    src: '/dulces/posters/boli-de-chocolate-cremoso.png',
    name: 'Boli de Chocolate Cremoso',
    rotate: -4,
    y: 10,
    reveal: 'always',
  },
  {
    src: '/dulces/posters/brigadeiro-tradicional.png',
    name: 'Brigadeiro Tradicional',
    rotate: 0,
    y: 0,
    reveal: 'always',
  },
  {
    src: '/dulces/posters/mousse-de-maracuya.png',
    name: 'Mousse de Maracuyá',
    rotate: 4,
    y: 10,
    reveal: 'always',
  },
  {
    src: '/dulces/posters/tartaleta-de-fresa.png',
    name: 'Tartaleta de Fresa',
    rotate: 8,
    y: 22,
    reveal: 'always',
  },
  {
    src: '/dulces/posters/brigadeiro-de-nutella.png',
    name: 'Brigadeiro de Nutella',
    rotate: 12,
    y: 36,
    reveal: 'md',
  },
  {
    src: '/dulces/posters/copa-de-oreo.png',
    name: 'Copa de Oreo',
    rotate: 16,
    y: 52,
    reveal: 'lg',
  },
]

const revealClass: Record<Poster['reveal'], string> = {
  always: '',
  sm: 'hidden sm:block',
  md: 'hidden md:block',
  lg: 'hidden lg:block',
  xl: 'hidden xl:block',
}

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

      {/* Leque de páginas */}
      <div className="mt-14 flex items-end justify-center px-5">
        {posters.map((p, i) => {
          const isCenter = p.rotate === 0
          return (
            <figure
              key={p.name}
              className={`group relative -ml-14 first:ml-0 sm:-ml-12 md:-ml-14 ${revealClass[p.reveal]}`}
              style={{
                transform: `rotate(${p.rotate}deg) translateY(${p.y}px)`,
                zIndex: isCenter ? 30 : 20 - Math.abs(i - 4),
              }}
            >
              <div
                className={`overflow-hidden rounded-2xl border bg-card shadow-2xl ${
                  isCenter
                    ? 'w-28 border-accent/60 ring-4 ring-accent/40 sm:w-48 md:w-60'
                    : 'w-24 border-white/10 opacity-90 sm:w-40 md:w-44'
                }`}
              >
                <Image
                  src={p.src || '/placeholder.svg'}
                  alt={`Página de la receta: ${p.name}`}
                  width={480}
                  height={640}
                  className="h-full w-full object-cover"
                />
              </div>
              {isCenter && (
                <figcaption className="sr-only">{p.name}</figcaption>
              )}
            </figure>
          )
        })}
      </div>

      <p className="mt-16 text-center text-sm font-semibold text-deal-foreground/60 sm:mt-20">
        + de 150 recetas organizadas por categoría, con ingredientes, preparación y precio sugerido.
      </p>
    </section>
  )
}
