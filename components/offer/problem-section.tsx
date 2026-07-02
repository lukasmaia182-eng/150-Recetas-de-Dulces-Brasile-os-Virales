import { X } from 'lucide-react'

const problems = [
  'No sabes qué vender para empezar',
  'Tienes poco dinero para invertir',
  'No quieres crear recetas desde cero',
  'Tienes miedo de preparar algo que nadie compre',
  'Quieres algo simple, bonito y fácil de ofrecer',
  'Necesitas una idea práctica para vender desde casa',
]

export function ProblemSection() {
  return (
    <section className="bg-secondary/40 py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-5 text-center">
        <h2 className="mx-auto max-w-3xl font-serif text-3xl font-black text-balance text-foreground sm:text-4xl">
          ¿Quieres ganar dinero extra, pero no sabes qué vender?
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Muchas mujeres quieren empezar algo desde casa, pero se detienen porque no saben qué
          producto ofrecer, tienen miedo de invertir mucho o no quieren perder tiempo probando
          recetas que no funcionan.
        </p>

        <ul className="mx-auto mt-10 grid max-w-2xl gap-3 text-left sm:grid-cols-2">
          {problems.map((p) => (
            <li
              key={p}
              className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm"
            >
              <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                <X className="size-4" strokeWidth={3} />
              </span>
              <span className="text-sm font-semibold text-foreground/90">{p}</span>
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-10 max-w-2xl text-base font-semibold leading-relaxed text-foreground/90 sm:text-lg">
          Por eso este paquete reúne recetas brasileñas listas para que puedas preparar dulces
          diferentes, deliciosos y con apariencia más profesional.
        </p>
      </div>
    </section>
  )
}
