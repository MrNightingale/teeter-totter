export default {
  methods: {
    openModal () {
      this.isModalShow = true
      document.body.classList.add('overflow-hidden')
    },
    closeModal () {
      this.isModalShow = false
      document.body.classList.remove('overflow-hidden')
    },
    toggleModal () {
      this.isModalShow = !this.isModalShow
      document.body.classList.toggle('overflow-hidden')
    }
  },
  data () {
    return {
      isModalShow: false
    }
  }
}
