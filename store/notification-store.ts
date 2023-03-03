
import type { NotificationOptions } from 'element-plus/lib/components/notification'

import { ElCheckbox } from 'element-plus'

import 'element-plus/dist/index.css'

type Props = Partial<NotificationOptions>

export const useNotificationStore = definePiniaStore('notification-store', () => {
  const ignoreNotifications = ref<Set<string>>(new Set())

  const open = (idx: string, condition: boolean, props: Props = {}) => {
    if (ignoreNotifications.value.has(idx) || !condition) return new Error('')

    const { message = 'Unknow', ...otherProps } = props

    ElNotification({
      message: h(
        'div',
        [
          typeof message === 'string' ? h('p', message) : message,
          h(ElCheckbox, {
            label: 'Ingore this notification',
            size: 'large',
            checked: isIgnored(idx),
            onChange: (val) => {
              ignore(idx, val as boolean)
            }
          })
        ]
      ),
      ...otherProps
    })
  }

  const isIgnored = (idx: string) => ignoreNotifications.value.has(idx)

  const ignore = (idx: string, state: boolean) => {
    if (!state) {
      ignoreNotifications.value.delete(idx)

      return
    }

    ignoreNotifications.value = ignoreNotifications.value.add(idx)
  }

  return {
    open,
    ignore,
    isIgnored,
    ignoreNotifications
  }
}, {
  persist: {
    storage: persistedState.localStorage,
    serializer: {
      deserialize: deserialize({ type: Array, cb: (v) => new Set(v) }),
      serialize: serialize({ type: Set, cb: (v) => [...v] })
    }
  }
})
