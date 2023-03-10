import { faker } from '@faker-js/faker'

const getRandomVariants = (len: number) => {
  const variants = []

  for (let i = 0; i < len; i++) {
    const key = faker.helpers.objectValue(FONT_BASE_WEIGHTS)
    const value = faker.helpers.arrayElement(FONT_BASE_STYLES)

    variants.push(`${key}${value}`)

    if (faker.helpers.maybe(() => true, { probability: 0.4 })) {
      variants.push(faker.helpers.arrayElement(FONT_BASE_STYLES))
    }
  }

  return faker.helpers.shuffle(variants)
}

const getFakeVariantsPaths = (len: number) => {
  return Object.fromEntries(
    Array.from({ length: len }, () => {
      return [faker.helpers.arrayElement(FONT_BASE_STYLES), faker.system.filePath()]
    })
  )
}

export const FAKE_FONTS = (len: number): WebfontFamily[] => {
  return Array.from({ length: len }, () => (
    {
      family: faker.lorem.word(),
      variants: getRandomVariants(10),
      files: faker.datatype.boolean() ? getFakeVariantsPaths(3) : {}
    }
  ))
}
