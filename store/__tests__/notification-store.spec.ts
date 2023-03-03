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

  test('Called open with ignore and without it', async () => {
    const notificationStore = useNotificationStore()

    const randomString = faker.datatype.string()

    notificationStore.ignore(randomString, true)

    notificationStore.open(randomString, true)

    expect(elPlusExports.ElNotification).toHaveBeenCalledTimes(0)

    notificationStore.ignore(randomString, false)

    notificationStore.open(randomString, true)

    expect(elPlusExports.ElNotification).toHaveBeenCalledTimes(1)
  })

  test('Called open without ignore', async () => {
    const notificationStore = useNotificationStore()

    const randomString = faker.datatype.string()

    notificationStore.open(randomString, true)

    expect(elPlusExports.ElNotification).toHaveBeenCalledTimes(2)
  })
})
