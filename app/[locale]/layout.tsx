import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';

export const metadata = {
  metadataBase: new URL("https://montesion.me"),
  title: {
    default: "Monte Sion Oaxaca",
    template: "%s | Monte Sion Oaxaca"
  },
  description: "Estableciendo el Reino de Dios",
  openGraph: {
    title: "Monte Sion Oaxaca",
    description: "Comunidad cristiana en Oaxaca",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630
      }
    ],
    locale: "es_MX",
    type: "website"
  },
  twitter: {
    card: "summary_large_image"
  }
};

export default async function LocaleLayout(props: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { children, params } = props;

  // Next.js 14+: params es un Promise
  const { locale } = await params;

  let messages;
  try {
    messages = (await import(`../../locales/${locale}.json`)).default;
  } catch {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className="bg-zinc-50 dark:bg-black font-sans">
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}