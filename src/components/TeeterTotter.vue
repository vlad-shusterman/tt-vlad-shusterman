<template>
  <div class="teeter-totter">
    <header-block @restart="restart" :key="componentKey"/>
    <playground :key="componentKey"/>
    <standing-shapes :key="componentKey"/>
    <teeter :key="componentKey"/>
  </div>
</template>

<script>
import Teeter from "./Teeter";
import HeaderBlock from "./HeaderBlock";
import Playground from "./Playground";
import StandingShapes from "@/components/StandingShapes";

export default {
  name: 'teeter-totter',
  components: {StandingShapes, Playground, HeaderBlock, Teeter},
  props: {
    msg: String
  },
  data() {
    return {
      componentKey: 0
    }
  },
  methods: {
    restart() {
      this.componentKey++;
    }
  }

}
</script>

<style scoped lang="scss">
.teeter-totter {

}
</style>
