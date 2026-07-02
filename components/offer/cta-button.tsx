'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'

const CHECKOUT_URL = 'https://pay.hotmart.com/A102621817B?off=dmpcgxgh&checkoutMode=10'

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

export function CtaButton({
  children,
  className,
  href = CHECKOUT_URL,
}: {
  children: React.ReactNode
  className?: string
  href?: string
}) {
  function handleClick() {
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      window.fbq('track', 'InitiateCheckout')
    }
  }

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={cn(
        'inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-center text-base font-extrabold text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:scale-[1.02] active:scale-[0.99] sm:text-lg',
        className,
      )}
    >
      {children}
    </Link>
  )
}
