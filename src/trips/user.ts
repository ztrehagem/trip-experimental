import { Trip } from '@/plugins/trip'
import * as api from '@/api'
import * as schema from '@/api/schema'
import { User } from '@/models/user'
import store from '@/store'
import app from '@/store/app'

export class UserGetTrip extends Trip<schema.UserParams, void, void> {
  user?: User;

  protected async executor () {
    if (!this.params) throw new Error()

    const res = await api.getUser({
      params: this.params
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

export class UserAddTrip extends Trip<void, void, User> {
  validationErrors?: schema.ValidationErrors;

  protected async executor () {
    if (!this.body) throw new Error()

    const res = await api.postUser({
      body: this.body.serialize()
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
