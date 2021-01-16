<template>
  <div class="pos-r">
    <h1>{{data}}</h1>
    <app-button @action="$emit('action')"></app-button>
  </div>
</template>

<script>
  import AppButton from './AppButton'

  export default {
    emits:['action'],
    props:{
      data: String
    },
    components: {AppButton}
  }
</script>