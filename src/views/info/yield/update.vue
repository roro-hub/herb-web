<template> 
  <yield-detail :is-edit='true'></yield-detail>
</template>
<script>
  import YieldDetail from './components/YieldDetail'
  export default {
    name: 'updateYield',
    components: { YieldDetail }
  }
</script>
<style>
</style>
