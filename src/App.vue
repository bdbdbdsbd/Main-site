<script>
import { defineComponent,ref,reactive} from "vue"; //defineComponent 主要给TS用的
import {SearchOutlined,PlusCircleOutlined,DeleteOutlined} from "@ant-design/icons-vue"; //这是图标
import { nanoid } from 'nanoid'
export default defineComponent({
    components: {
      SearchOutlined,
      PlusCircleOutlined,
      DeleteOutlined
    },
    setup(){
      let visible = ref(false);
      let searchValue = ref('');
      let content = reactive({
        name:'',
        path:''
      })
      let iconArray = reactive({iconArray:[ ]})
      let searchSourse = ref("")
      if(localStorage.getItem('iconArray')==null){
          iconArray.iconArray.push({path:'https://www.baidu.com',icon:'https://www.baidu.com/favicon.ico',index:1,comment:'百度'})
      }
      else{
        iconArray.iconArray = JSON.parse(localStorage.getItem('iconArray'))
      }

      if(localStorage.getItem('searchSourse')==null){
        searchSourse.value = 'https://www.baidu.com/s?wd='
      }else{
        searchSourse.value = localStorage.getItem('searchSourse')
      }
      

      
      function search(){
        localStorage.setItem('searchSourse',searchSourse.value)
        window.location.href = searchSourse.value +searchValue.value
        searchValue.value = ''
      }
      
      function goto(path){
         window.location.href = path      
      }

      function deleteI(index){
        if(confirm('确认删除？')){
          iconArray.iconArray = iconArray.iconArray.filter((item)=>{
            return item.index!=index
          })
          localStorage.setItem('iconArray',JSON.stringify(iconArray.iconArray))
        }
        console.log(iconArray)
      }
      
      function handleOk(){
        visible.value = false
        const newIcon = {
          path:content.path,
          icon:content.path.split('/')[0]+content.path.split('/')[2]+'/favicon.ico',
          index:nanoid(),
          comment:content.name
        }
        iconArray.iconArray.push(newIcon)
        localStorage.setItem('iconArray',JSON.stringify(iconArray.iconArray))
      }

      function add(){
        visible.value = true

      }

      
      return{
        searchSourse,
        searchValue,
        search,
        iconArray,
        goto,
        deleteI,
        visible,
        handleOk,
        add,
        content
      }
    }
})
</script>

<template>
<!-- v-model:value="value"  -->
<div class="main">
  <div class="inputBoard">
    <a-select
      ref="select"
      v-model:value="searchSourse"
      style="width: 120px;"
      role="搜索引擎选择"
    >
      <a-select-option style="line-height: 28px; font-size: 20px;"  value="https://www.baidu.com/s?wd=">Baidu</a-select-option>
      <a-select-option style="line-height: 28px; font-size: 20px;" value="https://cn.bing.com/search?q=">Bing</a-select-option>
      <a-select-option style="line-height: 28px; font-size: 20px;" value="disabled" disabled>Google</a-select-option>
    </a-select> 
    <a-input :bordered="false" @pressEnter="search" v-model:value="searchValue"/>
    <div @click="search"><search-outlined /></div>
  </div>
  <div class="iconBoard">
      <div class="iconItem" v-for="icon in iconArray.iconArray" :key="icon.index" @click="goto(icon.path)">
        <div class="delete"><delete-outlined @click.stop="deleteI(icon.index)"/></div>
        <label>
          <img role="icon" :src="icon.icon" :alt="icon.comment" style="width: 60px;height: 60px; border-radius: 50%; margin-top: 10px;" onerror="this.src='http://114.55.1.80/favicon.ico'; this.onerror = null; ">
        <!-- <img :src="icon.icon" style="width: 60px;height: 60px; border-radius: 50%; margin-top: 10px;" onerror="this.src='../public/favicon.ico'"> -->
        <div>{{icon.comment}}</div>
        </label>
      </div>
      <div class="iconItem"  @click="add()">
        <plus-circle-outlined style="width: 60px;height: 60px; font-size: 60px; color: lightgray;  margin-top: 10px;"/>
        <div>新增</div>
      </div>
  </div>
  <a-modal v-model:visible="visible" title="新增" @ok="handleOk">
      <span style="font-size: 20px;margin-right: 15px;">网址:</span>
      <input type="text"  v-model="content.path"  style="width: 400px;  border-radius: 5px; padding: 0 5px;">
      <br>
      <br>
      <span style="font-size: 20px;margin-right: 15px;">备注:</span>
      <input type="text" v-model="content.name"  style="width: 400px; border-radius: 5px; padding: 0 5px;">
  </a-modal>
  
</div>


</template>

<style scoped>
.main{
  padding: 160px 0 0 0;
  display: flex;
  align-items: center;
  width: 100vw;
  flex-direction: column;
}
.main .inputBoard{
  display: flex;
  border: 1px solid gray;
  width: 800px;
  height: 50px;
  border-radius: 25px;
  padding: 0 10px 0 25px;
  font-size: 20px;
}
.main .inputBoard input{
  border: none;
  font-size: 20px;
}
.main .inputBoard input:focus{
  border: none;
}
.main .inputBoard span{
  width: 30px;
  height: 30px;
  font-size: 30px;
  margin: 9px;
  cursor: pointer;
}
.main .iconBoard{
  margin-top: 80px;
  width: 850px;
  flex-wrap:wrap;
  display: flex;
}
.main .iconBoard .iconItem{
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 2px 4px gray;
  margin: 30px;
  width: 110px;
  height: 110px;
  cursor: pointer;
}
.main .iconBoard .iconItem:hover{
  background-color: rgb(240, 238, 238);
 
}
.main .iconBoard .iconItem .delete{
  display: none;
}
.main .iconBoard .iconItem:hover .delete{
  display: inline-block;
  position: absolute;
  top: 0;
  right: 0;
  width: 20px;
  height: 20px;
  font-size: 20px;
}
.main .iconBoard .iconItem div{
  margin-top: 5px;
  text-align: center;
}

.ant-modal-body{
  display: flex;
  justify-content: center;
  text-align: center;
}
:deep(.ant-select:not(.ant-select-customize-input) .ant-select-selector){
  width: 100%;
  height: 30px;
  font-size: 24px;
  line-height: 30px;
  margin: 9px 0;
  border: none;
}



:deep(.ant-select-focused:not( .ant-select-disabled).ant-select:not(.ant-select-customize-input) .ant-select-selector){
  border: none ;
  box-shadow: none;
}


</style>
