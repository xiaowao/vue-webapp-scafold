<template>
  <div>
    <button @click="connect">连接服务</button>
  </div>
</template>
<script>
import APIRequest from '@/util/request'

export default {
  methods: {
    connect () {
      var connectRequest = new APIRequest('login')
      connectRequest.request().then(data => {
        console.log(`login response data : ${data}`)
      }).catch((e) => {
        console.log(`请先确保网络连接良好：${e}`)
      })
    }
  }
}
</script>
