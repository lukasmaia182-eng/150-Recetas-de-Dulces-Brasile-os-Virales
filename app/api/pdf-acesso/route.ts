import { renderToStream } from '@react-pdf/renderer'
import { AccessPdfDocument } from '@/components/access/access-pdf-document'
import { createElement } from 'react'

export async function GET() {
  const stream = await renderToStream(createElement(AccessPdfDocument))

  const chunks: Uint8Array[] = []
  for await (const chunk of stream as AsyncIterable<Uint8Array>) {
    chunks.push(chunk)
  }
  const buffer = Buffer.concat(chunks)

  return new Response(buffer, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition':
        'attachment; filename="tu-acceso-150-recetas.pdf"',
      'Content-Length': String(buffer.length),
    },
  })
}
