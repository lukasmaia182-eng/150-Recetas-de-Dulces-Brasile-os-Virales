import Image from 'next/image'
import { CircleDollarSign, ClipboardList, Sparkles, Store } from 'lucide-react'
import { CtaButton } from './cta-button'

const features = [
  {
    icon: ClipboardList,
    title: 'Recetas listas',
    text: 'No necesitas inventar sabores ni probar combinaciones al azar.',
  },
  {
    icon: CircleDollarSign,
    title: 'Bajo costo inicial',
    text: 'Puedes comenzar con ingredientes simples y preparar pequeñas cantidades.',
  },
  {
    icon: Sparkles,
    title: 'Dulces diferentes',
    text: 'Ofrece algo distinto a lo que todos venden en tu zona.',
  },
  {
    icon: Store,
    title: 'Fácil de vender',
    text: 'Ideal para ofrecer por WhatsApp, en tu colonia, escuela, trabajo o por pedidos.',
  },
]

export function SolutionSection() {
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-2">
        <div>
          <h2 className="font-serif text-3xl font-black text-balance text-foreground sm:text-4xl">
            Recetas brasileñas listas para preparar dulces bonitos y vender desde casa
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Con este paquete digital recibes 150 recetas organizadas de dulces brasileños virales,
            pensadas para ayudarte a preparar productos llamativos, fáciles de ofrecer y con buena
            presentación.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {features.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <span className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-4 font-serif text-lg font-bold text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <CtaButton className="w-full sm:w-auto">Quiero Recibir las 150 Recetas Ahora</CtaButton>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="overflow-hidden rounded-3xl shadow-2xl shadow-primary/20 ring-1 ring-border">
            <Image
              src="/dulces/mockup.png"
              alt="Mockup del recetario digital en celular"
              width={560}
              height={560}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
