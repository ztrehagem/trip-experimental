import Vue from 'vue'
import Vuex from 'vuex'
import * as vsm from 'vuex-smart-module'
import user from './user'
import app from './app'

Vue.use(Vuex)

const rootModule = new vsm.Module({
  modules: {
    user,
    app,
  },
})

export default vsm.createStore(rootModule, { strict: true })
