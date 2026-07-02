import Image from 'next/image'
import { Check, Sparkles, Star } from 'lucide-react'
import { CtaButton } from './cta-button'
import { ScarcityBar } from './scarcity-bar'
import { FlagsBackdrop } from './flags-backdrop'

const benefits = [
  '150 recetas listas para usar',
  'Dulces brasileños diferentes y llamativos',
  'Ideal para vender desde casa, por WhatsApp o en tu colonia',
  'Recetas simples con ingredientes fáciles de encontrar',
  'Acceso digital inmediato',
]

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[oklch(0.97_0.03_60)] via-[oklch(0.95_0.04_30)] to-[oklch(0.93_0.05_20)]">
      <FlagsBackdrop />
      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 lg:grid-cols-2 lg:py-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-wide text-primary">
            <Sparkles className="size-4" />
            Oferta especial por tiempo limitado
          </span>

          <h1 className="mt-6 font-serif text-4xl font-black leading-tight text-balance text-foreground sm:text-5xl lg:text-6xl">
            150 Recetas de <span className="text-primary">Postres Brasileños</span> Virales que te
            Harán Ganar Dinero esta Semana
          </h1>
          <p className="mt-4 font-serif text-xl italic text-foreground/80 sm:text-2xl">
            Prepáralos desde casa, véndelos y empieza a ganar tu propio dinero
          </p>

          <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Descubre bolis brasileños, brigadeiros, pasteles en vaso, tartaletas gourmet y postres
            fríos con recetas listas, ingredientes simples y combinaciones fáciles para vender sin
            crear nada desde cero.
          </p>

          <ul className="mt-8 space-y-3">
            {benefits.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                  <Check className="size-4" strokeWidth={3} />
                </span>
                <span className="text-sm font-semibold text-foreground/90 sm:text-base">{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-9">
            <CtaButton className="w-full sm:w-auto">Quiero Recibir las 150 Recetas Ahora</CtaButton>
            <p className="mt-3 text-sm text-muted-foreground">Acceso inmediato al material digital</p>
            <ScarcityBar />
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-3xl shadow-2xl shadow-primary/20 ring-1 ring-white/40">
            <Image
              src="/dulces/hero.png"
              alt="Variedad de dulces brasileños gourmet"
              width={720}
              height={720}
              priority
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-4 left-4 flex items-center gap-2 rounded-full bg-card px-4 py-2 shadow-lg sm:left-8">
            <span className="flex text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-current" />
              ))}
            </span>
            <span className="text-sm font-bold text-foreground">Sabor brasileño</span>
          </div>
        </div>
      </div>
    </section>
  )
}
