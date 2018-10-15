<template>
  <div id="app">
    <div id="cover">
      <!-- header 和原生的h5标签冲突 -->
      <Header></Header>
      <Footer></Footer>
      <todo></todo>
    </div>
  </div>
</template>
<script>
import Header from './todo/header.vue'
import Footer from './todo/footer.jsx'
import Todo from './todo/todo.vue'

export default {
  components:{
    Header,
    Footer,
    Todo
  },
  data(){
    return {
     
    }
  }  
}
</script>
<style lang="stylus" scoped>
#app{
    position absolute
    left 0
    right 0
    top 0
    bottom 0
}
#cover{
    position absolute
    left 0
    right 0
    top 0
    bottom 0
    background-color #fff
    opacity .5
    z-index -1
    }
</style>


