<template> 
  <manager-detail :is-edit='false'></manager-detail>
</template>
<script>
  import ManagerDetail from './components/ManagerDetail'
  export default {
    name: 'addManager',
    components: { ManagerDetail }
  }
</script>
<style>
</style>


