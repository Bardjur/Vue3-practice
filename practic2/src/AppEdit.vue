<template>
  <div class="eitd-wrapper">
    <button class="edit" :disabled="disabled" @click="$emit('save')">&#128190;&ensp;</button> 
    <button class="edit" :disabled="disabled" @click="$emit('delete')">&#10060;&ensp; </button>
    <button class="edit" :disabled="disabled" @click="$emit('up')">&#9650;&ensp; </button> 
    <button class="edit" :disabled="disabled" @click="$emit('down')">&#9660;</button>
    <button class="edit close-btn" :disabled="disabled" @click="$emit('close')">close</button>
  </div>
</template>

<script>
  export default {
    emits:['save', 'delete', 'up', 'down', 'close'],
    props:['disabled']
  }
</script>

<style lang="scss" scoped>

</style>