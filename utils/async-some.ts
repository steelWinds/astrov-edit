import type { AsyncBooleanIterator } from 'async'

import async from 'async'

export const asyncSome = async <T>(arr: T[], predicate: AsyncBooleanIterator<T>) => {
  return new Promise(resolve => async.some(arr, predicate, (_, result) => resolve(result)))
}
