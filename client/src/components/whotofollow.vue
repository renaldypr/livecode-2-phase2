<template>
  <div class="col-lg-3">
    <div class="card  mb-3" style="max-width: 18rem;">
      <div class="card-body who-to-follow">
        <h5 class="card-title">Who to Follow <small><a href="#" v-on:click="refreshRandom">Refresh</a></small></h5>
        <ul id="recently-followed">
          <li v-for="(user, index) in users" :key="index">
            <div class="media ">
              <img class="d-flex mr-3 rounded-circle" src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" alt="">
              <span class="media-body twit-status">
                <h6 class="mt-0">{{ user.name }} <small>@{{ user.username }}</small></h6>

                <button v-if="!checkFollow(user.followers)" class="btn btn-outline-info" v-on:click="follow(user._id)">Follow</button>
                <button v-else class="btn btn-danger">Unfollow</button>
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      users: []
    }
  },
  methods: {
    refreshRandom: function() {
      axios({
      method: 'post',
      url: 'http://localhost:3000/users/random',
      data: {
        email: localStorage.getItem('email')
      }
    })
      .then(response => {
        this.users = []
        response.data.data.forEach(user => {
          this.users.push(user)
        })
      })
      .catch(err => {
        console.log(err)
      })
    },
    follow: function(id) {
      axios({
        method: 'post',
        url: `http://localhost:3000/users/follow/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(response => {
          // this.$store.dispatch('refreshData')
        })
        .catch(err => {
          console.log(err)
        })
    },
    checkFollow: function(arr) {
      let followed = false
      arr.forEach(id => {
        console.log(id, localStorage.getItem('id'))
        if (id === localStorage.getItem('id')) {
          followed = true
        }
      })
      return followed
    }
  },
  created() {
    axios({
      method: 'post',
      url: 'http://localhost:3000/users/random',
      data: {
        email: localStorage.getItem('email')
      }
    })
      .then(response => {
        response.data.data.forEach(user => {
          this.users.push(user)
        })
      })
  }
}
</script>

<style>

</style>
