import { createServerClient, type SetAllCookies } from "@supabase/ssr"
import { cookies } from "next/headers"
type CookiePayload = Parameters<SetAllCookies>[0][number]

export async function getSupabaseServer() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll().map((cookie) => ({
            name: cookie.name,
            value: cookie.value,
          }))
        },
        setAll(cookies: CookiePayload[]) {
          cookies.forEach(({ name, value, options }) => {
            cookieStore.set({ name, value, ...(options ?? {}) })
          })
        },
      },
    }
  )
}

export { createServerClient }
