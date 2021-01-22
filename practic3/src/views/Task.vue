<template>
  <div class="card" v-if="taskData">
    <h2>{{taskData.taskName}}</h2>
    <p><strong>Статус</strong>: <AppStatus :type="taskData.status" /></p>
    <p><strong>Дэдлайн</strong>: {{ taskData.date }}</p>
    <p><strong>Описание</strong>: {{taskData.description}}</p>
    <div>
      <button class="btn" @click="changeStatus('pending')">Взять в работу</button>
      <button class="btn primary" @click="changeStatus('done')">Завершить</button>
      <button class="btn danger" @click="changeStatus('cancelled')">Отменить</button>
    </div>
  </div>
  <h3 class="text-white center" v-else>
    Задачи с id = <strong>{{taskId}}</strong> нет.
  </h3>
</template>

<script>
import {computed} from 'vue'
import {useStore} from 'vuex';
import {useRouter} from 'vue-router'
import AppStatus from '../components/AppStatus'

export default {
  props: ['taskId'],
  setup(props) {
    const store = useStore()
    const router = useRouter()
    
    const taskData = computed(() =>{
      const data = store.state.allTasks.filter(i => i.id == props.taskId)
      if (data.length){
        return data[0]
      } else {return false}
    })

    const changeStatus = (status) => {
      store.state.allTasks.map(item => {
        if (item.id == props.taskId) {
          item.status = status
        }
      })
      localStorage.setItem('tasks', JSON.stringify(store.state.allTasks))
      router.push('/')
    }

    return {
      taskData,
      changeStatus
    }
  },
  components: {AppStatus}
}
</script>