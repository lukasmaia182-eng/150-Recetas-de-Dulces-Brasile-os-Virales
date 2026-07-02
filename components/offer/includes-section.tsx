import { Check } from 'lucide-react'

const items = [
  '150 recetas de dulces brasileños virales',
  'Bolis brasileños gourmet',
  'Brigadeiros clásicos y gourmet',
  'Pasteles en vaso estilo Brasil',
  'Tartaletas gourmet para vender',
  'Postres fríos fáciles de montar',
  'Ideas de combos y kits dulces',
  'Acceso digital inmediato',
]

export function IncludesSection() {
  return (
    <section className="bg-secondary/40 py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-5 text-center">
        <h2 className="font-serif text-3xl font-black text-balance text-foreground sm:text-4xl">
          ¿Qué incluye el paquete?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
          Todo lo que necesitas para empezar hoy mismo, en tu celular o computadora.
        </p>

        <ul className="mx-auto mt-10 grid max-w-2xl gap-3 text-left sm:grid-cols-2">
          {items.map((item) => (
            <li
              key={item}
              className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm"
            >
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                <Check className="size-4" strokeWidth={3} />
              </span>
              <span className="text-sm font-semibold text-foreground/90">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
