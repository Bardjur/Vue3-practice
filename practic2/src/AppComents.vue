<template>
  <ul class="list" v-for="coment in coments" :key="coment.id">
    <li class="list-item">
      <div>
        <p><strong>{{ coment.email }}</strong></p>
        <small>{{ coment.body }}</small>
      </div>
    </li>
  </ul>
</template>

<script>
  export default {
    props:{
      coments: Array
    }
  }
</script>

<style lang="scss" scoped>

</style>