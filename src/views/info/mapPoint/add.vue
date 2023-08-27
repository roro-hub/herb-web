<template> 
  <mapPoint-detail :is-edit='false'></mapPoint-detail>
</template>
<script>
  import MapPointDetail from './components/MapPointDetail'
  export default {
    name: 'addMapPoint',
    components: { MapPointDetail }
  }
</script>
<style>
</style>


