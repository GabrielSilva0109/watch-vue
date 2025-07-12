<template>
  <div>
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-text-primary mb-2">Relatórios</h2>
      <p class="text-text-secondary">Análise geral da plataforma</p>
    </div>

    <!-- Estatísticas Gerais -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatsCard 
        title="Total de Usuários"
        :value="users.length"
        icon="👥"
        icon-bg-class="bg-blue-500"
      />

      <StatsCard 
        title="Total de Tarefas"
        :value="getTotalTasks()"
        icon="📊"
        icon-bg-class="bg-green-500"
      />

      <StatsCard 
        title="Tarefas Pendentes"
        :value="getTasksByStatus('pending').length"
        icon="⏳"
        icon-bg-class="bg-yellow-500"
      />

      <StatsCard 
        title="Tarefas Concluídas"
        :value="getTasksByStatus('completed').length"
        icon="✅"
        icon-bg-class="bg-green-500"
      />
    </div>

    <!-- Gráficos e Análises -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Usuários Mais Ativos -->
      <div class="bg-background-light p-6 rounded-lg border border-background-lighter">
        <h3 class="text-lg font-semibold text-text-primary mb-4">Usuários Mais Ativos</h3>
        <div class="space-y-3">
          <div v-if="getMostActiveUsers().length === 0" class="text-center py-4">
            <p class="text-text-secondary">Nenhum usuário ativo</p>
          </div>
          <div v-else v-for="user in getMostActiveUsers()" :key="user.id" class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-3">
                <span class="text-white text-sm">{{ user.name.charAt(0).toUpperCase() }}</span>
              </div>
              <span class="text-text-primary">{{ user.name }}</span>
            </div>
            <span class="text-sm font-medium text-text-secondary">{{ user.stats?.total || 0 }} tarefas</span>
          </div>
        </div>
      </div>

      <!-- Distribuição por Categoria -->
      <div class="bg-background-light p-6 rounded-lg border border-background-lighter">
        <h3 class="text-lg font-semibold text-text-primary mb-4">Tarefas por Categoria</h3>
        <div class="space-y-3">
          <div v-if="getCategoryDistribution().length === 0" class="text-center py-4">
            <p class="text-text-secondary">Nenhuma tarefa cadastrada</p>
          </div>
          <div v-else v-for="category in getCategoryDistribution()" :key="category.name" class="flex items-center justify-between">
            <span class="text-text-primary">{{ category.name.charAt(0).toUpperCase() + category.name.slice(1) }}</span>
            <div class="flex items-center">
              <div class="w-20 h-2 bg-background-lighter rounded-full mr-3">
                <div 
                  class="h-2 bg-primary rounded-full" 
                  :style="{ width: `${getTotalTasks() > 0 ? (category.count / getTotalTasks()) * 100 : 0}%` }"
                ></div>
              </div>
              <span class="text-sm font-medium text-text-secondary">{{ category.count }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import StatsCard from './StatsCard.vue'

const props = defineProps({
  users: {
    type: Array,
    required: true
  },
  tasks: {
    type: Array,
    required: true
  }
})

// Computeds para as funções de relatório
const getTotalTasks = () => {
  if (props.users.length === 0) return props.tasks.length
  return props.users.reduce((total, user) => total + (user.stats?.total || 0), 0)
}

const getTasksByStatus = (status) => {
  return props.tasks.filter(task => task.status === status)
}

const getMostActiveUsers = () => {
  return props.users
    .filter(user => user.stats && user.stats.total > 0)
    .sort((a, b) => (b.stats?.total || 0) - (a.stats?.total || 0))
    .slice(0, 5)
}

const getCategoryDistribution = () => {
  const categories = {}
  
  props.tasks.forEach(task => {
    const category = task.category || 'Geral'
    categories[category] = (categories[category] || 0) + 1
  })
  
  return Object.entries(categories)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
}
</script>