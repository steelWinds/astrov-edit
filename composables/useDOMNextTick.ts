import { Window } from 'happy-dom'

export const useDOMNextTick = () => {
  const { happyDOM } = new Window()

  return happyDOM.whenAsyncComplete
}
