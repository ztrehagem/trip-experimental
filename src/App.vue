<template>
  <div id="app">
    <div>{{user}}</div>
    <button type="button" @click.prevent="getUser">getUser</button>
    <button type="button" @click.prevent="login">login</button>
    <button type="button" @click.prevent="addUser">addUser</button>
    <div>isLoggedIn: {{$store.state.app.isLoggedIn}}</div>
    <div>submitting: {{trip.isSubmitting}}</div>
    <div>validationErrors: {{trip.validationErrors}}</div>
    <button @click="changename">changename</button>
    <hr>
    <FooBox :user="user"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import FooBox from './components/FooBox.vue'
import { User } from './models/user'
import { UserGetTrip, UserAddTrip } from './trips/user'
import appStore from './store/app'
import userStore from './store/user'

@Component({
  components: {
    FooBox
  }
})
export default class App extends Vue {
  trip = new UserAddTrip()

  get user () {
    return userStore.context(this.$store).state.user
  }

  get submitting () {
    return this.trip.isSubmitting
  }

  @Watch('trip.isSubmitting')
  onSubmitting () {
    console.log('App submitting?', this.trip.isSubmitting)
  }

  created () {
    this.login()
    this.getUser()
  }

  async getUser () {
    await userStore.context(this.$store).actions.load()
    console.log('got user', this.user)
  }

  login () {
    appStore.context(this.$store).mutations.setLoggedIn(true)
  }

  async addUser () {
    const user = new User()
    this.trip.prepare(user)

    try {
      await this.trip.execute()
      if (this.trip.validationErrors) {
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

  changename () {
    const u = new User()
    u.name = 'hoge'
    userStore.context(this.$store).mutations.setUser(u)
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
