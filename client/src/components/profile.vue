<template>
  <div class="twPc-div">
    <a class="twPc-bg twPc-block bg-info"></a>
    <div>
      <a title="Mert S. Kaplan" href="https://twitter.com/mertskaplan" class="twPc-avatarLink">
        <img alt="Mert S. Kaplan" src="https://mertskaplan.com/wp-content/plugins/msk-twprofilecard/img/mertskaplan.jpg" class="twPc-avatarImg">
      </a>

      <div class="twPc-divUser">
        <div class="twPc-divName">
          <a href="#" v-on:click="showProfile">{{ user.name }}</a>
        </div>
        <span>
          <a href="#" v-on:click="showProfile">@<span>{{ user.username }}</span></a>
        </span>
      </div>

      <div class="twPc-divStats">
        <ul class="twPc-Arrange">
          <li class="twPc-ArrangeSizeFit">
            <a href="https://twitter.com/mertskaplan" title="9.840 Tweet">
              <span class="twPc-StatLabel twPc-block">Tweets</span>
              <span class="twPc-StatValue">{{ tweets }}</span>
            </a>
          </li>
          <li class="twPc-ArrangeSizeFit">
            <a href="https://twitter.com/mertskaplan/following" title="885 Following">
              <span class="twPc-StatLabel twPc-block">Following</span>
              <span class="twPc-StatValue">874</span>
            </a>
          </li>
          <li class="twPc-ArrangeSizeFit">
            <a href="https://twitter.com/mertskaplan/followers" title="1.810 Followers">
              <span class="twPc-StatLabel twPc-block">Followers</span>
              <span class="twPc-StatValue">{{ user.followers.length }}</span>
            </a>
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
      user: '',
      tweets: ''
    }
  },
  methods: {
    refresh: function() {
      axios({
      method: 'get',
      url: 'http://localhost:3000/status'
    })
      .then(response => {
        let arr = []
        response.data.data.forEach(status => {
          if (status.userId.email === localStorage.getItem('email')) {
            arr.push(status)
          }
        })
        this.tweets = arr.length
      })
    },
    showProfile: function() {
      axios({
      method: 'get',
      url: `http://localhost:3000/status`
    })
      .then(response => {
        let arr = []
        response.data.data.forEach(status => {
          if(status.userId._id === this.user._id) {
            arr.push(status)
          }
        })
        this.$store.dispatch('showMyTweets', arr)
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  created() {
    let email = localStorage.getItem('email')
    axios({
      method: 'get',
      url: `http://localhost:3000/users/${email}`
    })
      .then(response => {
        this.user = response.data.data[0]
      })
      .catch(err => {
        console.log(err)
      })
    axios({
      method: 'get',
      url: 'http://localhost:3000/status'
    })
      .then(response => {
        let arr = []
        response.data.data.forEach(status => {
          if (status.userId.email === localStorage.getItem('email')) {
            arr.push(status)
          }
        })
        this.tweets = arr.length
      })
  },
  watch: {
    refreshData: function(newVal, oldVal) {
      this.refresh()
    }
  },
  computed: {
    refreshData() {
      return this.$store.state.refreshStatus
    }
  }
}
</script>

<style>

</style>
