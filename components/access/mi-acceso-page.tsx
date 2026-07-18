'use client'

import { useState } from 'react'
import { Download, CheckCircle, MessageCircle, ExternalLink, Copy, Check } from 'lucide-react'

const ACCESS_URL =
  'https://v0-150-recetas-de-postres-brasilenos.vercel.app/seuacesso'

const WHATSAPP_SAVE_URL = `https://wa.me/?text=${encodeURIComponent(
  '🍫 Mi acceso a 150 Recetas de Dulces Brasileños:\n\n' +
    ACCESS_URL +
    '\n\n⚠️ Guardo este enlace aqui para no perderlo.'
)}`

async function generateAndDownloadPDF() {
  const { jsPDF } = await import('jspdf')
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })

  const pageW = 210
  const pageH = 297
  const margin = 20

  // Background
  doc.setFillColor(255, 248, 245)
  doc.rect(0, 0, pageW, pageH, 'F')

  // Top red bar
  doc.setFillColor(192, 57, 43)
  doc.rect(0, 0, pageW, 8, 'F')

  // Bottom red bar
  doc.setFillColor(192, 57, 43)
  doc.rect(0, pageH - 8, pageW, 8, 'F')

  let y = 22

  // Badge
  doc.setFillColor(192, 57, 43)
  doc.roundedRect(pageW / 2 - 40, y, 80, 10, 3, 3, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.text('ACCESO CONFIRMADO', pageW / 2, y + 6.5, { align: 'center' })

  y += 18

  // Title
  doc.setTextColor(26, 10, 0)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(22)
  doc.text('150 Recetas de Dulces', pageW / 2, y, { align: 'center' })
  y += 9
  doc.setTextColor(192, 57, 43)
  doc.text('Brasileños Virales', pageW / 2, y, { align: 'center' })

  y += 6
  // Divider line
  doc.setDrawColor(192, 57, 43)
  doc.setLineWidth(1)
  doc.line(pageW / 2 - 18, y, pageW / 2 + 18, y)

  y += 10

  // Main card
  doc.setFillColor(255, 255, 255)
  doc.setDrawColor(240, 217, 213)
  doc.setLineWidth(0.5)
  doc.roundedRect(margin, y, pageW - margin * 2, 68, 4, 4, 'FD')

  y += 8
  doc.setTextColor(26, 10, 0)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)
  doc.text('Haz clic en el enlace para acceder a tu contenido', pageW / 2, y, { align: 'center' })

  y += 6
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.setTextColor(107, 74, 66)
  const subtitle = doc.splitTextToSize(
    'Todas tus 150 recetas + 5 bonos exclusivos te esperan. El acceso es inmediato.',
    pageW - margin * 2 - 16
  )
  doc.text(subtitle, pageW / 2, y, { align: 'center' })

  y += 10

  // URL box
  doc.setFillColor(255, 240, 236)
  doc.setDrawColor(245, 198, 187)
  doc.setLineWidth(0.5)
  doc.roundedRect(margin + 6, y, pageW - margin * 2 - 12, 14, 3, 3, 'FD')

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(7)
  doc.setTextColor(160, 96, 90)
  doc.text('TU ENLACE DE ACCESO', margin + 12, y + 5)

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.setTextColor(192, 57, 43)
  doc.textWithLink(ACCESS_URL, margin + 12, y + 11, { url: ACCESS_URL })

  y += 20

  // CTA Button
  doc.setFillColor(192, 57, 43)
  doc.roundedRect(margin + 6, y, pageW - margin * 2 - 12, 14, 3, 3, 'F')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.setTextColor(255, 255, 255)
  doc.textWithLink('ACCEDER A MIS RECETAS AHORA', pageW / 2, y + 9, {
    url: ACCESS_URL,
    align: 'center',
  })

  y += 22

  // Warning card
  doc.setFillColor(255, 251, 230)
  doc.setDrawColor(245, 225, 153)
  doc.setLineWidth(0.5)
  doc.roundedRect(margin, y, pageW - margin * 2, 26, 4, 4, 'FD')

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.setTextColor(122, 88, 0)
  doc.text('⚠  Importante: Guarda este enlace', margin + 8, y + 8)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(122, 88, 0)
  const warningText = doc.splitTextToSize(
    'Este es tu enlace de acceso personal. Guarda este PDF o el enlace en un lugar seguro para no perder el acceso. No compartas este enlace con otras personas.',
    pageW - margin * 2 - 16
  )
  doc.text(warningText, margin + 8, y + 15)

  y += 32

  // WhatsApp card
  doc.setFillColor(237, 250, 241)
  doc.setDrawColor(168, 230, 190)
  doc.setLineWidth(0.5)
  doc.roundedRect(margin, y, pageW - margin * 2, 40, 4, 4, 'FD')

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.setTextColor(26, 102, 53)
  doc.text('Guarda tu acceso en WhatsApp', pageW / 2, y + 9, { align: 'center' })

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(26, 102, 53)
  const waTxt = doc.splitTextToSize(
    'La forma más fácil de no perder tu enlace es guardarlo en WhatsApp. Sigue estos pasos:',
    pageW - margin * 2 - 16
  )
  doc.text(waTxt, pageW / 2, y + 16, { align: 'center' })

  doc.setFontSize(9)
  doc.text('1. Abre WhatsApp y entra a tus propios mensajes', margin + 8, y + 25)
  doc.text(`2. Pega el enlace: ${ACCESS_URL}`, margin + 8, y + 31)
  doc.text('3. Envialo y ya lo tendras siempre en tu telefono', margin + 8, y + 37)

  y += 48

  // Footer
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(176, 144, 128)
  doc.text(
    '© 150 Recetas de Dulces Brasileños Virales · Acceso personal intransferible',
    pageW / 2,
    y,
    { align: 'center' }
  )

  doc.save('tu-acceso-150-recetas.pdf')
}

