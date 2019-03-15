<template>
  <section :class="[panelClass, cName]">
    <h4>-{{title}}-</h4>
    <slot></slot>
  </section>
</template>

<script>
export default {
  name: '',
  props: {
    cName: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    }
  },
  data () {
    return {
      panelClass: "panel"
    };
  }
}

</script>
<style lang='scss'>
@import "../../css/element.scss";
  .panel {
    @include panel;
  }
</style>