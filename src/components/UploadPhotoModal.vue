<template>
    <div>
      <a-button  @click="showModal">Upload Photo</a-button>
      <a-modal v-model:visible="visible" title="Upload Photo" @ok="handleOk">
       <div v-if="!loading">
        <input type="file" accept=".jpeg,.png"
        @change="handleUploadChange">
        <a-input 
        v-model:value="caption" 
        placeholder="Caption..."
        :maxLength="50"
        ></a-input>
        <a-typography-text v-if="errorMessage" type="danger">{{errorMessage}}</a-typography-text>
       </div>
       <div class="spinner" v-else>
        <a-spin></a-spin>
       </div>
       
      </a-modal>
    </div>
  </template>
  <script setup>
  import { ref, defineProps } from 'vue';
  import {supabase} from '../superbase'
  import {useUserStore} from '../stores/users'
  import {storeToRefs} from 'pinia'
  
  const userStore = useUserStore()
  const {user} = storeToRefs(userStore)
  const props = defineProps(['addNewPost'])
  const loading = ref(false)
  const errorMessage = ref('')
  const visible = ref(false);
  const caption = ref('')
  const file = ref(null)
  
  const showModal = () => {
    visible.value = true;
  };
  
  const handleOk = async () => {
    loading.value = true
    const fileName = Math.floor(Math.random() * 1000000000)
    let filePath
    
    if(file.value){
      const {data, error} =  await supabase
        .storage
        .from('images')
        .upload('public/' + fileName, file.value)
        
        if(error){
            loading.value = false
            return errorMessage.value = 'Unable to upload image'
        }
        filePath = data.path
        await supabase.from('posts1').insert({
                url: filePath,
                caption: caption.value,
                owner_id: user.value.id
            })
        
        
    }
    loading.value = false 
    visible.value = false
    caption.value = ''
    props.addNewPost({
        url: filePath,
        caption: caption.value,
    })
  };
  
  const handleUploadChange = (event) => {
    if(event.target.files[0]){
        file.value = event.target.files[0]
    }
  }
  
  </script>
  <style scoped>
  input{
    margin-top: 10px; 
  }
  .spinner{
    display: flex; 
    align-items: center;
    justify-content: center; 
  }

</style>