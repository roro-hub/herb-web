<template> 
  <yield-detail :is-edit='false'></yield-detail>
</template>
<script>
  import YieldDetail from './components/YieldDetail'
  export default {
    name: 'addYield',
    components: { YieldDetail }
  }
</script>
<style>
</style>


