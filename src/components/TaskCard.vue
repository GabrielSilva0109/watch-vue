<template>
  <div
    v-if="task && task.id"
    class="bg-background p-4 rounded-lg border border-background-lighter cursor-move"
    :class="{ 'line-through opacity-75': task.status === 'completed' }"
    draggable="true"
    @dragstart="handleDragStart"
  >
    <div class="flex justify-between items-start mb-2">
      <h4 
        class="font-medium text-text-primary"
        :class="{ 'line-through opacity-75': task.status === 'completed' }"
      >
        {{ task.title || 'Sem título' }}
      </h4>
      <button
        @click="handleDelete"
        class="text-red-400 hover:text-red-300 ml-2"
      >
        ✕
      </button>
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
        {{ task.category || 'Geral' }}
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
const props = defineProps({
  task: {
    type: Object,
    required: true,
    validator: (value) => {
      return value && typeof value === 'object' && 'id' in value
    }
  }
})

const emit = defineEmits(['dragstart', 'delete'])

const handleDragStart = (event) => {
  if (props.task && props.task.id) {
    emit('dragstart', event, props.task)
  }
}

const handleDelete = () => {
  if (props.task && props.task.id) {
    emit('delete', props.task.id)
  }
}
</script>