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

export function MiAccesoPage() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(ACCESS_URL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
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
                <Check className="w-4 h-4 text-accent-foreground" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
          {copied && (
            <p className="text-xs text-accent-foreground text-center -mt-2 font-medium">
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
          <a
            href="/api/pdf-acesso"
            download="tu-acceso-150-recetas.pdf"
            className="flex items-center justify-center gap-2 w-full bg-secondary text-secondary-foreground font-bold rounded-xl py-3 px-5 text-sm hover:bg-secondary/80 active:scale-95 transition-all border border-border"
          >
            <Download className="w-4 h-4" />
            Descargar PDF de acceso
          </a>
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
