import type { MessageParams } from 'element-plus/lib/components/message/src/message'

interface Params {
  success?: MessageParams;
  failed?: MessageParams;
}

export const elMessage = (fn: (...args: any) => any, params: Params) => {
  const { success, failed } = params

  return async function (this: any, ...args: any[]) {
    try {
      await fn.apply(this, args)

      if (success) ElMessage(success)
    } catch {
      if (failed) ElMessage(failed)
    }
  }
}
