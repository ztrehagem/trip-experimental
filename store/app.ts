import * as vsm from "vuex-smart-module";

class State {
  isLoggedIn = false
}

class Mutations extends vsm.Mutations<State> {
  setLoggedIn(isLoggedIn: boolean) {
    this.state.isLoggedIn = isLoggedIn
  }
}

class Actions extends vsm.Actions<State, never, Mutations, Actions> {
}

export default new vsm.Module({
  state: State,
  mutations: Mutations,
  actions: Actions
});
