<template> 
  <sales-detail :is-edit='false'></sales-detail>
</template>
<script>
  import SalesDetail from './components/salesDetail'
  export default {
    name: 'addSales',
    components: { salesDetail }
  }
</script>
<style>
</style>


