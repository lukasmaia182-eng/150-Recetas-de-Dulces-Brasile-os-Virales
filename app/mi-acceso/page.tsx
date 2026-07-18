import type { Metadata } from 'next'
import { MiAccesoPage } from '@/components/access/mi-acceso-page'

export const metadata: Metadata = {
  title: 'Tu Acceso PDF | 150 Recetas de Dulces Brasileños',
  description:
    'Descarga tu PDF de acceso con el enlace directo a las 150 recetas de dulces brasileños y 5 bonos exclusivos.',
}

export default function Page() {
  return <MiAccesoPage />
}
