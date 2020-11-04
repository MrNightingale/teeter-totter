<template>
  <div class="modal" @click.self="close($event)" :class="{ 'modal--show': isShow }">
    <div class="modal__container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  methods: {
    close(e) {
      this.$emit('close', e)
    },
  },
  created() {
    setInterval(() => {
      this.isShow = true
    }, 1)
  },
  data() {
    return {
      isShow: false,
    }
  },
}
</script>

<style>
.modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  background: rgba(0, 0, 0, 0.37);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: all 0.4s ease;
  text-align: left;
}

.modal--show {
  opacity: 1;
}

.modal--show .modal__container {
  opacity: 1;
  transform: translateY(0);
}

.modal__container {
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: 768px;
  max-height: 95%;
  padding: 35px 20px 20px;
  background: #fff;
  opacity: 0;
  transition: transform 0.5s ease, opacity 0.3s ease;
  transform: translateY(-50px);
  border-radius: 5px;
}

button {
  background-color: #15284b;
  border: 1px solid #15284b;
  color: white;
  border-radius: 3px;
  cursor: pointer;
}
</style>
