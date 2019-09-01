<template>
  <div id="app">
    <div>{{user}}</div>
    <button type="button" @click.prevent="getUser">getUser</button>
    <button type="button" @click.prevent="login">login</button>
    <button type="button" @click.prevent="addUser">addUser</button>
    <div>isLoggedIn: {{$store.state.app.isLoggedIn}}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HelloWorld from './components/HelloWorld.vue'
import { User } from './models/user'
import { UserGetTrip, UserAddTrip } from './trips/user'
import appStore from './store/app'

@Component({
  components: {
    HelloWorld
  }
})
export default class App extends Vue {
  trip = new UserGetTrip()
  user: User | null = null

  created () {
    this.login()
    this.trip.setParams({ id: 1 })
  }

  async getUser () {
    await this.trip.execute()
    console.log('got user', this.trip.user)
    this.user = this.trip.user || null
  }

  login () {
    appStore.context(this.$store).mutations.setLoggedIn(true)
  }

  async addUser () {
    const user = new User()
    const trip = new UserAddTrip()
    trip.setBody(user)

    try {
      await trip.execute()
      if (trip.validationErrors) {
        console.info('validation error')
      } else {
        console.log('success')
      }
    } catch (error) {
      if (appStore.context(this.$store).state.isLoggedIn) {
        console.error('api error')
      } else {
        console.warn('unauthorized')
      }
    }
  }
}
</script>
<style lang="stylus">
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px
</style>
