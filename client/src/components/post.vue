<template>
  <div class="row">
    <div class="col-lg-12 col-md-12 mb-12 form-horizontal">
      <div class="form-group">
        <textarea class="form-control" placeholder="What's happening?" rows="3" v-model="statusInput"></textarea>
      </div>
      <div class="form-group">
        <button class="btn-info" v-on:click="postStatus">Post</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      statusInput: ''
    }
  },
  methods: {
    postStatus: function() {
      axios({
        method: 'post',
        url: 'http://localhost:3000/status',
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          status: this.statusInput
        }
      })
        .then(response => {
          this.statusInput = ''
          this.$store.dispatch('refreshData')
        })
        .catch(err => {
          console.log(err.response.data)
        })
    }
  }
}
</script>

<style>

</style>
