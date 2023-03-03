import db from 'mime-db'

export default defineEventHandler(() => {
  const textExts = Object
    .entries(db)
    .flatMap(([key, source]) => key.includes('text') ? (source?.extensions ?? []) : [])

  return {
    exts: textExts
  }
})
