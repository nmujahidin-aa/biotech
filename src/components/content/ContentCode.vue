<template>
  <div class="mv-code-block">
    <div class="code-header">
      <div class="dots">
        <span class="dot red"></span>
        <span class="dot yellow"></span>
        <span class="dot green"></span>
      </div>
      <span class="lang-label">{{ language }}</span>
    </div>
    <pre class="code-pre"><code>{{ code }}</code></pre>
  </div>
</template>

<script setup>
defineProps({
  code: { type: String, required: true },
  language: { type: String, default: 'code' },
})
</script>

<style scoped>
.mv-code-block {
  margin: 16px 0;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid rgba(109, 40, 217, 0.35);
}
.code-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  background: rgba(0, 0, 0, 0.4);
  border-bottom: 1px solid rgba(109, 40, 217, 0.2);
}
.dots {
  display: flex;
  gap: 6px;
}
.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.red {
  background: #ff5f57;
}
.yellow {
  background: #febc2e;
}
.green {
  background: #28c840;
}
.lang-label {
  font-family: 'Rajdhani', sans-serif;
  font-size: 11px;
  letter-spacing: 2px;
  color: rgba(168, 85, 247, 0.6);
  text-transform: uppercase;
  margin-left: 4px;
}
.code-pre {
  background: rgba(0, 0, 0, 0.5);
  padding: 18px 20px;
  margin: 0;
  overflow-x: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(109, 40, 217, 0.4) transparent;
}
.code-pre::-webkit-scrollbar {
  height: 4px;
}
.code-pre::-webkit-scrollbar-thumb {
  background: rgba(109, 40, 217, 0.4);
  border-radius: 4px;
}
code {
  font-family: 'Fira Code', 'Courier New', monospace;
  font-size: 13px;
  color: #a5f3fc;
  line-height: 1.7;
  white-space: pre;
}
</style>
