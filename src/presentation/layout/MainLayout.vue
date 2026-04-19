<template>
  <div class="layout">
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainLayout',
}
</script>

<style>
.layout {
  width: 100vw;
  height: 100vh;

  background-image: url('@/assets/images/bg/background.jpeg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  text-align: center;
}
</style>
