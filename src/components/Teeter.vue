<template>
  <div class="teeter">
    <div class="teeter__bar" ref="bar" :style="barStyles"></div>
    <div class="teeter__foundation" />
  </div>
</template>

<script>
import {TeeterPrototype} from "@/models/TeeterPrototype";
import {mapActions, mapGetters} from "vuex";
import {ShapePrototype} from "@/models/ShapePrototype";

export default {
  name: 'teeter',
  data() {
    return {
      teeterObj: Object,
      angle: 0
    }
  },
  methods: {
    ...mapActions(['setTeeter', 'addTeeter', 'addShape']),
  },
  computed: {
    ...mapGetters(['teeter', 'barAngle']),
    barStyles() {
      return {
        transform: `rotate(${this.barAngle}deg)`
      }
    }
  },

  mounted() {
    // Run when everything is rendered
    this.$nextTick(function () {
      this.teeterObj.setBarPositionTop(this.$refs.bar.getBoundingClientRect().top)
      const shape = new ShapePrototype();
      this.addShape(shape);
      this.teeterObj.addRightShape(shape);
    })
  },

  beforeMount() {
    const teeter = new TeeterPrototype();
    this.addTeeter(teeter);
    this.setTeeter(teeter);
    this.teeterObj = teeter;
  }
}
</script>

<style lang="scss" scoped>
.teeter {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__foundation {
    height: 200px;
    width: 200px;
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    background-color:#5c5c5c;
  }

  &__bar {
    position: relative;
    width: 70%;
    height: 3px;
    background-color: red;
    transition: transform 1s;
  }
}
</style>