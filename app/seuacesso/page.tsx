import type { Metadata } from 'next'
import { AccessDashboard } from '@/components/access/access-dashboard'

export const metadata: Metadata = {
  title: 'Tu Acceso | 150 Recetas de Postres Brasileños',
  description:
    'Área de miembros con las 150 recetas de postres brasileños y los 5 bonos incluidos.',
}

export default function SeuAcessoPage() {
  return <AccessDashboard />
}
