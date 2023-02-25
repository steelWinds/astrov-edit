import type { LocalFamily } from '@/utils'

import { useToggle } from '@vueuse/core'

export const getLocalFonts = () => {
  const localFontsList = ref <LocalFamily[]>([])
  const [localFontsDenied, toggleDenied] = useToggle(true)
  const [pending, togglePending] = useToggle(false)

  const testLocalFonts = () => {
    return window && 'queryLocalFonts' in window
  }

  const localFontsExecute = async () => {
    try {
      if (!testLocalFonts()) throw new Error()

      togglePending(true)

      const availableFonts = await window.queryLocalFonts()

      localFontsList.value = parseLocalFonts(availableFonts)

      toggleDenied(false)
    } finally {
      togglePending(false)
    }
  }

  return {
    localFontsList,
    localFontsDenied,
    localFontsExecute,
    pending
  }
}
