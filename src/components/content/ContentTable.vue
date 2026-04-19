<template>
  <div class="mv-table-wrap">
    <table class="mv-table">
      <thead v-if="headers.length">
        <tr>
          <th v-for="h in headers" :key="h">{{ h }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, ri) in rows" :key="ri">
          <td v-for="(cell, ci) in row" :key="ci" v-html="cell"></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  headers: { type: Array, default: () => [] },
  rows: { type: Array, default: () => [] },
})
</script>

<style scoped>
.mv-table-wrap {
  margin: 16px 0;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(168, 85, 247, 0.15);
}
.mv-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  font-family: 'Exo 2', sans-serif;
}
thead tr {
  background: rgba(109, 40, 217, 0.3);
}
th {
  color: #e9d5ff;
  padding: 11px 16px;
  text-align: left;
  border-bottom: 1px solid rgba(168, 85, 247, 0.25);
  font-family: 'Rajdhani', sans-serif;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.5px;
}
td {
  padding: 10px 16px;
  border-bottom: 1px solid rgba(168, 85, 247, 0.08);
  color: #c4a8e0;
}
tr:last-child td {
  border-bottom: none;
}
tbody tr:hover td {
  background: rgba(109, 40, 217, 0.08);
}
</style>
