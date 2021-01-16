<template>
    <button class="edit pos-a" @click="$emit('action')">&#9998;</button>
</template>

<script>
  export default {
    emits:['action']
  }
</script>
