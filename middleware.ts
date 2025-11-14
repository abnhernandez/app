import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const url = request.nextUrl.clone()

    // Si la ruta es /conf o empieza por /conf/ redirige a /
    if (url.pathname === '/conf' || url.pathname.startsWith('/conf/')) {
        url.pathname = '/'
        return NextResponse.redirect(url)
    }

    return NextResponse.next()
}

// Aplica el middleware solo a /conf y subrutas
export const config = {
    matcher: ['/conf', '/conf/:path*'],
}