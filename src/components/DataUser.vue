<template>
  <div>
    <div v-if="UsersGetters.length === 0">
      <div>
        <b-card class="text-center style-Card">
          <div class="bg-secondary text-light">
            There's Currently No Data Exists Please Create by Clicking the
            <CreateModal />
          </div>
        </b-card>
      </div>
    </div>
    <div v-else>
      <div>
        <CreateModal />
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
            <b-button variant="danger" @click="deleteUser(users.id)"
              >Delete</b-button
            >
          </b-card>
        </div>
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
      usersActions: 'users/getUsers',
      deleteActions: 'users/deleteUser'
    }),
    deleteUser (id) {
      // alert(id)
      this.deleteActions(id).then(() => {
        this.usersActions()
      })
    }
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
.style-Card {
  margin-top: 20%;
}
</style>
