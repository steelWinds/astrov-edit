export const useTestLocalFonts = () => {
  return window && 'queryLocalFonts' in window
}
