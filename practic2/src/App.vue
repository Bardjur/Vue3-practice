<template>
  <div class="container column">
    <div class="card card-w30">
      <form class="" @submit.prevent="addComponent">
        <div class="form-control">
          <label for="type">Тип блока</label>
          <select id="type" v-model="componentType">
            <option value="title">Заголовок</option>
            <option value="subtitle">Подзаголовок</option>
            <option value="avatar">Аватар</option>
            <option value="text">Текст</option>
          </select>
        </div>
  
        <div class="form-control">
          <label for="value">Значение</label>
          <textarea id="value" rows="3" v-model="componentData"></textarea>
        </div>
        
        <button class="btn primary" :disabled="componentData.length == 0" v-show="!tmpComp">Добавить</button>
      </form>
      <AppEdit
        v-if="tmpComp"
        :disabled="isEdit"
        @save="saveEditsComponent"
        @delete="delComponent"
        @up="upDownComponent(-1)"
        @down="upDownComponent(1)"
        @close="clearForm"
      />
    </div>
    

    <div class="card card-w70 over-y-a m-h100">
      <h3 v-if="components.length == 0">Добавьте первый блок, чтобы увидеть результат</h3>

      <component :is="'app-'+comp.name" v-for="(comp, iter) in components" :key="comp.data" :data="comp.data" @action="editComponent([comp, iter])"></component>
    </div>
  </div>
  <div class="container">
    <p>
      <button class="btn primary" v-if="!coments" @click="loadComents">Загрузить комментарии</button>
    </p>
    <div class="card" v-if="coments && coments !== 'loading'">
      <h2>Комментарии</h2>
      <AppComents
        :coments="coments"
      />
    </div>
    <div class="loader" v-if="coments == 'loading'"></div>
  </div>
</template>

<script>
import axios from 'axios'
import AppTitle from './AppTitle'
import AppSubtitle from './AppSubtitle';
import AppAvatar from './AppAvatar'
import AppText from './AppText'
import AppEdit from './AppEdit.vue';
import AppComents from './AppComents'

export default {
  data() {
    return {
      componentType: 'title',
      componentData: '',
      components: [],
      tmpComp: null,
      isEdit: false,
      coments: '',
      url: 'https://vue-practice-a83d9-default-rtdb.firebaseio.com/components'
    }
  },
  methods: {
    async addComponent(){
      try {
        let {data, statusText} = await axios.post(`${this.url}.json`, {
          name: this.componentType,
          data: this.componentData
        });

        if( statusText === 'OK'){
          this.components.push({
            id: data.name,
            name: this.componentType,
            data: this.componentData
          })
        }
      } catch (e) {
        
      }
      this.clearForm()
    },

    async loadComponents(){
      try {
        let {data, statusText} = await axios.get(`${this.url}.json`)
        
        if (statusText === 'OK'){
          if(!data) {
            throw new Error('Компоненты не созданы')
          }
          
          this.components = Object.keys(data).map(key => {
            return {
              id: key,
              name: data[key].name,
              data: data[key].data
            }
          })

        }
        
      } catch(e){}
    },

    editComponent(comp){
      this.componentType = comp[0].name
      this.componentData = comp[0].data
      this.tmpComp = {
        id: comp[0].id,
        iter: comp[1]
      }
    },

    async delComponent(){
      try {
        let res = await axios.delete(`${this.url}/${this.tmpComp.id}.json`)
        this.components = this.components.filter(comp => comp.id !== this.tmpComp.id)
        this.clearForm()
      } catch(e){}
    },
    
    async saveEditsComponent() {
      try {
        let {data, statusText} = await axios.patch(`${this.url}/${this.tmpComp.id}.json`, {
          name: this.componentType,
          data: this.componentData
        });
        
        if( statusText === 'OK'){
          this.components[this.tmpComp.iter].name = data.name,
          this.components[this.tmpComp.iter].data = data.data
        }
        
      } catch (e) {}

      this.clearForm()
    },

    async upDownComponent(i){
      if((i === -1 && this.tmpComp.iter > 0) || (i === 1 && this.tmpComp.iter < this.components.length - 1)){
        try {
          this.isEdit = true
          let tmp = {}
          for (let k in this.components[this.tmpComp.iter + i]) {
            tmp[k] = this.components[this.tmpComp.iter + i][k]
          }

          let {data:curr, statusText} = await axios.patch(`${this.url}/${tmp.id}.json`, {
            name: this.components[this.tmpComp.iter].name,
            data: this.components[this.tmpComp.iter].data
          });

          if( statusText === 'OK'){
            let {data:second,statusText:status} = await axios.patch(`${this.url}/${this.tmpComp.id}.json`, {
              name: tmp.name,
              data: tmp.data
            });

            if (status === 'OK'){
              this.components[this.tmpComp.iter + i].name = this.components[this.tmpComp.iter].name
              this.components[this.tmpComp.iter + i].data = this.components[this.tmpComp.iter].data
              this.components[this.tmpComp.iter].name = tmp.name
              this.components[this.tmpComp.iter].data = tmp.data

              this.tmpComp.iter += i
              this.tmpComp.id = tmp.id

            }
          }

          this.isEdit = false
        } catch (e) {}
      }
    },

    clearForm(){
      this.componentType = 'title'
      this.componentData = ''
      this.tmpComp = null
    },

    async loadComents() {
      try{
        this.coments = 'loading'
        let {data} = await axios.get('https://jsonplaceholder.typicode.com/comments?_limit=42')
        this.coments = data
      } catch{}
    }

  },
  mounted(){
     this.loadComponents()
  },
  components: {AppTitle, AppSubtitle, AppAvatar, AppText, AppEdit, AppComents}
}
</script>

<style>
  .avatar {
    display: flex;
    justify-content: center;
  }

  .avatar img {
    width: 150px;
    height: auto;
    border-radius: 50%;
  }
</style>
