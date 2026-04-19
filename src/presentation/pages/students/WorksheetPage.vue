<script setup>
import NavButton from '@/components/button/NavButton.vue'
</script>

<template>
  <h1>Worksheet Page</h1>

  <footer class="footer">
    <NavButton to="/material" text="Back" />
    <!-- <NavButton to="/material" text="Next" /> -->
  </footer>
</template>

<style>
.footer {
  position: fixed;
  bottom: 0;
  left: 0px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
}
</style>
