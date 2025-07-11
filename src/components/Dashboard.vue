<script setup>
import { ref } from 'vue'

// Props recebidas do componente pai
const props = defineProps({
  user: {
    type: Object,
    required: true
  }
})

// Emits para comunicar com o componente pai
const emit = defineEmits(['logout'])

// Estado local
const currentTime = ref(new Date().toLocaleString())

// Atualizar o tempo a cada segundo
setInterval(() => {
  currentTime.value = new Date().toLocaleString()
}, 1000)

// Função de logout
const handleLogout = () => {
  emit('logout')
}
</script>

<template>
  <div class="min-h-screen bg-background">
    <!-- Header -->
    <header class="bg-background-light shadow-sm border-b border-background-lighter">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <div class="flex items-center">
            <h1 class="text-2xl font-bold text-text-primary">Dashboard</h1>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-sm text-text-secondary">{{ currentTime }}</span>
            <button
              @click="handleLogout"
              class="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-hover transition-colors"
            >
              Sair
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <!-- Welcome Card -->
        <div class="bg-background-light rounded-lg shadow p-6 mb-6 border border-background-lighter">
          <h2 class="text-xl font-semibold text-text-primary mb-2">
            Bem-vindo, {{ props.user.name || props.user.email }}!
          </h2>
          <p class="text-text-secondary">
            Você está logado como: <span class="font-medium text-primary">{{ props.user.email }}</span>
          </p>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div class="bg-background-light rounded-lg shadow p-6 border border-background-lighter">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-text-secondary">Total de Usuários</p>
                <p class="text-2xl font-bold text-text-primary">1,234</p>
              </div>
            </div>
          </div>

          <div class="bg-background-light rounded-lg shadow p-6 border border-background-lighter">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                </div>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-text-secondary">Vendas</p>
                <p class="text-2xl font-bold text-text-primary">R$ 12.345</p>
              </div>
            </div>
          </div>

          <div class="bg-background-light rounded-lg shadow p-6 border border-background-lighter">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-text-secondary">Atividade</p>
                <p class="text-2xl font-bold text-text-primary">89%</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="bg-background-light rounded-lg shadow border border-background-lighter">
          <div class="px-6 py-4 border-b border-background-lighter">
            <h3 class="text-lg font-medium text-text-primary">Atividade Recente</h3>
          </div>
          <div class="p-6">
            <div class="space-y-4">
              <div class="flex items-center space-x-3">
                <div class="flex-shrink-0">
                  <div class="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                    <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                  </div>
                </div>
                <div class="flex-1">
                  <p class="text-sm text-text-primary">Novo usuário registrado</p>
                  <p class="text-xs text-text-muted">2 minutos atrás</p>
                </div>
              </div>
              
              <div class="flex items-center space-x-3">
                <div class="flex-shrink-0">
                  <div class="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                    <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                </div>
                <div class="flex-1">
                  <p class="text-sm text-text-primary">Pagamento processado</p>
                  <p class="text-xs text-text-muted">5 minutos atrás</p>
                </div>
              </div>
              
              <div class="flex items-center space-x-3">
                <div class="flex-shrink-0">
                  <div class="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center">
                    <svg class="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.268 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                    </svg>
                  </div>
                </div>
                <div class="flex-1">
                  <p class="text-sm text-text-primary">Sistema necessita atualização</p>
                  <p class="text-xs text-text-muted">10 minutos atrás</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
