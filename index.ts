import { Trip } from "./trip";
import * as api from './api';
import * as schema from './api/schema'
import { User } from './models/user'

class UserTrip extends Trip<schema.UserParams, never, schema.User> {
  user?: User

  protected validator() {}

  protected async executor() {
    if (!this.params) throw null

    const res = await api.getUser({
      params: this.params,
    })

    switch (res.status) {
      case 200:
        this.user = new User(res.data)
        break
      case 404:
        break
      default:
        throw res
    }
  }
}
