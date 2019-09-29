<template>
  <div class="foo-box">
    <div><strong>foo-box</strong></div>
    <div>{{ foo._hoge }}</div>
    <button @click="create">create</button>
    <button @click="click">click</button>
    <div>{{ user }}</div>
    <input type="text" v-model="model">
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { PropType } from 'vue'
import { User } from '@/entities/user'

class Foo {
  _hoge = { huga: 'huga' }

  get hoge () {
    return this._hoge
  }
}

@Component({})
export default class FooBox extends Vue {
  @Prop({ type: Object, default: null })
  user!: User | null;

  foo: Foo | null = new Foo()

  get hoge () {
    return this.foo ? this.foo._hoge : ''
  }

  get model () {
    return this.user ? this.user.name : ''
  }

  set model (name: string) {
    if (this.user) this.user.name = name
  }

  create () {
    this.foo = new Foo()
    console.log(this.foo)
  }

  click () {
    console.log('click!')
    if (this.foo) {
      this.foo._hoge.huga = 'hhhh'
    }
  }
}
</script>
