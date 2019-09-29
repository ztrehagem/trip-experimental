import { Trip } from '@/plugins/trip'
import * as api from '@/api'
import * as schema from '@/api/schema'
import { User } from '@/entities/user'
import store from '@/store'
import app from '@/store/app'

export class UserAddTrip extends Trip {
  validationErrors?: schema.ValidationErrors
  protected user?: User

  prepare (u: User) {
    this.user = u
  }

  protected async executor () {
    if (!this.user) throw new Error()

    const res = await api.postUser({
      body: this.user.serialize(),
    })

    switch (res.status) {
      case 201:
        console.log(201)
        break
      case 400:
        this.validationErrors = res.data
        console.log(400, this.validationErrors)
        break
      case 403:
        app.context(store).mutations.setLoggedIn(false)
        console.log(403)
        throw res
      default:
        console.log(500)
        throw res
    }
  }
}
