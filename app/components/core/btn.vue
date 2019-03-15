<template>
  <div :class="[btnClass, cName]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    cName: {
      type: String,
      default: ""
    }
  },
  data () {
    return {
      btnClass: 'btn'
    };
  }
}

</script>
<style lang='scss'>
@import "../../css/element.scss";
  .btn {
    @include btn;
  }
</style>