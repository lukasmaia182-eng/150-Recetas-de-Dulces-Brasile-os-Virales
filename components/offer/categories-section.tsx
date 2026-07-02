import Image from 'next/image'

const categories = [
  {
    img: '/dulces/bolis.png',
    title: 'Bolis Brasileños Gourmet',
    text: 'Sabores cremosos, frutales, rellenos y premium inspirados en los geladinhos brasileños.',
    examples:
      'Ejemplos: Chocolate cremoso, fresa con leche, coco, maracuyá, Oreo y nido con fresa.',
  },
  {
    img: '/dulces/brigadeiros.png',
    title: 'Brigadeiros Brasileños',
    text: 'Dulces tradicionales de Brasil en versiones simples, gourmet y rellenas.',
    examples: 'Ejemplos: Chocolate, coco, leche en polvo, fresa, café, Oreo y pistache.',
  },
  {
    img: '/dulces/vaso.png',
    title: 'Pasteles en Vaso Estilo Brasil',
    text: 'Versiones individuales inspiradas en los bolos de pote brasileños.',
    examples:
      'Ejemplos: Chocolate con crema, fresa con vainilla, zanahoria con chocolate, tres leches brasileño.',
  },
  {
    img: '/dulces/tartaletas.png',
    title: 'Tartaletas Gourmet',
    text: 'Tortitas dulces individuales, bonitas y fáciles de vender por unidad.',
    examples: 'Ejemplos: Limón, chocolate, fresa, maracuyá, dulce de leche y coco.',
  },
  {
    img: '/dulces/postres.png',
    title: 'Postres Fríos para Vender',
    text: 'Postres cremosos montados en vaso, copa o recipiente individual.',
    examples:
      'Ejemplos: Mousse de maracuyá, pavé brasileño, crema de coco, chocolate frío y postre de fresa.',
  },
  {
    img: '/dulces/combos.png',
    title: 'Combos y Kits Dulces',
    text: 'Ideas para vender más por pedido y aumentar el valor de cada compra.',
    examples:
      'Ejemplos: Kit degustación, caja de brigadeiros, combo de bolis, pack familiar y menú semanal.',
  },
]

export function CategoriesSection() {
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5">
        <div className="text-center">
          <h2 className="font-serif text-3xl font-black text-balance text-foreground sm:text-4xl">
            Dulces organizados para que empieces más rápido
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
            6 categorías con 150 opciones para todos los gustos y presupuestos.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <article
              key={cat.title}
              className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <Image
                  src={cat.img || '/placeholder.svg'}
                  alt={cat.title}
                  width={480}
                  height={360}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl font-bold text-foreground">{cat.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{cat.text}</p>
                <p className="mt-3 text-sm font-semibold text-primary">{cat.examples}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
