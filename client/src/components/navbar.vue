<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div class="container">
      <a class="navbar-brand" href="#">Victwitter</a>
      <div class="header-right">
        <div v-if="errMessage" class="alert alert-danger alert-dismissible fade show" role="alert">
          {{ errMessage }}
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <input v-if="!isLogin" type="text" placeholder="username / email" v-model="userInput">
        <input v-if="!isLogin" type="password" placeholder="password" v-model="passwordInput">
        <button class="btn-info" v-if="!isLogin" v-on:click="login">Login</button>
        <button class="btn-info" v-else v-on:click="logout">Logout</button>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      userInput: '',
      passwordInput: '',
      errMessage: ''
    }
  },
  methods: {
    login: function() {
      let self = this
      axios({
      method: 'post',
      url: 'http://localhost:3000/users/login',
      data: {
        input: this.userInput,
        password: this.passwordInput
      }
    })
      .then(response => {
        this.userInput = ''
        this.passwordInput = ''

        localStorage.setItem('token', response.data.token)
        localStorage.setItem('username', response.data.username)
        localStorage.setItem('email', response.data.email)
        localStorage.setItem('id', response.data.id)

        this.$store.dispatch('changeLoginStatus')
      })
      .catch(err => {
        this.errMessage = err.response.data.message
        setTimeout(function() {
          self.errMessage = ''
        }, 3000)
      })
    },
    logout: function() {
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      localStorage.removeItem('email')

      this.$store.dispatch('logout')
    }
  },
  created() {
    if (localStorage.getItem('token')) {
      this.$store.dispatch('changeLoginStatus')
    }
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin
    }
  }
}
</script>

<style>

</style>
