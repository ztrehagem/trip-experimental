import * as vsm from 'vuex-smart-module'
import { User } from '@/models/user'
import { UserGetTrip } from '@/trips/user'

class State {
  user: User | null = null
}

class Mutations extends vsm.Mutations<State> {
  setUser (user: User) {
    this.state.user = user
  }
}

class Actions extends vsm.Actions<State, never, Mutations, Actions> {
  async load () {
    const trip = new UserGetTrip()
    trip.setParams({ id: 1 })
    await trip.execute()
    if (trip.user) {
      this.mutations.setUser(trip.user)
    }
  }
}

export default new vsm.Module({
  state: State,
  mutations: Mutations,
  actions: Actions
})
