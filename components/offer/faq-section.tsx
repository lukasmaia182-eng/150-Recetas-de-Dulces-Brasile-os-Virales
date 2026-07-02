'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const faqs = [
  {
    q: '¿Es un curso?',
    a: 'No. Es un paquete digital con recetas listas, ideas prácticas y materiales simples para preparar dulces desde casa.',
  },
  {
    q: '¿Necesito experiencia en cocina?',
    a: 'No. Las recetas están explicadas de forma sencilla, con pasos claros e ingredientes fáciles de encontrar, para que cualquier persona pueda prepararlas.',
  },
  {
    q: '¿Cómo recibo el material?',
    a: 'El acceso es digital e inmediato. Después de tu compra recibes el material para verlo en tu celular o computadora cuando quieras.',
  },
  {
    q: '¿Las recetas sirven para vender?',
    a: 'Sí. Están pensadas para preparar dulces bonitos y llamativos, ideales para ofrecer por unidad, por pedido o en combos.',
  },
  {
    q: '¿Son dulces mexicanos?',
    a: 'Son dulces brasileños virales adaptados con ingredientes simples que puedes encontrar fácilmente para venderlos en tu zona.',
  },
  {
    q: '¿Necesito invertir mucho?',
    a: 'No. Puedes empezar con ingredientes simples y preparar pequeñas cantidades, aumentando la producción a medida que vendes.',
  },
  {
    q: '¿Incluye ayuda para calcular precios?',
    a: 'Sí. Entre los bonos recibes una calculadora simple para definir el precio por unidad, por combo y tu margen de ganancia.',
  },
]

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="font-serif text-base font-bold text-foreground sm:text-lg">{q}</span>
        <ChevronDown
          className={cn(
            'size-5 shrink-0 text-primary transition-transform',
            open && 'rotate-180',
          )}
        />
      </button>
      {open && (
        <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">{a}</p>
      )}
    </div>
  )
}

export function FaqSection() {
  return (
    <section className="bg-secondary/40 py-16 sm:py-20">
      <div className="mx-auto max-w-2xl px-5">
        <h2 className="text-center font-serif text-3xl font-black text-balance text-foreground sm:text-4xl">
          Preguntas frecuentes
        </h2>
        <div className="mt-10 space-y-3">
          {faqs.map((f) => (
            <FaqItem key={f.q} q={f.q} a={f.a} />
          ))}
        </div>
      </div>
    </section>
  )
}
