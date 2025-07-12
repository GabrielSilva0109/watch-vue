<template>
  <div
    v-if="task && task.id"
    class="bg-background p-4 rounded-lg border border-background-lighter cursor-move relative"
    :class="{ 
      'line-through opacity-75': task.status === 'completed',
      'opacity-50 pointer-events-none': isLoading
    }"
    :draggable="!isLoading"
    @dragstart="handleDragStart"
  >
    <!-- Loading Overlay -->
    <div 
      v-if="isLoading" 
      class="absolute inset-0 bg-background/80 rounded-lg flex items-center justify-center z-10"
    >
      <div class="flex items-center space-x-2">
        <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
        <span class="text-sm text-text-secondary">{{ loadingText }}</span>
      </div>
    </div>

    <div class="flex justify-between items-start mb-2">
      <h4 
        class="font-medium text-text-primary"
        :class="{ 'line-through opacity-75': task.status === 'completed' }"
      >
        {{ task.title || 'Sem título' }}
      </h4>
      <div class="flex space-x-1 ml-2">
        <button
          @click="handleEdit"
          :disabled="isLoading"
          class="text-blue-400 hover:text-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Editar tarefa"
        >
          ✏️
        </button>
        <button
          @click="handleDelete"
          :disabled="isLoading"
          class="text-red-400 hover:text-red-300 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Excluir tarefa"
        >
          ✕
        </button>
      </div>
    </div>
    
    <p 
      class="text-sm text-text-secondary mb-2"
      :class="{ 'line-through opacity-75': task.status === 'completed' }"
    >
      {{ task.description || 'Sem descrição' }}
    </p>
    
    <!-- Categoria -->
    <div class="flex items-center mb-2">
      <span 
        class="text-xs bg-primary/20 text-primary px-2 py-1 rounded"
        :class="{ 'opacity-75': task.status === 'completed' }"
      >
        {{ (task.category ? task.category.charAt(0).toUpperCase() + task.category.slice(1) : 'Geral') }}
      </span>
    </div>
    
    <!-- Dependência -->
    <div 
      v-if="task.depends_on_task_id && task.dependency_info" 
      class="mt-2 p-2 bg-red-900/20 border border-red-600/30 rounded"
    >
      <p class="text-xs text-red-400">
        <strong>Depende de:</strong> {{ task.dependency_info.task_title }}
      </p>
      <p class="text-xs text-red-400">
        <strong>Usuário:</strong> {{ task.dependency_info.user_name }}
      </p>
      <p class="text-xs text-red-400">
        <strong>Status:</strong> {{ task.dependency_info.completed ? '✅ Concluída' : '⏳ Pendente' }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  task: {
    type: Object,
    required: true,
    validator: (value) => {
      return value && typeof value === 'object' && 'id' in value
    }
  },
  isUpdating: {
    type: Boolean,
    default: false
  },
  isDeleting: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['dragstart', 'delete', 'edit'])

// Estado de loading combinado
const isLoading = computed(() => props.isUpdating || props.isDeleting)

// Texto do loading baseado na operação
const loadingText = computed(() => {
  if (props.isDeleting) return 'Excluindo...'
  if (props.isUpdating) return 'Atualizando...'
  return 'Processando...'
})

const handleDragStart = (event) => {
  if (props.task && props.task.id && !isLoading.value) {
    emit('dragstart', event, props.task)
  }
}

const handleDelete = () => {
  if (props.task && props.task.id && !isLoading.value) {
    emit('delete', props.task.id)
  }
}

const handleEdit = () => {
  if (props.task && props.task.id && !isLoading.value) {
    emit('edit', props.task)
  }
}
</script>