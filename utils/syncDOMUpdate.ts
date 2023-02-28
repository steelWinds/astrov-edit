import { Window } from 'happy-dom'

export const syncDOMUpdate = () => {
  const { happyDOM } = new Window()

  return happyDOM.whenAsyncComplete()
}
