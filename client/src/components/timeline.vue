<template>
<div>
  <div v-for="(each,index) in status" :key="index" class="row">
    <div class="col-lg-12 col-md-12 timeline-wrapper">
      <div class="media ">
        <img class="d-flex mr-3 rounded-circle" src="https://images.pexels.com/photos/235444/pexels-photo-235444.jpeg?auto=compress&cs=tinysrgb&h=350" alt="">
        <span class="media-body twit-status">
          <h5 class="mt-0">{{ each.userId.name }}</h5>
          <p>@{{ each.userId.username }}</p>
          <p>{{ each.status }}</p>
          <a href="#" v-if="each.userId.email === getEmail()" v-on:click="deleteTweet(each._id)">Delete</a>
        </span>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {

    }
  },
  methods: {
    refresh: function() {
      axios({
      method: 'get',
      url: 'http://localhost:3000/status',
    })
      .then(response => {
        let tempStatus = []
        response.data.data.forEach(status => {
          tempStatus.push(status)
        })
        this.$store.dispatch('sendAllStatus', tempStatus)
      })
      .catch(err => {
        console.log(err)
      })
    },
    deleteTweet: function(id) {
      axios({
      method: 'delete',
      url: 'http://localhost:3000/status',
      headers: {
        token: localStorage.getItem('token')
      },
      data: {
        id: id
      }
    })
      .then(response => {
        this.$store.dispatch('refreshData')
      })
      .catch(err => {
        console.log(err)
      })
    },
    getEmail: function() {
      return localStorage.getItem('email')
    }
  },
  created() {
    axios({
      method: 'get',
      url: 'http://localhost:3000/status',
    })
      .then(response => {
        let tempStatus = []
        response.data.data.forEach(status => {
          tempStatus.push(status)
        })
        this.$store.dispatch('sendAllStatus', tempStatus)
      })
      .catch(err => {
        console.log(err)
      })
  },
  watch: {
    refreshData: function(newVal, oldVal) {
      this.refresh()
    }
  },
  computed: {
    status() {
      return this.$store.state.status
    },
    refreshData() {
      return this.$store.state.refreshStatus
    }
  }
}
</script>

<style scoped>
h5, p {
  text-align: left
}
</style>
