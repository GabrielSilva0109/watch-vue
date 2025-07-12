<template>
  <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
    <KanbanColumn
      v-for="status in statuses"
      :key="status"
      :status="status"
      :tasks="getTasksByStatus(status)"
      @dragstart="handleDragStart"
      @delete="handleDelete"
      @drop="handleDrop"
    />
  </div>
</template>

<script setup>
import KanbanColumn from './KanbanColumn.vue'

const props = defineProps({
  tasks: {
    type: Array,
    required: true,
    default: () => []
  }
})

const emit = defineEmits(['dragstart', 'delete', 'drop'])

// Status das colunas do Kanban
const statuses = ['not-started', 'in-progress', 'pending', 'completed']

// Filtrar tarefas por status com verificações de segurança
const getTasksByStatus = (status) => {
  if (!props.tasks || !Array.isArray(props.tasks)) {
    return []
  }
  
  return props.tasks.filter(task => {
    // Verificar se a tarefa existe e tem a propriedade status
    return task && task.status === status
  })
}

// Handlers para eventos
const handleDragStart = (event, task) => {
  emit('dragstart', event, task)
}

const handleDelete = (taskId) => {
  emit('delete', taskId)
}

const handleDrop = (event, status) => {
  emit('drop', event, status)
}
</script>