import { Trip } from '@/plugins/trip'
import * as api from '@/api'
import { User } from '@/entities/user'

export class UserGetTrip extends Trip {
  user?: User
  protected id?: number

  prepare (id: number) {
    this.id = id
  }

  protected async executor () {
    if (!this.id) throw new Error()
    console.log(this.isSubmitting)
    const res = await api.getUser({
      params: {
        id: this.id,
      },
    })

    switch (res.status) {
      case 200:
        this.user = new User(res.data)
        console.log(200, this.user)
        break
      case 404:
        console.log(404)
        break
      default:
        throw res
    }
  }
}
