'use client'

import { Flame, ShoppingBag, Users } from 'lucide-react'
import { useEffect, useState } from 'react'

const compradoras = [
  'María G. acaba de comprar en Ciudad de México',
  'Guadalupe R. acaba de comprar en Guadalajara',
  'Alejandra M. acaba de comprar en Monterrey',
  'Fernanda L. acaba de comprar en Puebla',
  'Valeria S. acaba de comprar en Tijuana',
  'Daniela H. acaba de comprar en León',
  'Gabriela P. acaba de comprar en Querétaro',
  'Andrea C. acaba de comprar en Mérida',
  'Karla V. acaba de comprar en Toluca',
  'Paola T. acaba de comprar en Cancún',
  'Regina F. acaba de comprar en San Luis Potosí',
  'Lucía N. acaba de comprar en Aguascalientes',
  'Mariana D. acaba de comprar en Culiacán',
  'Ximena B. acaba de comprar en Chihuahua',
  'Sofía A. acaba de comprar en Morelia',
]

export function ScarcityBar() {
  // começa em 49% e vai enchendo para reforçar a escassez
  const [percent, setPercent] = useState(49)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 97) return prev
        // sobe de forma irregular, como se pessoas fossem comprando
        const next = prev + Math.random() * 1.4
        return Math.min(next, 97)
      })
      // avança para a próxima compradora da lista
      setIndex((prev) => (prev + 1) % compradoras.length)
    }, 7500)

    return () => clearInterval(interval)
  }, [])

  const vagasRestantes = Math.max(3, Math.round(100 - percent))

  return (
    <div className="mt-6 rounded-2xl border border-primary/20 bg-card/70 p-4 shadow-sm backdrop-blur">
      <div className="mb-2 flex items-center justify-between gap-3">
        <span className="flex items-center gap-1.5 text-sm font-bold text-primary">
          <Flame className="size-4" />
          Cupos casi agotados
        </span>
        <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
          <Users className="size-3.5" />
          Solo quedan {vagasRestantes} cupos
        </span>
      </div>

      <div
        className="h-3 w-full overflow-hidden rounded-full bg-secondary"
        role="progressbar"
        aria-valuenow={Math.round(percent)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Cupos disponibles"
      >
        <div
          className="h-full rounded-full bg-primary transition-all duration-1000 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>

      <p className="mt-2 text-xs text-muted-foreground">
        <span className="font-bold text-foreground">{Math.round(percent)}%</span> de los cupos de
        hoy ya fueron tomados por otras mujeres.
      </p>

      <div
        key={index}
        className="mt-3 flex items-center gap-2 rounded-xl bg-accent/40 px-3 py-2 text-left"
        aria-live="polite"
      >
        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
          <ShoppingBag className="size-3.5" />
        </span>
        <p className="text-xs font-semibold text-foreground/80">{compradoras[index]}</p>
      </div>
    </div>
  )
}
