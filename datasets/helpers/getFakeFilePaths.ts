import { faker } from '@faker-js/faker'

export const getFakeFilePahts = (len: number) => {
  return Array.from({ length: len }, faker.system.filePath)
}
