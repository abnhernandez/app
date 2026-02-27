import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Las Decisiones Más Importantes de Tu Vida | Evento Juvenil',
  description:
    'Evento juvenil - Las decisiones más importantes de tu vida. Sábado 28 de febrero, 6:00 PM. Iglesia Cristiana Monte Sion, Oaxaca.',
  applicationName: 'Evento Juvenil Monte Sion',
  icons: {
    icon: '/favicon.ico',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#d5b466',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="min-h-screen font-sans antialiased bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
        {children}
        <Analytics />
      </body>
    </html>
  )
}