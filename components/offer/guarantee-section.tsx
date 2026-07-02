import { ShieldCheck } from 'lucide-react'

export function GuaranteeSection() {
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-2xl px-5">
        <div className="flex flex-col items-center gap-6 rounded-3xl border border-accent bg-accent/20 p-8 text-center sm:flex-row sm:text-left">
          <span className="flex size-20 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
            <ShieldCheck className="size-10" />
          </span>
          <div>
            <h2 className="font-serif text-2xl font-black text-foreground">Garantía de 7 días</h2>
            <p className="mt-2 text-base leading-relaxed text-muted-foreground">
              Prueba el material con calma. Si ves que no es para ti, puedes solicitar la devolución
              dentro de 7 días.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
