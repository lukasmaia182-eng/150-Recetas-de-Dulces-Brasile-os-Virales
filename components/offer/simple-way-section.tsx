import { Check } from 'lucide-react'
import { CtaButton } from './cta-button'

const points = [
  'No necesitas experiencia.',
  'No necesitas crear recetas.',
  'No necesitas invertir mucho.',
  'No necesitas vender lo mismo que todos.',
  'Solo eliges una receta, preparas y empiezas a ofrecer.',
]

export function SimpleWaySection() {
  return (
    <section className="bg-[oklch(0.32_0.06_40)] py-16 text-[oklch(0.97_0.02_60)] sm:py-20">
      <div className="mx-auto max-w-3xl px-5 text-center">
        <h2 className="font-serif text-3xl font-black text-balance sm:text-4xl">
          Una forma simple de empezar a vender algo diferente
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[oklch(0.97_0.02_60)]/75 sm:text-lg">
          Con las recetas listas, puedes preparar dulces brasileños con apariencia bonita, organizar
          tus sabores, crear combos y comenzar a ofrecerlos a familiares, vecinas, compañeras de
          trabajo, clientes por WhatsApp o personas de tu colonia.
        </p>

        <ul className="mx-auto mt-10 flex max-w-xl flex-col gap-3 text-left">
          {points.map((p) => (
            <li
              key={p}
              className="flex items-center gap-3 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10"
            >
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                <Check className="size-4" strokeWidth={3} />
              </span>
              <span className="text-sm font-semibold sm:text-base">{p}</span>
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <CtaButton className="w-full sm:w-auto">Quiero Empezar Hoy</CtaButton>
        </div>
      </div>
    </section>
  )
}
