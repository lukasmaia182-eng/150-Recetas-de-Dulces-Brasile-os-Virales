import { CtaButton } from './cta-button'

export function FinalCta() {
  return (
    <section className="bg-gradient-to-br from-[oklch(0.95_0.04_30)] to-[oklch(0.92_0.06_20)] py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-5 text-center">
        <h2 className="mx-auto max-w-2xl font-serif text-3xl font-black text-balance text-foreground sm:text-4xl lg:text-5xl">
          Empieza hoy con 150 recetas brasileñas listas para preparar y vender
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          No pierdas más tiempo pensando qué vender o qué sabores preparar. Recibe el paquete
          completo y empieza con una idea diferente, deliciosa y fácil de ofrecer.
        </p>
        <div className="mt-9">
          <CtaButton className="w-full sm:w-auto">Quiero Mis 150 Recetas Ahora</CtaButton>
          <p className="mt-3 text-sm text-muted-foreground">
            Producto digital · Acceso inmediato · Garantía de 7 días
          </p>
        </div>
      </div>
    </section>
  )
}

export function SiteFooter() {
  return (
    <footer className="bg-[oklch(0.32_0.06_40)] py-10 text-center text-[oklch(0.97_0.02_60)]/80">
      <div className="mx-auto max-w-3xl px-5">
        <p className="text-sm">
          © 2026 Recetas de Dulces Brasileños. Todos los derechos reservados.
        </p>
        <p className="mt-2 text-sm">
          Producto digital. Acceso inmediato. Garantía de 7 días.
        </p>
      </div>
    </footer>
  )
}
