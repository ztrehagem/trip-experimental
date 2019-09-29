import * as schema from '../api/schema'
import { User, IUser } from './user'

export interface IPublicUser extends IUser {
  nickname: string
}

export class PublicUser extends User implements IPublicUser {
  nickname = ''

  constructor (p?: schema.PublicUser) {
    super(p)

    if (p) {
      this.nickname = p.nickname
    }
  }

  clone () {
    const p = super.clone()
    p.nickname = this.nickname
    return p
  }

  serialize () {
    return {
      ...super.serialize(),
      nickname: this.nickname,
    }
  }
}
