"use client"

import { YouVersionProvider } from "@youversion/platform-react-ui"

export default function Providers({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <YouVersionProvider
      appKey={process.env.BIBLE_API_KEY!}
      includeAuth={true}
      authRedirectUrl={process.env.NEXT_PUBLIC_REDIRECT_URI!}
    >
      {children}
    </YouVersionProvider>
  )
}