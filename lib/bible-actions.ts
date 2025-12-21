"use server"

export async function getBiblePassage({
  bibleId = "111",
  passage = "JHN.3.16",
}: {
  bibleId?: string
  passage?: string
}) {
  const res = await fetch(
    `https://api.youversion.com/v1/bibles/${bibleId}/passages/${passage}`,
    {
      headers: {
        "x-yvp-app-key": process.env.BIBLE_API_KEY!,
      },
      cache: "no-store",
    }
  )

  if (!res.ok) {
    const text = await res.text()
    console.error("YouVersion error:", res.status, text)
    return {
      reference: "Error",
      text: "No se pudo cargar el pasaje",
    }
  }

  const data = await res.json()

  const blocks = data?.data?.content ?? []
  const text = blocks.map((b: any) => b.text).join("\n\n")

  return {
    reference: data.data.reference,
    text,
  }
}