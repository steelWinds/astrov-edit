import { MessageOptions } from 'element-plus/lib/components/message/src/message'

type Message = MessageOptions['message']

interface Params {
  success?: Message;
  failed?: Message;
}

export const elMessage = (fn: (...args: any) => any, params: Params) => {
  const { success, failed } = params

  return async function (this: any, ...args: any[]) {
    try {
      await fn.apply(this, args)

      if (success) {
        ElMessage({
          message: success, type: 'success'
        })
      }
    } catch (err: any) {
      ElMessage({
        message: err.message ?? failed ?? 'Unhandled error, try again',
        type: 'error'
      })
    }
  }
}
