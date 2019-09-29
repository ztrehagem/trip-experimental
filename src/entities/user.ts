import { Daty } from '@ztrehagem/daty'
import * as schema from '../api/schema'
import { Person, IPerson } from './abstract/person'

export interface IUser extends IPerson {
  birthday: Daty
}

export class User extends Person implements IUser {
  birthday = new Daty()

  constructor (u?: schema.User) {
    super(u)

    if (u) {
      this.birthday = new Daty(new Date(u.birthday))
    }
  }

  clone () {
    const u = super.clone()
    u.birthday = new Daty(this.birthday.jsDate)
    return u
  }

  serialize () {
    return {
      ...super.serialize(),
      birthday: this.birthday.jsDate.toString(),
    }
  }
}
