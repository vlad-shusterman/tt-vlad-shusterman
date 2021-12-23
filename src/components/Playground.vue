<template>
  <div class="playground">
    <div class="playground__left-side">
      <div ref="shape">
        <geometrical-shape
            :class="classes"
            :weight="fallingShape?.weight"
            :style="fallingShapesStyles"
            :left="fallingShape?.left"
            :type="fallingShape?.type"
        />
      </div>
    </div>
    <div class="playground__right-side">
    </div>
  </div>
</template>

<script>
import GeometricalShape from '@/components/GeometricalShape';
import {mapActions, mapGetters} from 'vuex';
import {ShapePrototype} from "@/models/ShapePrototype";
import constants from "@/variables/constants";

export default {
  name: 'playground',
  components: {GeometricalShape},
  methods: {
    ...mapActions(['setShapes', 'addShape'])
  },

  data() {
    return {
      defaultShapeTopPosition: 0
    }
  },

  computed: {
    ...mapGetters(['fallingShape', 'fallingShapeTopPosition', 'shapes', 'isStopped', 'teeter', 'barAngle']),
      classes() {
      return `geometrical-shape--left geometrical-shape--${this.fallingShape.type}`;
    },
    fallingShapesStyles() {
      return {
        top: `${this.fallingShapeTopPosition ? this.fallingShapeTopPosition - this.defaultShapeTopPosition : 0}px`,
        backgroundColor: this.fallingShape ? this.fallingShape.color : this.shapes[0].color,
      }
    }
  },
  mounted() {
    this.$nextTick( () => {
      this.shapes[constants.STARTING_ITEM_INDEX].setTopPosition(this.$refs.shape.getBoundingClientRect().top);
      this.defaultShapeTopPosition = this.$refs.shape.getBoundingClientRect().top;

      document.addEventListener('keydown', (event) => {
        if (!this.isStopped) {
          if (event.keyCode === constants.MOVE_RIGHT_KEYCODE) {
            this.fallingShape.moveRight();
          }

          if (event.keyCode === constants.MOVE_LEFT_KEYCODE) {
            this.fallingShape.moveLeft();
          }
        }
      })
    })
  },
  beforeMount() {
    const shape = new ShapePrototype();
    shape.toggleIsFalling();
    this.addShape(shape);
  }
}
</script>

<style lang="scss" scoped>
.playground {
  display: flex;
  height: 60vh;

  &__left-side, &__right-side {
    width: 50%;
    height: 100%;
  }
}
</style>