import createIntlMiddleware from 'next-intl/middleware';

export default createIntlMiddleware({
  locales: ['es', 'en'],
  defaultLocale: 'es'
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};