"use client"

import { useRef, useState } from "react"
import { Pencil } from "lucide-react"
import { uploadAvatar } from "@/lib/avatar-actions"

type AvatarUploadProps = {
  avatarUrl?: string | null
  onUpload?: (url: string) => void
}

export default function AvatarUpload({
  avatarUrl,
  onUpload,
}: AvatarUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [previewOpen, setPreviewOpen] = useState(false)

  const openFilePicker = () => inputRef.current?.click()

  const handleUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const url = await uploadAvatar(file)
      onUpload?.(url)
    } catch (err) {
      console.error(err)
      alert("Error al subir avatar")
    } finally {
      setUploading(false)
      e.target.value = ""
    }
  }

  return (
    <>
      {/* ================= AVATAR ================= */}
      <div className="relative h-28 w-28">
        {/* Avatar (click = preview) */}
        <button
          type="button"
          onClick={() =>
            avatarUrl ? setPreviewOpen(true) : openFilePicker()
          }
          className="relative h-28 w-28 rounded-full overflow-hidden border bg-black/5 flex items-center justify-center"
        >
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="Avatar"
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-sm text-gray-500">
              {uploading ? "Subiendo…" : "Cambiar"}
            </span>
          )}
        </button>

        {/* ✏️ LÁPIZ (SIEMPRE VISIBLE) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            openFilePicker()
          }}
          className="absolute -bottom-1 -right-1 z-10 h-9 w-9 rounded-full bg-white border shadow-md flex items-center justify-center hover:bg-gray-100"
        >
          <Pencil size={16} className="text-gray-700" />
        </button>

        {/* INPUT FILE */}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="hidden"
        />
      </div>

      {/* ================= PREVIEW ================= */}
      {previewOpen && avatarUrl && (
        <div
          onClick={() => setPreviewOpen(false)}
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center"
        >
          <img
            src={avatarUrl}
            alt="Avatar preview"
            className="max-h-[80vh] max-w-[80vw] rounded-full"
          />
        </div>
      )}
    </>
  )
}