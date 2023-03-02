type Props<T extends Constructor> = {
  type: T,
  cb: (v: InstanceType<T>) => any
}

export const serialize = <T, U extends Constructor>(props: Props<U>) => {
  return (v: T) => (
    JSON.stringify(
      v,
      (_, value) => value instanceof props.type ? props.cb(value) : value
    )
  )
}

export const deserialize = <U extends Constructor>(props: Props<U>) => {
  return (v: string) => (
    JSON.parse(
      v,
      (_, value) => value instanceof props.type ? props.cb(value) : value
    )
  )
}
