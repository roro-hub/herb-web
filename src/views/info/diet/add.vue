<template> 
  <diet-detail :is-edit='false'></diet-detail>
</template>
<script>
  import DietDetail from './components/DietDetail'
  export default {
    name: 'addDiet',
    components: { DietDetail }
  }
</script>
<style>
</style>


