<template>
  <div class="bg-background-light rounded-lg p-4 border border-background-lighter">
    <h3 class="font-semibold text-text-primary mb-4 flex items-center">
      <span 
        class="w-3 h-3 rounded-full mr-2"
        :class="statusConfig.color"
      ></span>
      {{ statusConfig.title }} ({{ tasks.length }})
    </h3>
    
    <div
      class="space-y-3 min-h-[400px]"
      @dragover="handleDragOver"
      @drop="handleDrop"
    >
      <TaskCard
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @dragstart="$emit('dragstart', $event, task)"
        @delete="$emit('delete', $event)"
      />
    </div>
  </div>
</template>

<script setup>
import TaskCard from './TaskCard.vue'

const props = defineProps({
  status: {
    type: String,
    required: true
  },
  tasks: {
    type: Array,
    required: true,
    default: () => []
  }
})

const emit = defineEmits(['dragstart', 'delete', 'drop'])

// Configurações para cada status
const statusConfigs = {
  'not-started': {
    title: 'Não Iniciadas',
    color: 'bg-gray-500'
  },
  'in-progress': {
    title: 'Em Progresso',
    color: 'bg-blue-500'
  },
  'pending': {
    title: 'Pendentes',
    color: 'bg-orange-500'
  },
  'completed': {
    title: 'Concluídas',
    color: 'bg-green-500'
  }
}

// Usar computed para garantir que sempre temos uma configuração válida
import { computed } from 'vue'

const statusConfig = computed(() => {
  return statusConfigs[props.status] || statusConfigs['not-started']
})

const handleDragOver = (event) => {
  event.preventDefault()
  event.dataTransfer.dropEffect = 'move'
}

const handleDrop = (event) => {
  event.preventDefault()
  emit('drop', event, props.status)
}
</script>