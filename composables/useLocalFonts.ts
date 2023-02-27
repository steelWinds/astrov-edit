import type { LocalFamily } from '@/utils'

import { useToggle } from '@vueuse/core'

export const useLocalFonts = () => {
  const localFonts = ref <LocalFamily[]>([])
  const [denied, toggleDenied] = useToggle(true)
  const [pending, togglePending] = useToggle(false)

  const testLocalFonts = () => {
    return window && 'queryLocalFonts' in window
  }

  const execute = async () => {
    try {
      if (!testLocalFonts()) throw new Error()

      togglePending(true)

      const availableFonts = await window.queryLocalFonts()

      localFonts.value = parseLocalFonts(availableFonts)

      toggleDenied(false)
    } finally {
      togglePending(false)
    }
  }

  return {
    localFonts,
    denied,
    execute,
    pending
  }
}
