<template>
  <div class="home">
    <div class="container">
      <div class="row">
        <div class="col-lg-3">
          <Profile v-if="isLogin"></Profile>
          <Search v-if="isLogin"></Search>
          <Recently v-if="isLogin"></Recently>
        </div>
        <!-- /.col-lg-3 -->

        <div class="col-lg-6">
          <Post v-if="isLogin"></Post>
          <hr>
          <Timeline></Timeline>
          <!-- /.row -->

        </div>
        <!-- /.col-lg-6 -->

        <whotofollow v-if="isLogin"></whotofollow>
        <!-- /.col-lg-3 -->

      </div>
      <!-- /.row -->

    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Profile from '@/components/profile.vue'
import Search from '@/components/search.vue'
import Recently from '@/components/recently.vue'
import Post from '@/components/post.vue'
import Timeline from '@/components/timeline.vue'
import Whotofollow from '@/components/whotofollow.vue'

export default {
  name: 'home',
  components: {
    Profile,
    Search,
    Recently,
    Post,
    Timeline,
    Whotofollow
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin
    }
  }
}
</script>