export function MiAccesoPage() {
  const [copied, setCopied] = useState(false)
  const [downloading, setDownloading] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(ACCESS_URL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const handleDownload = async () => {
    setDownloading(true)
    try {
      await generateAndDownloadPDF()
    } finally {
      setDownloading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-12">
      {/* Top accent bar */}
      <div className="fixed top-0 left-0 w-full h-1.5 bg-primary" />

      <div className="w-full max-w-md flex flex-col gap-6">
        {/* Header */}
        <div className="text-center">
          <span className="inline-block bg-primary text-primary-foreground text-xs font-bold tracking-widest px-4 py-1.5 rounded-full mb-4 uppercase">
            Acceso confirmado
          </span>
          <h1 className="font-serif text-3xl font-bold text-foreground leading-tight mb-2">
            150 Recetas de{' '}
            <span className="text-primary">Dulces Brasileños</span>
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Tu contenido completo está listo. Accede ahora o guarda el enlace
            para verlo cuando quieras.
          </p>
        </div>

        {/* Main CTA Card */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <CheckCircle className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-bold text-foreground text-sm">
                Tu acceso está activado
              </p>
              <p className="text-muted-foreground text-xs">
                150 recetas + 5 bonos exclusivos
              </p>
            </div>
          </div>

          <a
            href={ACCESS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground font-bold rounded-xl py-4 px-6 text-base hover:opacity-90 active:scale-95 transition-all"
          >
            <ExternalLink className="w-5 h-5" />
            Acceder a mis recetas ahora
          </a>

          {/* URL display + copy */}
          <div className="bg-muted rounded-lg px-4 py-3 flex items-center gap-2">
            <span className="flex-1 text-xs text-muted-foreground truncate font-mono">
              {ACCESS_URL}
            </span>
            <button
              onClick={handleCopy}
              className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Copiar enlace"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-600" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
          {copied && (
            <p className="text-xs text-green-600 text-center -mt-2 font-medium">
              Enlace copiado al portapapeles
            </p>
          )}
        </div>

        {/* Warning */}
        <div className="bg-[#FFFBE6] border border-[#F5E199] rounded-2xl p-5 flex gap-3">
          <span className="text-xl shrink-0 mt-0.5" role="img" aria-label="advertencia">
            ⚠️
          </span>
          <div>
            <p className="font-bold text-[#7A5800] text-sm mb-1">
              ¡Guarda tu enlace de acceso!
            </p>
            <p className="text-[#7A5800] text-xs leading-relaxed">
              Este es tu enlace personal. Guárdalo para no perder el acceso a
              tus recetas. No lo compartas con otras personas.
            </p>
          </div>
        </div>

        {/* WhatsApp save */}
        <div className="bg-[#EDFAF1] border border-[#A8E6BE] rounded-2xl p-5 flex flex-col gap-3">
          <p className="font-bold text-[#1A6635] text-sm text-center">
            Guarda tu acceso en WhatsApp
          </p>
          <p className="text-[#1A6635] text-xs text-center leading-relaxed">
            La forma más fácil de no perder tu enlace es guardarlo directamente
            en WhatsApp, así lo tendrás siempre en tu teléfono.
          </p>
          <a
            href={WHATSAPP_SAVE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white font-bold rounded-xl py-3 px-5 text-sm hover:opacity-90 active:scale-95 transition-all"
          >
            <MessageCircle className="w-5 h-5" />
            Guardar enlace en WhatsApp
          </a>
        </div>

        {/* Download PDF */}
        <div className="bg-card border border-border rounded-2xl p-5 flex flex-col gap-3">
          <p className="font-bold text-foreground text-sm text-center">
            ¿Prefieres guardar en PDF?
          </p>
          <p className="text-muted-foreground text-xs text-center leading-relaxed">
            Descarga este documento con tu enlace de acceso para tenerlo
            guardado en tu dispositivo.
          </p>
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="flex items-center justify-center gap-2 w-full bg-secondary text-secondary-foreground font-bold rounded-xl py-3 px-5 text-sm hover:bg-secondary/80 active:scale-95 transition-all border border-border disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4" />
            {downloading ? 'Generando PDF...' : 'Descargar PDF de acceso'}
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground pb-4">
          © 150 Recetas de Dulces Brasileños Virales · Acceso personal
          intransferible
        </p>
      </div>

      <div className="fixed bottom-0 left-0 w-full h-1.5 bg-primary" />
    </main>
  )
}
