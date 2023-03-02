import { describe, test, beforeEach, vi, expect } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useNotificationStore } from '@/store/notification-store'
import { faker } from '@faker-js/faker'
import * as elPlusExports from 'element-plus'

vi.spyOn(elPlusExports, 'ElNotification').mockImplementation(() => null)

describe('Spec of pinia notification-store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  test('Called open with ignore', async () => {
    const notificationStore = useNotificationStore()

    const randomString = faker.datatype.string()

    notificationStore.ignore(randomString)

    notificationStore.open(randomString, true)

    expect(elPlusExports.ElNotification).toHaveBeenCalledTimes(0)
  })

  test('Called open without ignore', async () => {
    const notificationStore = useNotificationStore()

    const randomString = faker.datatype.string()

    notificationStore.open(randomString, true)

    expect(elPlusExports.ElNotification).toHaveBeenCalled()
  })
})
