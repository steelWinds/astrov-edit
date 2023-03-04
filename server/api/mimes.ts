import db from 'mime-db'

export default defineEventHandler(() => {
  const textExts = Object
    .entries(db)
    .flatMap(([key, source]) => key.includes('text') ? (source?.extensions ?? []) : [])
    .filter(ext => !Array.from(ext.matchAll(/(?:\W|_)/gmi))?.length)

  return {
    exts: textExts
  }
})
