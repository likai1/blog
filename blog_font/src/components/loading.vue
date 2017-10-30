<template>
    <div>
        加载中，请稍后...
    </div>
</template>
<script>
    import {
    mapState,
    mapActions
    } from 'vuex'
    export default {
      data(){
        return{
        
         }
      },
    methods:{
      ...mapActions(["getData"]),
    },
    computed:{
      ...mapState(["datas"])
    },
    created(){
      this.getData(this)
    }
    }
</script>