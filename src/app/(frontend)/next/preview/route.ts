import { draftMode } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const secret = searchParams.get('previewSecret') || ''
  const path = searchParams.get('path') || '/'

  const ENV_SECRET =
    process.env.PAYLOAD_PUBLIC_PREVIEW_SECRET ||
    process.env.NEXT_PUBLIC_PAYLOAD_PREVIEW_SECRET ||
    process.env.PREVIEW_SECRET ||
    ''

  if (!ENV_SECRET || secret !== ENV_SECRET) {
    return new NextResponse('Invalid preview secret', { status: 401 })
  }

  ;(await draftMode()).enable()
  // evita cache y redirige a la ruta real (ej: /ai)
  return NextResponse.redirect(new URL(path, req.url), {
    headers: { 'Cache-Control': 'no-store' },
  })
}
