import { Check, Clock, Gift, Lock, ShieldCheck, Zap } from 'lucide-react'
import Image from 'next/image'
import { CtaButton } from './cta-button'

const items = [
  { name: '150 Recetas de Dulces Brasileños Virales', value: 'R$97', bonus: false },
  { name: 'Menú Pronto de Dulces Brasileños', value: 'R$27', bonus: true },
  { name: 'Lista de Ingredientes Económicos', value: 'R$27', bonus: true },
  { name: 'Calculadora Simple de Precio', value: 'R$47', bonus: true },
  { name: 'Etiquetas Listas para Imprimir', value: 'R$27', bonus: true },
  { name: 'Ideas de Combos para Vender Más', value: 'R$37', bonus: true },
]

const benefits = [
  'Recetas listas para vender',
  'Ingredientes simples y baratos',
  'Acceso digital inmediato',
]

const categories = [
  {
    name: 'Bolis Brasileños Gourmet',
    desc: 'Sabores cremosos, frutales, rellenos y premium inspirados en los geladinhos brasileños.',
    examples: 'Chocolate cremoso, fresa con leche, coco, maracuyá, Oreo y nido con fresa.',
  },
  {
    name: 'Brigadeiros Brasileños',
    desc: 'Dulces tradicionales de Brasil en versiones simples, gourmet y rellenas.',
    examples: 'Chocolate, coco, leche en polvo, fresa, café, Oreo y pistache.',
  },
  {
    name: 'Pasteles en Vaso Estilo Brasil',
    desc: 'Versiones individuales inspiradas en los bolos de pote brasileños.',
    examples: 'Chocolate con crema, fresa con vainilla, zanahoria con chocolate, tres leches brasileño.',
  },
  {
    name: 'Tartaletas Gourmet',
    desc: 'Tortitas dulces individuales, bonitas y fáciles de vender por unidad.',
    examples: 'Limón, chocolate, fresa, maracuyá, dulce de leche y coco.',
  },
  {
    name: 'Postres Fríos para Vender',
    desc: 'Postres cremosos montados en vaso, copa o recipiente individual.',
    examples: 'Mousse de maracuyá, pavé brasileño, crema de coco, chocolate frío y postre de fresa.',
  },
  {
    name: 'Combos y Kits Dulces',
    desc: 'Ideas para vender más por pedido y aumentar el valor de cada compra.',
    examples: 'Kit degustación, caja de brigadeiros, combo de bolis, pack familiar y menú semanal.',
  },
]

const seals = [
  { icon: Lock, text: 'Compra segura' },
  { icon: Zap, text: 'Acceso inmediato' },
  { icon: ShieldCheck, text: 'Garantía de 7 días' },
]

export function PricingSection() {
  return (
    <section id="comprar" className="bg-secondary/40 py-16 sm:py-20">
      <div className="mx-auto max-w-2xl px-5 text-center">
        <h2 className="font-serif text-3xl font-black text-balance text-foreground sm:text-4xl">
          Llévate hoy el paquete completo
        </h2>
        <p className="mt-4 text-base text-muted-foreground sm:text-lg">
          Todo incluido, un solo pago, acceso inmediato.
        </p>

        <div className="mt-10 overflow-hidden rounded-3xl border border-border bg-card shadow-xl">
          {/* imagem do prato de doces */}
          <div className="relative aspect-[4/3] w-full bg-secondary/40">
            <Image
              src="/dulces/plato.png"
              alt="Plato con geladinhos gourmet, brigadeiros y bolos de pote brasileños"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 640px"
              priority
            />
          </div>

          <div className="flex items-center justify-center gap-2 bg-primary px-6 py-3 text-sm font-bold text-primary-foreground">
            <Clock className="size-4" />
            OFERTA POR TIEMPO LIMITADO
          </div>

          <div className="p-6 sm:p-8">
            {/* benefícios com check */}
            <ul className="mx-auto mb-8 grid max-w-md gap-3 text-left sm:grid-cols-1">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                    <Check className="size-4" strokeWidth={3} />
                  </span>
                  <span className="text-base font-bold text-foreground">{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="mb-8 rounded-2xl border border-border bg-secondary/40 p-5 text-left">
              <p className="mb-4 text-center text-sm font-black uppercase tracking-wide text-primary">
                150 recetas divididas en 6 categorías
              </p>
              <ul className="space-y-4">
                {categories.map((cat) => (
                  <li
                    key={cat.name}
                    className="flex gap-3 border-b border-dashed border-border pb-4 last:border-0 last:pb-0"
                  >
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                      <Check className="size-4" strokeWidth={3} />
                    </span>
                    <div>
                      <p className="text-sm font-black text-foreground">{cat.name}</p>
                      <p className="mt-0.5 text-sm text-muted-foreground">{cat.desc}</p>
                      <p className="mt-1 text-xs font-semibold text-foreground/70">
                        <span className="font-black text-primary">Ejemplos:</span> {cat.examples}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <ul className="space-y-3 text-left">
              {items.map((item) => (
                <li
                  key={item.name}
                  className="flex items-center justify-between gap-4 border-b border-dashed border-border pb-3 last:border-0"
                >
                  <span className="flex items-center gap-2 text-sm font-semibold text-foreground/90">
                    {item.bonus && (
                      <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-accent-foreground">
                        <Gift className="size-3" />
                        Bono
                      </span>
                    )}
                    {item.name}
                  </span>
                  <span className="shrink-0 text-sm font-bold text-muted-foreground line-through">
                    {item.value}
                  </span>
                </li>
              ))}
            </ul>

            {/* badge de preço estilo anúncio */}
            <div className="mt-8 rounded-3xl bg-deal p-6 text-deal-foreground shadow-lg">
              <p className="text-base font-bold text-deal-foreground/70">
                De <span className="text-xl line-through">R$262</span>
              </p>
              <p className="mt-1 text-sm font-black uppercase tracking-widest text-primary-foreground/90">
                por solo
              </p>
              <p className="font-serif text-7xl font-black leading-none text-highlight">$92.80</p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-highlight px-4 py-1.5 text-xs font-black uppercase tracking-wide text-highlight-foreground">
                <Clock className="size-4" />
                Oferta por tiempo limitado
              </div>
            </div>

            <p className="mt-4 text-sm text-muted-foreground">
              Pago único · Acceso digital inmediato · Material listo para usar
            </p>

            <CtaButton className="mt-6 w-full text-base sm:text-lg">
              ¡Quiero mis 150 recetas ahora!
            </CtaButton>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              {seals.map(({ icon: Icon, text }) => (
                <span
                  key={text}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground"
                >
                  <Icon className="size-4 text-accent-foreground" />
                  {text}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
