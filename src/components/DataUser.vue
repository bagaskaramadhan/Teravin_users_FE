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
      <div class="m-3">
        <CreateModal />
      </div>
      <div class="searchInput">
        <form v-on:submit.prevent="">
          <input
            type="text"
            name="search"
            @keyup="getSearch(search)"
            v-model="search"
            id="search"
            class="form-control"
            placeholder="Search ..."
          />
        </form>
      </div>
      <div class="row no-gutters">
        <div
          v-for="(users, index) in UsersGetters"
          :key="index"
          class="column align-center"
        >
          <b-card>
            <b-card-text>Nama: {{ users.name }}</b-card-text>
            <b-card-text>Email: {{ users.email }}</b-card-text>
            <b-card-text>Telepon: {{ users.mobile }}</b-card-text>
            <b-card-text>Alamat: {{ users.address }}</b-card-text>
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
    return {
      search: ''
    }
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
      deleteActions: 'users/deleteUser',
      searchActions: 'users/searchData'
    }),
    deleteUser (id) {
      // alert(id)
      this.deleteActions(id).then(() => {
        this.usersActions()
      })
    },
    getSearch () {
      this.$router.push({
        path: '/',
        query: { search: this.search }
      })
      this.searchActions(this.search)
    }
  },
  mounted () {
    this.usersActions()
  }
}
</script>

<style scoped>
.searchInput{
  padding-right: 65%;
  margin-left: 45px;
}
.align-center {
  margin-left: 50px;
  margin-top: 30px;
}
.style-Card {
  margin-top: 20%;
}
</style>
