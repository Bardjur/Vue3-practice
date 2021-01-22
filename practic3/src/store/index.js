import { createStore } from 'vuex'

export default createStore({
  state: {
    allTasks: [
      {
        id: 1, 
        taskName: 'Название задачи', 
        date: '2020-07-22', 
        description: 'Описание задачи', 
        status: 'cancelled'
      },
      {
        id: 2,
        taskName: 'Название задачи2',
        date: '2021-01-23',
        description: 'Описание задачи2',
        status: 'active'
      },
    ]
  },
  getters: {
    activeTask: state => {
      return state.allTasks.filter(item => item.status == 'active').length
    },
    sortTask: state => {
      return state.allTasks.sort((a, b) => a.date > b.date ? 1 : -1)
    }
  },
  mutations: {
    addTask(state, obj) {
      state.allTasks.push(obj)
      localStorage.setItem('tasks', JSON.stringify(state.allTasks))
    }
  }
})
