<template>
  <div>
    <img
      src="../assets/AddUsers.svg"
      class="img-Modal"
      width="50px"
      v-b-modal.addModal
    />
    <b-modal
      ref="hide-Modal"
      hide-footer
      id="addModal"
      title="Create User"
      class="text-center"
    >
      <form @submit.prevent="formCreateActions">
        <b-form-input
          type="text"
          placeholder="Nama"
          class="mb-3"
          v-model="input.name"
        />
        <b-form-input
          type="number"
          placeholder="No. Tlp"
          class="mb-3"
          v-model="input.mobile"
        />
        <b-form-input
          type="text"
          placeholder="Email"
          class="mb-3"
          v-model="input.email"
        />
        <b-form-textarea
          size="sm"
          placeholder="Address"
          class="mb-3"
          v-model="input.address"
        />
        <div class="d-flex justify-content-around">
          <b-button variant="success" type="submit" @click="buttonCreate()"
            >Create</b-button
          >
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      input: {
        name: null,
        mobile: null,
        email: null,
        address: null
      }
    }
  },
  methods: {
    ...mapActions({
      formCreateActions: 'users/createUser'
    }),
    buttonCreate () {
      this.formCreateActions(this.input)
        .then(() => {
          this.$refs['hide-Modal'].hide()
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
.img-Modal {
  margin: 10px;
}
</style>
