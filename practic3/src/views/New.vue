<template>
  <form class="card" @submit.prevent="add">
    <h1>Создать новую задачу</h1>
    <div class="form-control">
      <label for="title">Название</label>
      <input type="text" id="title" v-model="title">
    </div>

    <div class="form-control">
      <label for="date">Дата дэдлайна</label>
      <input type="date" id="date" v-model="date">
    </div>

    <div class="form-control">
      <label for="description">Описание</label>
      <textarea id="description" v-model="description"></textarea>
    </div>
    <button class="btn primary" :disabled="!isValid">Создать</button>
  </form>
</template>


<script>
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'
import {ref, computed} from 'vue'

export default {
  setup(){
    const router = useRouter()
    const store = useStore()

    const title = ref('')
    const date = ref('')
    const description = ref('')

    const isValid = computed(() =>{
      return title.value && date.value && description.value
    })

    const getStaus = () => {
      return (new Date(date.value)).getTime() - Date.now() < 0 ? 'cancelled' : 'active'
    }

    const add = () => {
      const obj = {
        id: Date.now(),
        taskName: title, 
        date, 
        description,
        status: getStaus()
      }
      store.commit('addTask', obj)
      router.push('/')
    }

    return{
      title,
      date,
      description,
      isValid,
      add
    }
  }

}
</script>