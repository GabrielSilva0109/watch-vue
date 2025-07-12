<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-text-primary">Usuários da Plataforma</h2>
      <button
        @click="$emit('refresh')"
        class="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-hover transition-colors"
      >
        Atualizar
      </button>
    </div>
    
    <div v-if="loading" class="text-center py-8">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
      <p class="text-text-secondary mt-4">Carregando usuários...</p>
    </div>
    
    <div v-else-if="users.length === 0" class="text-center py-8">
      <p class="text-text-muted">Nenhum usuário encontrado</p>
    </div>
    
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="user in users" :key="user.id" class="bg-background-light p-6 rounded-lg border border-background-lighter">
        <div class="flex items-center mb-4">
          <div class="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4">
            <span class="text-white text-lg font-bold">{{ user.name.charAt(0).toUpperCase() }}</span>
          </div>
          <div>
            <h3 class="font-semibold text-text-primary">{{ user.name }}</h3>
            <p class="text-sm text-text-secondary">{{ user.email }}</p>
          </div>
        </div>
        
        <div class="space-y-3">
          <div class="flex justify-between items-center">
            <span class="text-sm text-text-secondary">Não iniciadas:</span>
            <span class="text-sm font-medium text-yellow-500 bg-yellow-500/20 px-2 py-1 rounded">
              {{ user.stats?.not_started || 0 }}
            </span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-sm text-text-secondary">Em progresso:</span>
            <span class="text-sm font-medium text-blue-500 bg-blue-500/20 px-2 py-1 rounded">
              {{ user.stats?.in_progress || 0 }}
            </span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-sm text-text-secondary">Pendentes:</span>
            <span class="text-sm font-medium text-orange-500 bg-orange-500/20 px-2 py-1 rounded">
              {{ user.stats?.pending || 0 }}
            </span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-sm text-text-secondary">Concluídas:</span>
            <span class="text-sm font-medium text-green-500 bg-green-500/20 px-2 py-1 rounded">
              {{ user.stats?.completed || 0 }}
            </span>
          </div>
          <div class="flex justify-between items-center border-t border-background-lighter pt-3">
            <span class="text-sm font-medium text-text-secondary">Total:</span>
            <span class="text-sm font-bold text-text-primary bg-background px-2 py-1 rounded">
              {{ user.stats?.total || 0 }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  users: {
    type: Array,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['refresh'])
</script>