<template>
  <header class="bg-background-light border-b border-background-lighter">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center py-4">
        <div class="flex items-center space-x-4">
          <h1 class="text-2xl font-bold text-primary">Watch Tasks</h1>
          <span class="text-text-secondary">Bem-vindo, {{ user.name }}!</span>
        </div>
        <div class="flex items-center space-x-4">
          <button
            @click="$emit('logout')"
            class="text-text-secondary hover:text-text-primary transition-colors"
          >
            Sair
          </button>
        </div>
      </div>
      
      <!-- Navigation Tabs -->
      <div class="border-b border-background-lighter">
        <nav class="flex space-x-8">
          <button
            @click="$emit('tab-change', 'tasks')"
            :class="[
              'py-2 px-1 border-b-2 font-medium text-sm transition-colors',
              activeTab === 'tasks' 
                ? 'border-primary text-primary' 
                : 'border-transparent text-text-secondary hover:text-text-primary hover:border-background-lighter'
            ]"
          >
            Tarefas
          </button>
          <button
            @click="$emit('tab-change', 'users')"
            :class="[
              'py-2 px-1 border-b-2 font-medium text-sm transition-colors',
              activeTab === 'users' 
                ? 'border-primary text-primary' 
                : 'border-transparent text-text-secondary hover:text-text-primary hover:border-background-lighter'
            ]"
          >
            Usuários
          </button>
          <button
            @click="$emit('tab-change', 'reports')"
            :class="[
              'py-2 px-1 border-b-2 font-medium text-sm transition-colors',
              activeTab === 'reports' 
                ? 'border-primary text-primary' 
                : 'border-transparent text-text-secondary hover:text-text-primary hover:border-background-lighter'
            ]"
          >
            Relatórios
          </button>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
    const props = defineProps({
    user: {
        type: Object,
        required: true
    },
    activeTab: {
        type: String,
        required: true
    }
    })

    defineEmits(['logout', 'tab-change'])
</script>