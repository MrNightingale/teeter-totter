<template>
  <div
    class="shape"
    :class="object.class"
    :style="{
      width: object.width + 'px',
      height: object.height + 'px',
      left: object.left + 'px',
      bottom: object.bottom + '%',
      'border-width':
        '0px ' +
        object.width +
        'px ' +
        object.width +
        'px ' +
        object.width / 2 +
        'px',
    }"
  >
    <p class="shape__weight">{{ object.weight }}</p>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  props: ['object', 'isPaused'],
  computed: {
    ...mapState('app', ['maxWidth']),
  },
  methods: {
    ...mapActions('app', [
      'ACTIVE_SHAPE_MOVE_TO_LEFT',
      'ADD_SHAPE_TO_RIGHT',
      'ADD_SHAPE_TO_ACTIVE',
    ]),
    ...mapGetters('app', ['force', 'gameOverStatus']),
    moveBottoms() {
      if (this.object.bottom > 0) {
        if (!this.isPaused) {
          this.object.bottom--
        }
        this.intervalid1 = setTimeout(
          () => this.moveBottoms(), 50
        )
      } else {
        this.ACTIVE_SHAPE_MOVE_TO_LEFT()
        this.force()
        if (!this.gameOverStatus()) {
          this.ADD_SHAPE_TO_RIGHT()
          this.force()
          this.ADD_SHAPE_TO_ACTIVE()
        } else {
          this.$emit('gameFinished')
        }
      }
    },
    moveLeft() {
      if (!this.isPaused && this.object.bottom > 0 && this.object.left - 10 > 0)
        this.object.left -= 10
    },
    moveRight() {
      if (
        !this.isPaused &&
        this.object.bottom > 0 &&
        this.object.left + this.object.width + 10 <
          Math.floor(this.maxWidth / 2)
      )
        this.object.left += 10
    },
  },
  created() {
    if (this.object.isNewItem) {
      this.moveBottoms()
      window.addEventListener('keydown', (e) => {
        if (e.keyCode == 37) this.moveLeft()
        if (e.keyCode == 39) this.moveRight()
      })
    }
  },
}
</script>

<style>
.shape {
  position: absolute;
  text-align: center;
  color: #fff;
  transition: transform 0.2s ease-in-out;
  line-height: 100%;
}

.shape__weight {
  color: #4a4a4a;
}

.circle {
  border-radius: 50%;
  background-color: #ff7a59;
}
.triangle {
  width: 0 !important;
  height: 0 !important;
  border-style: solid;
  border-color: transparent;
  border-bottom-color: #ffcc66;
  border-top-width: 0 !important;
}
.rectangle {
  background-color: #008d9b;
}
</style>
