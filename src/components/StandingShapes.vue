<template>
  <div v-if="teeter">
    <div class="standing-shapes" :style="standingShapesStyles">
      <geometrical-shape
          v-for="shape in teeter?.leftShapes"
          :key="shape.id"
          :type="shape.type"
          :weight="shape?.weight"
          :style="shapeStyles"
          :color="shape.color"
          :left="shape?.left"
      />
      <geometrical-shape
          v-for="shape in teeter?.rightShapes"
          :key="shape.id"
          :type="shape.type"
          :weight="shape?.weight"
          :style="shapeStyles"
          :color="shape.color"
          :right="shape.right"
      />
    </div>
  </div>
</template>

<script>
import GeometricalShape from "./GeometricalShape";
import {mapGetters} from "vuex";
import constants from "@/variables/constants";

export default {
  name: 'standing-shapes',
  components: {GeometricalShape},
  computed: {
    ...mapGetters(['fallingShape', 'fallingShapeTopPosition', 'shapes', 'isStopped', 'teeter', 'barAngle']),
    standingShapesStyles() {
      return {
        transform: `rotate(${this?.barAngle}deg)`
      }
    },
    shapeStyles() {
      return {
        top: `-${constants.SHAPE_SIZE}px`,
        opacity: constants.STANDING_SHAPES_OPACITY
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.standing-shapes {
  display: flex;
  transition: transform 1s;
}
</style>