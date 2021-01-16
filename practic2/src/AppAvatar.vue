<template>
  <div class="avatar pos-r">
      <img :src="data">
      <app-button @action="$emit('action')"></app-button>
  </div>
</template>

<script>
  import AppButton from './AppButton'

  export default {
    props:{
      data: String
    },
    components: {AppButton}
  }
</script>