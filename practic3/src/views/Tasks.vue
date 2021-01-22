<template>
  <h1 class="text-white center" v-if="$store.getters.sortTask.length == 0">Задач пока нет</h1>
  <template v-else>
    <h3 class="text-white">Всего активных задач: {{ $store.getters.activeTask}}</h3>
    <div class="card" 
      v-for="task in $store.getters.sortTask"
      :key="task.id">
      <h2 class="card-title">
        {{task.taskName}}
        <AppStatus :type="task.status" />
      </h2>
      <p>
        <strong>
          <small>
            {{task.date}}
          </small>
        </strong>
      </p>
      <button class="btn primary" @click="goToTask(task.id)">Посмотреть</button>
    </div>
  </template>
</template>

<script>
import {useRouter} from 'vue-router'
import AppStatus from '../components/AppStatus'

export default {
  
  setup(){
    const router = useRouter()

    const goToTask = (id) => {
      router.push('/task/' + id)
    }

    return {
      goToTask
    }
  },
  components: {AppStatus}
}
</script>
