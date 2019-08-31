import { Daty } from '@ztrehagem/daty'
import * as schema from '../api/schema'

export class User {
  name = ''
  birthday = new Daty()

  constructor(u: schema.User) {
    this.name = u.name
    this.birthday = new Daty(new Date(u.birthday))
  }
}
