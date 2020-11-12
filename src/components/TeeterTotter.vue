<template>
  <main class="teeter-totter">
    <div class="teeter-totter__container">
      <shape
        v-for="item in activeShapes"
        :key="item.id"
        :object="item"
        :isPaused="isPaused"
        @gameFinished="toggleModal"
      />

      <div
        class="teeter-totter__floor"
        :style="{
          transform: 'rotate(' + this.force + 'deg)',
          transition: 'transform ' + Math.abs(force) * 0.1 + 's ease-in-out',
        }"
      >
        <shape
          v-for="(item, index) in leftShapes"
          :key="'leftShape-' + index"
          :object="item"
          @gameFinished="toggleModal"
        />
        <shape
          v-for="(item, index) in rightShapes"
          :key="'rightShape-' + index"
          :object="item"
          @gameFinished="toggleModal"
        />
      </div>
    </div>
    <div class="teeter-totter__base"></div>
    <Modal v-if="isModalShow" @close="closeModal">
      <h3>Game Over</h3>
      <button @click="triggerNewGame">Start New Game</button>
    </Modal>
  </main>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import Shape from './Shape'
import Modal from './Modal.vue'
import modalMixin from './mixins/modalMixin'

export default {
  name: 'TeeterTotter',
  components: {
    Shape,
    Modal,
  },
  mixins: [modalMixin],
  computed: {
    ...mapState('app', [
      'leftShapes',
      'rightShapes',
      'activeShapes',
      'isPaused',
      'force',
    ]),
    getId() {
      return new Date().getDate()
    },
  },
  methods: {
    ...mapActions('app', ['startNewGame']),
    ...mapMutations('app', ['TOGGLE_PAUSE']),
    triggerNewGame() {
      this.startNewGame()
      this.closeModal()
      this.TOGGLE_PAUSE()
    },
  },
}
</script>

<style scoped>
.teeter-totter {
  width: 1000px;
  margin: 0 auto;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.teeter-totter__container {
  position: absolute;
  bottom: 120px;
  top: 0;
  left: 0%;
  right: 0%;
}

.teeter-totter__floor {
  position: absolute;
  width: 1000px;
  height: 10px;
  background-color: #8dc640;
  bottom: 0;
  left: 0;
  transition: transform 0.4s ease-in-out;
}

.teeter-totter__base:after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  width: 0;
  height: 0;
  margin: 0 auto;
  border-style: solid;
  border-width: 0 80px 120px 80px;
  border-color: transparent transparent #15284b transparent;
}
</style>
