<template>
  <div class="header-block">
    <button @click="start" class="header-block__button">{{isStarted ? 'Restart' : 'Start'}}</button>
    <button @click="pause" :disabled="!isStarted" class="header-block__button">{{isPaused ? 'Continue' : 'Pause'}}</button>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import {mapGetters} from 'vuex';
import constants from "@/variables/constants";

export default {
  name: 'header-block',
  data() {
    return {
      isStarted: false,
      isPaused: false
    }
  },
  methods: {
    ...mapActions(['setShapes', 'startFall', 'pauseFall', 'continueFall']),
    ...mapGetters(['fallingShape']),

    start() {
      this.startFall(constants.STARTING_ITEM_INDEX);
      if (this.isStarted) {
        window.history.go();
      }
      this.isStarted = !this.isStarted;
    },

    pause() {
      this.isPaused ? this.continueFall(this.fallingShape.id) : this.pauseFall(this.fallingShape.id);
      this.isPaused = !this.isPaused;
    }
  }
}
</script>

<style lang="scss" scoped>
.header-block {
  display: flex;
  justify-content: center;

  &__button {
    margin: 0 1rem;
    display: inline-block;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    border: 1px solid transparent;
    cursor: pointer;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  }
}
</style>