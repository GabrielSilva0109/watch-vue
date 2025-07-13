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
      <!-- Loading State -->
      <div v-if="isLoading && tasks.length === 0" class="space-y-3">
        <div
          :key="i"
          class="bg-background-lighter rounded-lg p-4 animate-pulse"
        >
          <div class="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div class="h-3 bg-gray-300 rounded w-1/2 mb-2"></div>
          <div class="h-3 bg-gray-300 rounded w-2/3"></div>
        </div>
      </div>
      
      <!-- Tasks -->
      <TaskCard
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        :is-updating="updatingTasks.includes(task.id)"
        :is-deleting="deletingTasks.includes(task.id)"
        :is-optimistic="optimisticTasks.includes(task.id)"
        @dragstart="$emit('dragstart', $event, task)"
        @delete="$emit('delete', $event)"
        @edit="$emit('edit', $event)"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
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
  },
  updatingTasks: {
    type: Array,
    default: () => []
  },
  deletingTasks: {
    type: Array,
    default: () => []
  },
  optimisticTasks: {
    type: Array,
    default: () => []
  },
  isLoading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['dragstart', 'delete', 'drop', 'edit'])

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