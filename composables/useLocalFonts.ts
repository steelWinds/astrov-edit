import { useToggle } from '@vueuse/core'

export const useLocalFonts = () => {
  const localFonts = ref<LocalFamily[]>([])
  const [denied, toggleDenied] = useToggle(false)
  const [pending, togglePending] = useToggle(false)
  const [isSupported, toggleSupported] = useToggle(true)

  const execute = async () => {
    if (!process.client || !useTestLocalFonts()) {
      toggleSupported(false)

      return
    }

    try {
      togglePending(true)

      const availableFonts = await self.queryLocalFonts()

      if (!availableFonts?.length) throw new Error('Permission denied')

      localFonts.value = parseLocalFonts(availableFonts)
    } catch (err) {
      toggleDenied(true)
    } finally {
      togglePending(false)
    }
  }

  return {
    localFonts,
    denied,
    execute,
    pending,
    isSupported
  }
}
