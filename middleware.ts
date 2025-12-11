import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const redirectRoutes = [
    '/faq',
    '/links',
    '/conduct',
    '/privacy',
    '/talleres/pintura',
    '/planifica-visita',
    '/templos',
    '/primerpaso',
    '/terms',
    '/contact',
    '/oracion',
    '/presentation',
    '/donativos',
    '/conf',
]

export function middleware(request: NextRequest) {
    const url = request.nextUrl.clone()
    const pathname = url.pathname

    // --- 🔥 REDIRECCIÓN SOLO EN PRODUCCIÓN ---
    if (process.env.NODE_ENV === 'production') {
        if (pathname === '/') {
            url.pathname = '/peticion'
            return NextResponse.redirect(url)
        }
    }
    // ------------------------------------------

    // normalizar sin slash final (salvo "/")
    let normalized = pathname
    if (normalized.endsWith('/') && normalized !== '/') {
        normalized = normalized.slice(0, -1)
    }

    // reglas existentes
    for (const route of redirectRoutes) {
        if (normalized === route || normalized.startsWith(route + '/')) {
            url.pathname = '/'
            return NextResponse.redirect(url)
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/',
        '/faq',
        '/faq/:path*',
        '/links',
        '/links/:path*',
        '/conduct',
        '/conduct/:path*',
        '/privacy',
        '/privacy/:path*',
        '/talleres/pintura',
        '/talleres/pintura/:path*',
        '/planifica-visita',
        '/planifica-visita/:path*',
        '/templos',
        '/templos/:path*',
        '/primerpaso',
        '/primerpaso/:path*',
        '/terms',
        '/terms/:path*',
        '/contact',
        '/contact/:path*',
        '/oracion',
        '/oracion/:path*',
        '/presentation',
        '/presentation/:path*',
        '/donativos',
        '/donativos/:path*',
        '/conf',
        '/conf/:path*',
    ],
}