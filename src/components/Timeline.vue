<template>
   <Container>
    <div v-if="!loadingUser">
    <Cards v-if="user"></Cards>
    <loginMessage v-else></loginMessage>
</div>
<div v-else class="timeline-spinner">
    <a-spin></a-spin>
</div>
   </Container>
</template>

<script setup>
import Container from './Container.vue'
import loginMessage from './loginMessage.vue'
import {useUserStore} from '../stores/users'
import {storeToRefs} from 'pinia'
import Cards from '../components/Cards.vue'

const userStore = useUserStore()
const {user, loadingUser} = storeToRefs(userStore)

</script>
<style>
.timeline-container{
    display: flex; 
    flex-direction: column;
    align-items: center; 
    padding: 20px 0; 

}
.timeline-spinner{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50vh; 
}
</style>