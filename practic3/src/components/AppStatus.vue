<template>
  <span :class="['badge', status.color]">{{status.type}}</span>
</template>

<script>
import {computed} from 'vue'
export default {
  props: ['type'],
  setup(props){
    const status = computed(() =>{
      switch (props.type){
        case 'active': 
          return {color: 'primary',type: 'Активен'}; break
        case 'done': 
          return {color: 'primary',type: 'Завершен'}; break
        case 'pending': 
          return {color: 'warning',type: 'Выполняется'}; break
        case 'cancelled': 
          return {color: 'danger',type: 'Отменен'}; break
        default: return ''
      }
    })

    return {
      status
    }
  }
}
</script>