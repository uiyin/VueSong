<template>
  <div class="singer">
    <Header></Header>
    <Nav></Nav>
    {{message}}
  </div>
</template>

<script>
import Header from '@/pages/common/Header'
import Nav from '@/pages/common/Nav'
export default {
  name: 'Singer',
  data () {
    return {
      message: '歌手'
    }
  },
  components: {
    Header,
    Nav
  }
}
</script>

<style scoped>
</style>
