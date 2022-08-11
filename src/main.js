import { createApp } from 'vue'
import App from './App.vue'
// import 'ant-design-vue/dist/antd.css'; // or 'ant-design-vue/dist/antd.less'
import { Input,Modal,Select } from 'ant-design-vue';
// import Antd  from 'ant-design-vue';
createApp(App).use(Input).use(Modal).use(Select).mount('#app')
