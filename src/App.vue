<template>
  <div id="app">
    <TeeterTotter />
    <Modal v-if="isModalShow" @close="closeModal">
      <button @click="TOGGLE_PAUSE(); closeModal()">Start Game</button>
    </Modal>
  </div>
</template>

<script>
import TeeterTotter from './components/TeeterTotter.vue'
import Modal from './components/Modal.vue'
import modalMixin from './components/mixins/modalMixin'
import { mapActions, mapMutations } from "vuex";

export default {
  name: 'App',
  components: {
    TeeterTotter,
    Modal
  },
  mixins: [modalMixin],
  methods: {
    ...mapActions('app', ['startNewGame']),
    ...mapMutations('app', ['TOGGLE_PAUSE']),
  },
  created () {
    this.startNewGame()
  },
  mounted () {
    this.isModalShow = true
    window.addEventListener("keypress", (e) => {
      if (e.keyCode == 32) this.TOGGLE_PAUSE()
    })
  }
}
</script>

<style>
body {
  margin: 0;
  background-color: aliceblue;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}
</style>
