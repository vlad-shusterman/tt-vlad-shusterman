<template>
  <div class="geometrical-shape" :class="`geometrical-shape--${type}`" :style="styles">
    <span class="geometrical-shape__weight" :style="weightStyles">{{ this.weight }}</span>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import {ShapeTypes} from "@/models/ShapeTypes";

export default {
  name: 'geometrical-shape',
  props: {
    weight: Number,
    color: String,
    right: Number,
    type: String,
    top: Number,
    left: Number
  },
  methods: {
    ...mapActions(['setShapes'])
  },
  computed: {
    styles() {
      return {
        backgroundColor: this.type === ShapeTypes.Triangle ?  'transparent' : this.color,
        borderBottomColor: this.type === ShapeTypes.Triangle ? this.color: 'transparent',
        right: `${this.right}vw`,
        marginTop: `${top}px`,
        left: `${this.left}vw`
      }
    },
    weightStyles() {
      return {
        position: this.type === ShapeTypes.Triangle ? 'absolute' : 'relative',
        top: this.type === ShapeTypes.Triangle ? '0.6rem' : 'auto'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.geometrical-shape {
  position: absolute;
  display: flex;
  align-items: center;
  transform-origin: top;
  justify-content: center;
  transition: top .5s;

  &--left {
    left: 25vw;
  }

  &--right {
    left: 70vw;
  }

  &__weight {
    color: white;
    padding: 1rem;
  }

  &--triangle {
    width: 0;
    height: 0;
    border-left: 25px solid white;
    border-right: 25px solid white;
    border-bottom: 50px solid;
  }

  &--circle {
    border-radius: 50%;
  }

  &--square {

  }
}
</style>