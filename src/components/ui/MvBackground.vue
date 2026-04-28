<template>
  <div class="mv-bg">
    <div class="bg-grid"></div>
    <div class="orb orb1"></div>
    <div class="orb orb2"></div>
    <div class="orb orb3"></div>
    <slot />
  </div>
</template>

<style scoped>
.mv-bg {
  height: 100vh;
  background: rgba(6, 0, 14, 0.7);

  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 24px;
  position: relative;
  overflow: hidden;

  border: 1px solid rgba(255, 255, 255, 0.1);
}

.bg-grid {
  position: fixed;
  inset: 0;
  background-image:
    linear-gradient(rgba(124, 58, 237, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(124, 58, 237, 0.08) 1px, transparent 1px);
  background-size: 44px 44px;
  pointer-events: none;
  z-index: 0;
}

.orb {
  position: fixed;
  border-radius: 50%;
  filter: blur(90px);
  pointer-events: none;
  z-index: 0;
}
.orb1 {
  width: 500px;
  height: 500px;
  background: rgba(109, 40, 217, 0.28);
  top: -160px;
  left: -160px;
}
.orb2 {
  width: 350px;
  height: 350px;
  background: rgba(192, 38, 211, 0.2);
  bottom: -80px;
  right: -80px;
}
.orb3 {
  width: 250px;
  height: 250px;
  background: rgba(14, 165, 233, 0.12);
  top: 45%;
  left: 55%;
}
</style>
