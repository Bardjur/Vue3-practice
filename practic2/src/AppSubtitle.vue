<template>
  <div class="pos-r">
    <h2>{{data}}</h2>
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