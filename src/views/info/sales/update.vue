<template> 
  <sales-detail :is-edit='true'></sales-detail>
</template>
<script>
  import SalesDetail from './components/salesDetail'
  export default {
    name: 'updateSales',
    components: { salesDetail }
  }
</script>
<style>
</style>


