import Image from 'next/image'

const bonuses = [
  {
    image: '/dulces/bonus-1.png',
    number: '1',
    value: 'R$27',
    title: 'Menú Pronto de Dulces Brasileños',
    text: 'Modelo listo para divulgar tus sabores por WhatsApp y redes sociales.',
  },
  {
    image: '/dulces/bonus-2.png',
    number: '2',
    value: 'R$27',
    title: 'Lista de Ingredientes Económicos',
    text: 'Guía rápida para saber qué comprar sin gastar de más.',
  },
  {
    image: '/dulces/bonus-3.png',
    number: '3',
    value: 'R$47',
    title: 'Calculadora Simple de Precio',
    text: 'Ayuda para definir precio por unidad, combo y margen de ganancia.',
  },
  {
    image: '/dulces/bonus-4.png',
    number: '4',
    value: 'R$27',
    title: 'Etiquetas Listas para Imprimir',
    text: 'Modelos para dejar tus dulces más bonitos, organizados y profesionales.',
  },
  {
    image: '/dulces/bonus-5.png',
    number: '5',
    value: 'R$37',
    title: 'Ideas de Combos para Vender Más',
    text: 'Sugerencias listas de kits, cajas y paquetes para aumentar el valor por pedido.',
  },
]

export function BonusSection() {
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-5 text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-xs font-bold uppercase tracking-wide text-accent-foreground">
          Bonos incluidos
        </span>
        <h2 className="mx-auto mt-6 max-w-2xl font-serif text-3xl font-black text-balance text-foreground sm:text-4xl">
          Además, recibe estos bonos para vender con más facilidad
        </h2>

        <div className="mt-12 grid gap-5 text-left sm:grid-cols-2">
          {bonuses.map(({ image, number, value, title, text }) => (
            <div
              key={number}
              className="flex gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm"
            >
              <div className="relative size-24 shrink-0 sm:size-28">
                <Image
                  src={image || '/placeholder.svg'}
                  alt={`Mockup del bono ${number}: ${title}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 96px, 112px"
                />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">
                    BONO #{number}
                  </span>
                  <span className="text-xs font-semibold text-muted-foreground">
                    Valor <span className="line-through">{value}</span>
                  </span>
                </div>
                <h3 className="mt-2 font-serif text-lg font-bold text-foreground">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
