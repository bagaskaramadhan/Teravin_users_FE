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
      <!-- MODAL -->
      <b-modal id="editUsers" hide-footer centered title="Edit Item">
        <b-row>
          <b-col lg="12">
            <form @submit.prevent="formUpdate" enctype="multipart/form-data">
              <b-form-group label-cols="4" label="Nama">
                <b-form-input type="text" v-model="dataUpdate.name" />
              </b-form-group>
              <b-form-group label-cols="4" label="No. Tlp">
                <b-form-input type="text" v-model="dataUpdate.mobile" />
              </b-form-group>
              <b-form-group label-cols="4" label="Email">
                <b-form-input type="text" v-model="dataUpdate.email" />
              </b-form-group>
              <b-form-group label-cols="4" label="Alamat">
                <b-form-input type="text" v-model="dataUpdate.address" />
              </b-form-group>
              <div class="form-button">
                <b-button
                  class="mt-3"
                  variant="outline-success"
                  type="submit"
                  block
                  >Save</b-button
                >
                <b-button
                  class="mt-3"
                  variant="outline-danger"
                  type="button"
                  block
                  >Cancel</b-button
                >
              </div>
            </form>
          </b-col>
        </b-row>
      </b-modal>
      <!-- END MODAL -->
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
            <b-button
              variant="outline-warning"
              class="mr-5 btn"
              type="button"
              v-b-modal.editUsers
              @click="updateGet(users.id, index)"
              >Update</b-button
            >
            <b-button variant="outline-danger" @click="deleteUser(users.id)"
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
      search: '',
      dataUpdate: {
        id: '',
        name: '',
        mobile: '',
        email: '',
        address: ''
      }
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
      searchActions: 'users/searchData',
      updateUsers: 'users/updateUser',
      getDetail: 'users/getDetail'
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
    },
    updateGet (id, index) {
      this.getDetail(id)
        .then((response) => {
          this.dataUpdate.id = response[0].id
          this.dataUpdate.name = response[0].name
          this.dataUpdate.mobile = response[0].mobile
          this.dataUpdate.email = response[0].email
          this.dataUpdate.address = response[0].address
        })
        .catch((err) => {
          alert(err)
        })
    },
    formUpdate () {
      this.updateUsers(this.dataUpdate)
        .then((response) => {
          // alert(response)
          window.location = '/'
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  mounted () {
    this.usersActions()
  }
}
</script>

<style scoped>
.searchInput {
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
