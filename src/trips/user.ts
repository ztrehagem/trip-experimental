import { Trip } from '../plugins/trip'
import * as api from '../api'
import * as schema from '../api/schema'
import { User } from '../models/user'
import store from '../store'
import app from '../store/app'

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
        id: this.id
      }
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

export class UserAddTrip extends Trip {
  validationErrors?: schema.ValidationErrors
  protected user?: User

  prepare (u: User) {
    this.user = u
  }

  protected async executor () {
    if (!this.user) throw new Error()

    const res = await api.postUser({
      body: this.user.serialize()
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
