<template>
  <div>
    <img class="imgStyle" src="../assets/AddUsers.svg" v-b-modal.modal-1 />
    <b-modal id="modal-1" title="Create User" hide-footer>
      <form v-on:submit.prevent="onSubmit()">
        <b-form-input
          class="mb-3"
          type="text"
          placeholder="Nama"
          v-model="input.name"
        />
        <b-form-input
          class="mb-3"
          type="number"
          placeholder="No. Tlp"
          v-model="input.mobile"
        />
        <b-form-input
          class="mb-3"
          type="email"
          placeholder="Email"
          v-model="input.email"
        />
        <b-form-textarea
          class="mb-3"
          type="text"
          placeholder="Address"
          v-model="input.address"
        />
        <b-button type="submit" variant="outline-success" block
          >CREATE</b-button
        >
      </form>
    </b-modal>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      input: {
        name: '',
        mobile: '',
        email: '',
        address: ''
      }
    }
  },
  methods: {
    ...mapActions({
      formInsertUser: 'users/insertUser'
    }),
    onSubmit () {
      if (
        this.input.name === '' ||
        this.input.mobile === '' ||
        this.input.email === '' ||
        this.input.address === ''
      ) {
        Swal.fire({
          icon: 'error',
          text: 'Cannot empty'
        })
      } else {
        this.formInsertUser(this.input).then((result) => {
          if (result === 'Email has been taken') {
            Swal.fire({
              icon: 'error',
              text: 'Email has been taken'
            })
          } else if (result === 'Success insert data') {
            window.location = '/'
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
              footer: '<a href>Why do I have this issue?</a>'
            })
          }
        })
      }
    }
  }
}
</script>

<style scoped>
.imgStyle {
  margin-left: 30px;
}
</style>
