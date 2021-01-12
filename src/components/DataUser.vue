<template>
  <div>
    <div>
      <CreateModal/>
    </div>
    <div class="row no-gutters">
      <div
        v-for="(users, index) in UsersGetters"
        :key="index"
        class="column align-center"
      >
        <b-card>
          <b-card-text>{{ users.name }}</b-card-text>
          <b-card-text>{{ users.email }}</b-card-text>
          <b-card-text>{{ users.mobile }}</b-card-text>
          <b-card-text>{{ users.address }}</b-card-text>
          <b-button variant="outline-warning" class="mr-5">Edit</b-button>
          <b-button variant="outline-danger" class="ml-5">Delete</b-button>
        </b-card>
      </div>
      <div v-if="UsersGetters.length === 0">
        <img
          src="https://media.giphy.com/media/l0MYICK7vFjhxwxhK/giphy.gif"
          alt="No-More"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import CreateModal from '../components/CreateModal'
export default {
  data () {
    return {}
  },
  components: {
    CreateModal
  },
  computed: {
    ...mapGetters({
      UsersGetters: 'users/getAllUser'
    })
  },
  methods: {
    ...mapActions({
      usersActions: 'users/getUsers'
    })
  },
  mounted () {
    this.usersActions()
  }
}
</script>

<style scoped>
.align-center {
  margin-left: 50px;
  margin-top: 30px;
}
</style>
