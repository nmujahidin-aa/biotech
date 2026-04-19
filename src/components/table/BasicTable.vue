<script setup>
defineProps({
  columns: {
    type: Array,
    required: true,
  },
  rows: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <table>
    <thead>
      <tr>
        <th
          v-for="col in columns"
          :key="col.key"
          :style="{ width: col.width, textAlign: 'center' }"
        >
          {{ col.label }}
        </th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(row, index) in rows" :key="index">
        <td v-for="col in columns" :key="col.key" style="text-align: center">
          {{ row[col.key] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<!-- Cara Pemakaian -->
<!-- <script setup>
import Table from '@/components/Table.vue'

const columns = [
  { label: 'Tahun', key: 'year', width: '10%' },
  { label: 'Penemuan', key: 'discovery', width: '90%' },
]

const rows = [
  { year: 1917, discovery: 'Ereky memperkenalkan istilah Bioteknologi' },
  { year: 1943, discovery: 'Penisilin diproduksi dalam skala industri' },
  { year: 1953, discovery: 'Watson dan Crick menemukan struktur DNA' },
]
</script>

<template>
  <Table :columns="columns" :rows="rows" />
</template> -->
