<template>
    <div id="app">
        <Head>ζεζ‘δΎ</Head>
        <List :videotype="'1'" :apitype="'0'"></List>
    </div>
</template>
<script>
import List from './components/VideoList.vue'

export default {
  components: {
    List
  }
}
</script>
