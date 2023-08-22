<template> 
  <manager-detail :is-edit='true'></manager-detail>
</template>
<script>
  import ManagerDetail from './components/ManagerDetail'
  export default {
    name: 'updateManager',
    components: { ManagerDetail }
  }
</script>
<style>
</style>


