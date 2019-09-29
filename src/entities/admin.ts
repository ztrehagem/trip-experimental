import * as schema from '../api/schema'
import { Person, IPerson } from './abstract/person'

export interface IAdmin extends IPerson {
  level: number
}

export class Admin extends Person implements IAdmin {
  level = 0

  constructor (a?: schema.Admin) {
    super(a)

    if (a) {
      this.level = a.level
    }
  }

  clone () {
    const a = super.clone()
    a.level = this.level
    return a
  }

  serialize () {
    return {
      ...super.serialize(),
      level: this.level,
    }
  }
}
