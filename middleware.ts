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
    '/conf', // conservar la regla previa si hace falta
]

export function middleware(request: NextRequest) {
    const url = request.nextUrl.clone()

    // normalizar sin slash final (salvo "/")
    let pathname = url.pathname
    if (pathname.endsWith('/') && pathname !== '/') {
        pathname = pathname.slice(0, -1)
    }

    // si la ruta es exactamente una de las listadas o está dentro de esa subruta, redirige a "/"
    for (const route of redirectRoutes) {
        if (pathname === route || pathname.startsWith(route + '/')) {
            url.pathname = '/'
            return NextResponse.redirect(url)
        }
    }

    return NextResponse.next()
}

// Aplica el middleware solo a las rutas listadas y sus subrutas
export const config = {
    matcher: [
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