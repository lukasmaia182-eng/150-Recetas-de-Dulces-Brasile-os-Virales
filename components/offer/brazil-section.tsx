import { Camera, MessageCircle, Package, Sparkles } from 'lucide-react'

const cards = [
  { icon: Sparkles, text: 'Diferentes a los dulces de siempre' },
  { icon: Camera, text: 'Bonitos para fotos y redes sociales' },
  { icon: MessageCircle, text: 'Fáciles de ofrecer por WhatsApp' },
  { icon: Package, text: 'Perfectos para vender por unidad o en combos' },
]

export function BrazilSection() {
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-5 text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-xs font-bold uppercase tracking-wide text-accent-foreground">
          🇧🇷 De Brasil a México
        </span>
        <h2 className="mx-auto mt-6 max-w-3xl font-serif text-3xl font-black text-balance text-foreground sm:text-4xl">
          Los dulces que se hicieron populares en Brasil, ahora para vender en México
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          En Brasil, muchos dulces simples se volvieron muy buscados por su sabor, apariencia bonita
          y facilidad para vender por unidad, por pedido o en combos. Ahora tú puedes tener esas
          ideas organizadas en un recetario digital listo para preparar desde casa.
        </p>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card p-6 text-center shadow-sm"
            >
              <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon className="size-6" />
              </span>
              <p className="text-sm font-semibold text-foreground/90">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
