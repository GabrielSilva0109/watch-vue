<template>
  <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
    <StatsCard
      title="Total"
      :value="stats.total"
      icon="📋"
      icon-bg-class="bg-gray-500"
    />
    
    <StatsCard
      title="Não Iniciadas"
      :value="stats.notStarted"
      icon="⏳"
      icon-bg-class="bg-yellow-500"
    />
    
    <StatsCard
      title="Em Progresso"
      :value="stats.inProgress"
      icon="🔄"
      icon-bg-class="bg-blue-500"
    />
    
    <StatsCard
      title="Concluídas"
      :value="stats.completed"
      icon="✅"
      icon-bg-class="bg-green-500"
    />
  </div>
</template>

<script setup>

import StatsCard from './StatsCard.vue'

const props = defineProps({
  stats: {
    type: Object,
    required: true,
    validator: (value) => {
      return value.hasOwnProperty('total') &&
             value.hasOwnProperty('notStarted') &&
             value.hasOwnProperty('inProgress') &&
             value.hasOwnProperty('completed')
    }
  }
})
</script>