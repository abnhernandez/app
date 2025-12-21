"use server"

import { getPeticiones } from "./peticiones-actions"
import { Parser } from "json2csv"
import ExcelJS from "exceljs"

export async function exportCSV() {
  const data = await getPeticiones()
  const fields = data.length > 0 ? Object.keys(data[0]) : []
  const parser = new Parser({ fields })

  return parser.parse(data) // string
}

export async function exportXLSX() {
  const data = await getPeticiones()
  const workbook = new ExcelJS.Workbook()
  const sheet = workbook.addWorksheet("Peticiones")

  sheet.columns = Object.keys(data[0] || {}).map(k => ({
    header: k,
    key: k,
  }))

  sheet.addRows(data)

  const buffer = await workbook.xlsx.writeBuffer()
  return Array.from(new Uint8Array(buffer)) // 🔥 IMPORTANTE
}