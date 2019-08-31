import { Trip } from "../vendors/trip";
import * as api from "../api";
import * as schema from "../api/schema";
import { User } from "../models/user";

export class UserTrip extends Trip<schema.UserParams, void, schema.User> {
  user?: User;

  protected async executor() {
    if (!this.params) throw null;

    const res = await api.getUser({
      params: this.params
    });

    switch (res.status) {
      case 200:
        this.user = new User(res.data);
        break;
      case 404:
        break;
      default:
        throw res;
    }
  }
}

export class UserAddTrip extends Trip<void, void, User> {
  validationErrors?: schema.ValidationErrors;

  protected async executor() {
    if (!this.params || !this.body) throw null;

    const res = await api.postUser({
      body: this.body.serialize(),
    })

    switch (res.status) {
      case 201:
        break;
      case 400:
        this.validationErrors = res.data
        break;
      default:
        throw res;
    }
  }
}
