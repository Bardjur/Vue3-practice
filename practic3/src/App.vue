<template>
  <the-navbar></the-navbar>
  <div class="container with-nav">
    <router-view />
  </div>
</template>

<script>
import { useStore } from 'vuex'
import TheNavbar from './components/TheNavbar'

export default {
  setup(){
    const store = useStore();

    (function() {
      if (!localStorage.getItem('tasks')){
        localStorage.setItem('tasks', JSON.stringify(store.state.allTasks))
      } else {
        store.state.allTasks = JSON.parse(localStorage.getItem('tasks'))
      }
    })()

  },
  components: {TheNavbar}
}
</script>