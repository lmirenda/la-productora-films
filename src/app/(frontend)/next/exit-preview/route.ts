import { draftMode } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  ;(await draftMode()).disable()
  const url = new URL(req.url)
  const redirect = url.searchParams.get('redirect') || '/'
  return NextResponse.redirect(new URL(redirect, req.url))
}
