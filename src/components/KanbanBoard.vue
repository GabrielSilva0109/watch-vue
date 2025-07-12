<template>
  <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
    <KanbanColumn
      v-for="status in statuses"
      :key="status"
      :status="status"
      :tasks="getTasksByStatus(status)"
      :updating-tasks="updatingTasks"
      :deleting-tasks="deletingTasks"
      @dragstart="handleDragStart"
      @delete="handleDelete"
      @drop="handleDrop"
      @edit="handleEdit"
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
  },
  updatingTasks: {
    type: Array,
    default: () => []
  },
  deletingTasks: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['dragstart', 'delete', 'drop', 'edit'])

// Status das colunas do Kanban
const statuses = ['not-started', 'in-progress', 'pending', 'completed']

// Filtrar tarefas por status com verificações de segurança
const getTasksByStatus = (status) => {
  if (!props.tasks || !Array.isArray(props.tasks)) {
    return []
  }
  
  return props.tasks.filter(task => {
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

const handleEdit = (task) => {
  emit('edit', task)
}
</script>