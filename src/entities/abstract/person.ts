import { Entity } from './entity'
import * as schema from '@/api/schema'

type Schema =
  | schema.User
  | schema.PublicUser
  | schema.Admin

export interface IPerson {
  name: string
}

export abstract class Person extends Entity implements IPerson {
  name = ''

  constructor (p?: Schema) {
    super()

    if (p) {
      this.name = p.name
    }
  }

  clone () {
    const p = super.clone()
    p.name = this.name
    return p
  }

  serialize () {
    return {
      ...super.serialize(),
      name: this.name,
    }
  }
}
