import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata = {
  title: 'Las Decisiones Más Importantes de Tu Vida | Evento Juvenil',
  description:
    'Evento juvenil - Las decisiones más importantes de tu vida. Sábado 28 de febrero, 6:00 PM. Iglesia Cristiana Monte Sion, Oaxaca.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="font-sans antialiased bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
        {children}
        <Analytics />
      </body>
    </html>
  )
}