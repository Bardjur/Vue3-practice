<template>
  <div class="pos-r">
    <p>
      {{data}}
    </p>
    <app-button @action="$emit('action')"></app-button>
  </div>
</template>

<script>
  import AppButton from './AppButton'

  export default {
    emits:['action'],
    props: ['data'],
    components: {AppButton}
  }
</script>

<style lang="scss" scoped>

</style>