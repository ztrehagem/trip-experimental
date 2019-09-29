type SerializableType =
  | string
  | number
  | boolean
  | null
  | undefined
  | SerializableArray
  | { [k: string]: SerializableType }
class SerializableArray extends Array<SerializableType> {}

export abstract class Entity {
  clone (): this {
    return new (this as any).constructor()
  }

  serialize (): Record<string, SerializableType> {
    return {}
  }
}
