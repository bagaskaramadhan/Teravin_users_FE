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
      <form>
        <b-form-input type="text" placeholder="Nama" class="mb-3" />
        <b-form-input type="number" placeholder="No. Tlp" class="mb-3" />
        <b-form-input type="email" placeholder="Email" class="mb-3" />
        <b-form-textarea size="sm" placeholder="Address" class="mb-3"/>
        <div class="d-flex justify-content-around">
          <b-button variant="success" type="submit">Create</b-button>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
      input: {
        product_name: null,
        product_category: null,
        stock: null,
        price: null,
        image: null
      }
    }
  },
  computed: {
    ...mapGetters({
      categoryGetters: 'product/getAllCategory'
    })
  },
  methods: {
    ...mapActions({
      categoryActions: 'product/getCategory',
      formInsertActions: 'product/insertProduct'
    }),
    buttonInsert () {
      this.input.image = this.image
      this.formInsertActions(this.input)
        .then(() => {
          // this.productActions()
          this.$refs['hide-Modal'].hide()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    processFile (event) {
      this.image = event.target.files[0]
    },
    buttonCancel () {
      this.$refs['hide-Modal'].hide()
    }
  },
  mounted () {
    this.categoryActions()
  }
}
</script>

<style scoped>
.img-Modal {
  margin: 10px;
}
</style>
