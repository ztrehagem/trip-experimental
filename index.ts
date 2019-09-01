import Vue from 'vue'
import store from "./store";
import { UserAddTrip } from "./trips/user";
import { User } from "./models/user";

new Vue({
  store,
})

async function addUser() {
  const user = new User()
  const trip = new UserAddTrip()
  trip.setBody(user)

  try {
    await trip.execute();
    if (trip.validationErrors) {
      console.log("validation error");
    } else {
      console.log('success')
    }
  } catch (error) {
    console.log('api error')
  }
}
