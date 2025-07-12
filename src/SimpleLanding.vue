<template>
  <div class="min-h-screen bg-background text-text-primary">
    <!-- Landing Page -->
    <div v-if="currentView === 'landing'" class="min-h-screen">
      <!-- Header/Navigation -->
      <header class="bg-background-light border-b border-background-lighter">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center py-4">
            <div class="flex items-center">
              <h1 class="text-2xl font-bold text-primary">Watch Tasks</h1>
            </div>
            <div class="flex items-center space-x-4">
              <button
                @click="switchToLogin"
                class="text-text-secondary hover:text-text-primary transition-colors"
              >
                Entrar
              </button>
              <button
                @click="switchToRegister"
                class="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-hover transition-colors"
              >
                Começar Grátis
              </button>
            </div>
          </div>
        </div>
      </header>

      <!-- Hero Section -->
      <section class="py-20 px-4 text-center">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-5xl font-bold text-text-primary mb-6">
            Organize suas tarefas com
            <span class="text-primary">simplicidade</span>
          </h2>
          <p class="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
            O Watch Tasks é a ferramenta perfeita para gerenciar seus projetos e tarefas de forma intuitiva. 
            Use nosso sistema Kanban para acompanhar o progresso em tempo real.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              @click="switchToRegister"
              class="bg-primary text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-primary-hover transition-colors"
            >
              Começar Agora - Grátis
            </button>
            <button
              @click="scrollToFeatures"
              class="border border-background-lighter text-text-primary px-8 py-3 rounded-lg text-lg font-semibold hover:bg-background-light transition-colors"
            >
              Saiba Mais
            </button>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section id="features" class="py-20 px-4 bg-background-light">
        <div class="max-w-6xl mx-auto">
          <h3 class="text-3xl font-bold text-text-primary text-center mb-12">
            Recursos Principais
          </h3>
          <div class="grid md:grid-cols-3 gap-8">
            <div class="bg-background p-6 rounded-lg shadow-lg">
              <div class="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                <span class="text-white text-xl">📋</span>
              </div>
              <h4 class="text-xl font-semibold text-text-primary mb-3">Kanban Board</h4>
              <p class="text-text-secondary">
                Visualize suas tarefas em um board intuitivo com drag-and-drop.
              </p>
            </div>
            <div class="bg-background p-6 rounded-lg shadow-lg">
              <div class="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                <span class="text-white text-xl">🔄</span>
              </div>
              <h4 class="text-xl font-semibold text-text-primary mb-3">Tempo Real</h4>
              <p class="text-text-secondary">
                Acompanhe o progresso das suas tarefas em tempo real.
              </p>
            </div>
            <div class="bg-background p-6 rounded-lg shadow-lg">
              <div class="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                <span class="text-white text-xl">🔒</span>
              </div>
              <h4 class="text-xl font-semibold text-text-primary mb-3">Segurança</h4>
              <p class="text-text-secondary">
                Seus dados estão protegidos com autenticação JWT e banco de dados seguro.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="py-20 px-4 bg-primary">
        <div class="max-w-4xl mx-auto text-center">
          <h3 class="text-3xl font-bold text-white mb-4">
            Pronto para começar?
          </h3>
          <p class="text-xl text-orange-100 mb-8">
            Junte-se a milhares de usuários que já organizaram suas tarefas conosco.
          </p>
          <button
            @click="switchToRegister"
            class="bg-white text-primary px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Começar Gratuitamente
          </button>
        </div>
      </section>

      <!-- Footer -->
      <footer class="bg-background-light border-t border-background-lighter py-8">
        <div class="max-w-6xl mx-auto px-4 text-center">
          <p class="text-text-secondary">
            © 2025 Watch Tasks. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>

    <!-- Login Page -->
    <div v-if="currentView === 'login'" class="flex items-center justify-center min-h-screen p-4">
      <div class="w-full max-w-md">
        <div class="text-center mb-8">
          <button 
            @click="switchToLanding"
            class="text-text-secondary hover:text-text-primary mb-4 inline-flex items-center"
          >
            ← Voltar ao início
          </button>
          <h1 class="text-4xl font-bold text-text-primary mb-2">Watch Tasks</h1>
          <p class="text-text-secondary">Faça login para continuar</p>
        </div>
        
        <!-- Formulário de Login Simples -->
        <div class="bg-background-light p-6 rounded-lg shadow-lg border border-background-lighter">
          <form @submit.prevent="handleLogin">
            <div class="mb-4">
              <label class="block text-text-secondary text-sm font-medium mb-2">
                Email
              </label>
              <input
                v-model="email"
                type="email"
                class="w-full px-3 py-2 border border-background-lighter rounded-md bg-background-lighter text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Digite seu email"
                required
              />
            </div>
            <div class="mb-6">
              <label class="block text-text-secondary text-sm font-medium mb-2">
                Senha
              </label>
              <input
                v-model="password"
                type="password"
                class="w-full px-3 py-2 border border-background-lighter rounded-md bg-background-lighter text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Digite sua senha"
                required
              />
            </div>
            <button
              type="submit"
              :disabled="loading"
              class="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background-light disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ loading ? 'Entrando...' : 'Entrar' }}
            </button>
          </form>
          
          <div class="text-center mt-4">
            <button
              @click="switchToRegister"
              class="text-primary hover:text-primary-hover underline"
            >
              Não tem uma conta? Cadastre-se
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Register Page -->
    <div v-if="currentView === 'register'" class="flex items-center justify-center min-h-screen p-4">
      <div class="w-full max-w-md">
        <div class="text-center mb-8">
          <button 
            @click="switchToLanding"
            class="text-text-secondary hover:text-text-primary mb-4 inline-flex items-center"
          >
            ← Voltar ao início
          </button>
          <h1 class="text-4xl font-bold text-text-primary mb-2">Watch Tasks</h1>
          <p class="text-text-secondary">Crie sua conta gratuitamente</p>
        </div>
        
        <!-- Formulário de Cadastro Simples -->
        <div class="bg-background-light p-6 rounded-lg shadow-lg border border-background-lighter">
          <form @submit.prevent="handleRegister">
            <div class="mb-4">
              <label class="block text-text-secondary text-sm font-medium mb-2">
                Nome
              </label>
              <input
                v-model="name"
                type="text"
                class="w-full px-3 py-2 border border-background-lighter rounded-md bg-background-lighter text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Digite seu nome"
                required
              />
            </div>
            <div class="mb-4">
              <label class="block text-text-secondary text-sm font-medium mb-2">
                Email
              </label>
              <input
                v-model="email"
                type="email"
                class="w-full px-3 py-2 border border-background-lighter rounded-md bg-background-lighter text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Digite seu email"
                required
              />
            </div>
            <div class="mb-6">
              <label class="block text-text-secondary text-sm font-medium mb-2">
                Senha
              </label>
              <input
                v-model="password"
                type="password"
                class="w-full px-3 py-2 border border-background-lighter rounded-md bg-background-lighter text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Digite sua senha"
                required
              />
            </div>
            <button
              type="submit"
              :disabled="loading"
              class="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background-light disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ loading ? 'Criando conta...' : 'Criar Conta' }}
            </button>
          </form>
          
          <div class="text-center mt-4">
            <button
              @click="switchToLogin"
              class="text-primary hover:text-primary-hover underline"
            >
              Já tem uma conta? Faça login
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Dashboard -->
    <div v-if="currentView === 'dashboard'" class="min-h-screen">
      <!-- Header -->
      <header class="bg-background-light shadow-sm border-b border-background-lighter">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center py-4">
            <div class="flex items-center">
              <h1 class="text-2xl font-bold text-primary">Gerenciamento de Tarefas</h1>
            </div>
            <div class="flex items-center space-x-4">
              <button
                @click="toggleUsersList"
                class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                </svg>
                <span>{{ showUsersList ? 'Ocultar' : 'Ver' }} Usuários</span>
              </button>
              <button
                @click="showAddTaskModal = true"
                class="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-hover transition-colors flex items-center space-x-2"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                <span>Nova Tarefa</span>
              </button>
              <span class="text-sm text-text-secondary">{{ currentTime }}</span>
              <button
                @click="handleLogout"
                class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
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
          <!-- Mensagem de erro -->
          <div v-if="taskError" class="mb-6 bg-red-900/20 border border-red-600/30 rounded-lg p-4">
            <div class="flex items-center">
              <svg class="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
              </svg>
              <span class="text-red-400">{{ taskError }}</span>
            </div>
          </div>

          <!-- Loading -->
          <div v-if="tasksLoading" class="mb-6 text-center">
            <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span class="ml-2 text-text-secondary">Carregando tarefas...</span>
          </div>

          <!-- Welcome Card -->
          <div class="bg-background-light rounded-lg shadow p-6 mb-6 border border-background-lighter">
            <h2 class="text-xl font-semibold text-text-primary mb-2">
              Bem-vindo, {{ user?.name || user?.email }}!
            </h2>
            <p class="text-text-secondary">
              Gerencie suas tarefas arrastando-as entre as colunas. Total de tarefas: {{ tasks.length }}
            </p>
          </div>

          <!-- Stats Cards -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div class="bg-background-light rounded-lg shadow p-6 border border-background-lighter">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                    </svg>
                  </div>
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium text-text-secondary">Não Iniciadas</p>
                  <p class="text-2xl font-bold text-text-primary">{{ getTasksByStatus('not-started').length }}</p>
                </div>
              </div>
            </div>

            <div class="bg-background-light rounded-lg shadow p-6 border border-background-lighter">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                  </div>
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium text-text-secondary">Em Progresso</p>
                  <p class="text-2xl font-bold text-text-primary">{{ getTasksByStatus('in-progress').length }}</p>
                </div>
              </div>
            </div>

            <div class="bg-background-light rounded-lg shadow p-6 border border-background-lighter">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium text-text-secondary">Pendentes</p>
                  <p class="text-2xl font-bold text-text-primary">{{ getTasksByStatus('pending').length }}</p>
                </div>
              </div>
            </div>

            <div class="bg-background-light rounded-lg shadow p-6 border border-background-lighter">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium text-text-secondary">Concluídas</p>
                  <p class="text-2xl font-bold text-text-primary">{{ getTasksByStatus('completed').length }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Lista de Usuários -->
          <div v-if="showUsersList" class="mb-6">
            <div class="bg-background-light rounded-lg shadow border border-background-lighter">
              <div class="p-4 border-b border-background-lighter">
                <h3 class="text-lg font-medium text-text-primary flex items-center">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                  Usuários da Plataforma
                </h3>
              </div>

              <!-- Loading -->
              <div v-if="usersLoading" class="p-6 text-center">
                <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <span class="ml-2 text-text-secondary">Carregando usuários...</span>
              </div>

              <!-- Error -->
              <div v-if="usersError" class="p-4 bg-red-900/20 border border-red-600/30 rounded-lg m-4">
                <p class="text-red-400">{{ usersError }}</p>
              </div>

              <!-- Lista de Usuários -->
              <div v-if="!usersLoading && !usersError" class="p-4">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div
                    v-for="user in users"
                    :key="user.id"
                    class="bg-background p-4 rounded-lg border border-background-lighter hover:border-primary/30 transition-colors"
                  >
                    <div class="flex items-center mb-3">
                      <div class="w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-3">
                        <span class="text-white font-semibold">{{ user.name?.charAt(0)?.toUpperCase() || 'U' }}</span>
                      </div>
                      <div>
                        <h4 class="text-sm font-medium text-text-primary">{{ user.name }}</h4>
                        <p class="text-xs text-text-secondary">{{ user.email }}</p>
                      </div>
                    </div>
                    
                    <div class="space-y-2">
                      <div class="flex items-center justify-between">
                        <span class="text-xs text-text-secondary">Total de Tarefas</span>
                        <span class="text-sm font-semibold text-text-primary">{{ getUserTaskStats(user.id).total }}</span>
                      </div>
                      
                      <div class="grid grid-cols-4 gap-2 text-xs">
                        <div class="text-center">
                          <div class="w-3 h-3 bg-blue-500 rounded-full mx-auto mb-1"></div>
                          <span class="text-text-secondary">{{ getUserTaskStats(user.id)['not-started'] }}</span>
                        </div>
                        <div class="text-center">
                          <div class="w-3 h-3 bg-yellow-500 rounded-full mx-auto mb-1"></div>
                          <span class="text-text-secondary">{{ getUserTaskStats(user.id)['in-progress'] }}</span>
                        </div>
                        <div class="text-center">
                          <div class="w-3 h-3 bg-orange-500 rounded-full mx-auto mb-1"></div>
                          <span class="text-text-secondary">{{ getUserTaskStats(user.id)['pending'] }}</span>
                        </div>
                        <div class="text-center">
                          <div class="w-3 h-3 bg-green-500 rounded-full mx-auto mb-1"></div>
                          <span class="text-text-secondary">{{ getUserTaskStats(user.id)['completed'] }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div v-if="users.length === 0" class="text-center py-8">
                  <p class="text-text-secondary">Nenhum usuário encontrado.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Kanban Board -->
          <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <!-- Não Iniciadas -->
            <div class="bg-background-light rounded-lg shadow border border-background-lighter">
              <div class="p-4 border-b border-background-lighter">
                <h3 class="text-lg font-medium text-text-primary flex items-center">
                  <div class="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  Não Iniciadas
                </h3>
              </div>
              <div 
                class="p-4 min-h-[400px]"
                @dragover="handleDragOver"
                @drop="handleDrop($event, 'not-started')"
              >
                <div
                  v-for="task in getTasksByStatus('not-started')"
                  :key="task.id"
                  class="mb-3 p-3 bg-background-lighter rounded-lg border border-background-lighter hover:border-primary/50 cursor-move transition-colors"
                  :class="{ 'border-orange-400 bg-orange-50': task.is_blocked }"
                  draggable="true"
                  @dragstart="handleDragStart($event, task)"
                >
                  <div class="flex justify-between items-start mb-2">
                    <h4 class="text-sm font-medium text-text-primary">{{ task.title }}</h4>
                    <div class="flex items-center space-x-2">
                      <span v-if="task.category" class="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                        {{ task.category }}
                      </span>
                      <button
                        @click="deleteTask(task.id)"
                        class="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <p class="text-xs text-text-secondary mb-2">{{ task.description }}</p>
                  
                  <!-- Informações de dependência -->
                  <div v-if="task.dependency_info" class="mt-2 p-2 bg-orange-50 border border-orange-200 rounded text-xs">
                    <div class="flex items-center mb-1">
                      <svg class="w-3 h-3 text-orange-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 15.5c-.77.833.192 2.5 1.732 2.5z"></path>
                      </svg>
                      <span class="text-orange-700 font-medium">Dependência:</span>
                    </div>
                    <p class="text-orange-600">
                      Aguardando {{ task.dependency_info.user_name }} concluir: "{{ task.dependency_info.task_title }}"
                    </p>
                    <div class="mt-1 flex items-center">
                      <div class="w-2 h-2 rounded-full mr-2" :class="task.dependency_info.completed ? 'bg-green-500' : 'bg-red-500'"></div>
                      <span :class="task.dependency_info.completed ? 'text-green-600' : 'text-red-600'">
                        {{ task.dependency_info.completed ? 'Concluída' : 'Pendente' }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Em Progresso -->
            <div class="bg-background-light rounded-lg shadow border border-background-lighter">
              <div class="p-4 border-b border-background-lighter">
                <h3 class="text-lg font-medium text-text-primary flex items-center">
                  <div class="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  Em Progresso
                </h3>
              </div>
              <div 
                class="p-4 min-h-[400px]"
                @dragover="handleDragOver"
                @drop="handleDrop($event, 'in-progress')"
              >
                <div
                  v-for="task in getTasksByStatus('in-progress')"
                  :key="task.id"
                  class="mb-3 p-3 bg-background-lighter rounded-lg border border-background-lighter hover:border-primary/50 cursor-move transition-colors"
                  draggable="true"
                  @dragstart="handleDragStart($event, task)"
                >
                  <div class="flex justify-between items-start mb-2">
                    <h4 class="text-sm font-medium text-text-primary">{{ task.title }}</h4>
                    <div class="flex items-center space-x-2">
                      <span v-if="task.category" class="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                        {{ task.category }}
                      </span>
                      <button
                        @click="deleteTask(task.id)"
                        class="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <p class="text-xs text-text-secondary mb-2">{{ task.description }}</p>
                </div>
              </div>
            </div>

            <!-- Pendentes -->
            <div class="bg-background-light rounded-lg shadow border border-background-lighter">
              <div class="p-4 border-b border-background-lighter">
                <h3 class="text-lg font-medium text-text-primary flex items-center">
                  <div class="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                  Pendentes
                </h3>
              </div>
              <div 
                class="p-4 min-h-[400px]"
                @dragover="handleDragOver"
                @drop="handleDrop($event, 'pending')"
              >
                <div
                  v-for="task in getTasksByStatus('pending')"
                  :key="task.id"
                  class="mb-3 p-3 bg-background-lighter rounded-lg border border-background-lighter hover:border-primary/50 cursor-move transition-colors"
                  draggable="true"
                  @dragstart="handleDragStart($event, task)"
                >
                  <div class="flex justify-between items-start mb-2">
                    <h4 class="text-sm font-medium text-text-primary">{{ task.title }}</h4>
                    <div class="flex items-center space-x-2">
                      <span v-if="task.category" class="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                        {{ task.category }}
                      </span>
                      <button
                        @click="deleteTask(task.id)"
                        class="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <p class="text-xs text-text-secondary mb-2">{{ task.description }}</p>
                </div>
              </div>
            </div>

            <!-- Concluídas -->
            <div class="bg-background-light rounded-lg shadow border border-background-lighter">
              <div class="p-4 border-b border-background-lighter">
                <h3 class="text-lg font-medium text-text-primary flex items-center">
                  <div class="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  Concluídas
                </h3>
              </div>
              <div 
                class="p-4 min-h-[400px]"
                @dragover="handleDragOver"
                @drop="handleDrop($event, 'completed')"
              >
                <div
                  v-for="task in getTasksByStatus('completed')"
                  :key="task.id"
                  class="mb-3 p-3 bg-background-lighter rounded-lg border border-background-lighter hover:border-primary/50 cursor-move transition-colors opacity-75"
                  draggable="true"
                  @dragstart="handleDragStart($event, task)"
                >
                  <div class="flex justify-between items-start mb-2">
                    <h4 class="text-sm font-medium text-text-primary line-through">{{ task.title }}</h4>
                    <div class="flex items-center space-x-2">
                      <span v-if="task.category" class="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                        {{ task.category }}
                      </span>
                      <button
                        @click="deleteTask(task.id)"
                        class="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <p class="text-xs text-text-secondary mb-2 line-through">{{ task.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- Modal para adicionar nova tarefa -->
    <div v-if="showAddTaskModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-background-light rounded-lg p-6 w-full max-w-md mx-4 border border-background-lighter">
        <h3 class="text-lg font-medium text-text-primary mb-4">Nova Tarefa</h3>
        <form @submit.prevent="addNewTask" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-text-secondary mb-1">Título</label>
            <input
              v-model="newTaskTitle"
              type="text"
              required
              class="w-full px-3 py-2 bg-background-lighter border border-background-lighter rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text-primary"
              placeholder="Digite o título da tarefa"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-text-secondary mb-1">Descrição</label>
            <textarea
              v-model="newTaskDescription"
              rows="3"
              class="w-full px-3 py-2 bg-background-lighter border border-background-lighter rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text-primary"
              placeholder="Digite a descrição da tarefa"
            ></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-text-secondary mb-1">Categoria</label>
            <select
              v-model="newTaskCategory"
              class="w-full px-3 py-2 bg-background-lighter border border-background-lighter rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text-primary"
            >
              <option value="geral">Geral</option>
              <option value="trabalho">Trabalho</option>
              <option value="pessoal">Pessoal</option>
              <option value="estudos">Estudos</option>
              <option value="saúde">Saúde</option>
              <option value="urgente">Urgente</option>
            </select>
          </div>
          
          <!-- Seção de Dependências -->
          <div class="border-t border-background-lighter pt-4">
            <div class="flex items-center mb-2">
              <input
                v-model="hasDependency"
                type="checkbox"
                id="has-dependency"
                class="mr-2"
              />
              <label for="has-dependency" class="text-sm font-medium text-text-secondary">
                Esta tarefa depende de outra pessoa
              </label>
            </div>
            
            <div v-if="hasDependency" class="space-y-3 mt-3">
              <div>
                <label class="block text-sm font-medium text-text-secondary mb-1">
                  Email do usuário dependente
                </label>
                <input
                  v-model="dependencyUserEmail"
                  type="email"
                  class="w-full px-3 py-2 bg-background-lighter border border-background-lighter rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text-primary"
                  placeholder="ex: usuario@exemplo.com"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-text-secondary mb-1">
                  Tarefa que o usuário deve fazer
                </label>
                <input
                  v-model="dependencyTaskTitle"
                  type="text"
                  class="w-full px-3 py-2 bg-background-lighter border border-background-lighter rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text-primary"
                  placeholder="ex: Comprar ingredientes"
                />
              </div>
              <div class="text-xs text-text-secondary bg-blue-50 p-2 rounded">
                💡 Uma tarefa será criada automaticamente para este usuário
              </div>
            </div>
          </div>
          
          <div class="flex justify-end space-x-3">
            <button
              type="button"
              @click="showAddTaskModal = false"
              class="px-4 py-2 text-text-secondary hover:text-text-primary transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover transition-colors"
            >
              Adicionar
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Loading e Error -->
    <div v-if="loading" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-background-light p-6 rounded-lg">
        <p class="text-text-primary">Carregando...</p>
      </div>
    </div>
    
    <div v-if="error" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-red-900/20 border border-red-600/30 p-6 rounded-lg max-w-md">
        <p class="text-red-400 mb-4">{{ error }}</p>
        <button
          @click="error = ''"
          class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
        >
          Fechar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Estados da aplicação
const currentView = ref('landing') // Começar com landing page
const user = ref(null)
const loading = ref(false)
const error = ref('')

// Campos do formulário
const name = ref('')
const email = ref('')
const password = ref('')

// Estados para gerenciamento de tarefas
const tasks = ref([])
const tasksLoading = ref(false)
const taskError = ref('')
const showAddTaskModal = ref(false)
const newTaskTitle = ref('')
const newTaskDescription = ref('')
const newTaskCategory = ref('geral')
const hasDependency = ref(false)
const dependencyUserEmail = ref('')
const dependencyTaskTitle = ref('')
const draggedTask = ref(null)
const currentTime = ref(new Date().toLocaleString())

// Estados para gerenciamento de usuários
const users = ref([])
const usersLoading = ref(false)
const usersError = ref('')
const showUsersList = ref(false)

// Atualizar o tempo a cada segundo
setInterval(() => {
  currentTime.value = new Date().toLocaleString()
}, 1000)

// Verificar se há um usuário logado ao carregar a aplicação
onMounted(async () => {
  const savedUser = localStorage.getItem('user')
  const token = localStorage.getItem('authToken')
  
  if (savedUser && token) {
    user.value = JSON.parse(savedUser)
    currentView.value = 'dashboard'
    // Carregar tarefas do usuário
    await loadTasks()
  }
})

// Funções para alternar entre telas
const switchToLanding = () => {
  currentView.value = 'landing'
  clearForm()
}

const switchToLogin = () => {
  currentView.value = 'login'
  clearForm()
}

const switchToRegister = () => {
  currentView.value = 'register'
  clearForm()
}

const clearForm = () => {
  name.value = ''
  email.value = ''
  password.value = ''
  error.value = ''
}

// Função de login
const handleLogin = async () => {
  if (!email.value || !password.value) {
    error.value = 'Por favor, preencha todos os campos'
    return
  }

  loading.value = true
  error.value = ''

  try {
    const response = await fetch('http://localhost:3000/dev/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Erro no login')
    }

    // Salvar dados
    localStorage.setItem('authToken', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))

    user.value = data.user
    currentView.value = 'dashboard'
    clearForm()

    // Carregar tarefas do usuário
    await loadTasks()

  } catch (err) {
    error.value = err.message || 'Erro ao fazer login'
  } finally {
    loading.value = false
  }
}

// Função de cadastro
const handleRegister = async () => {
  if (!name.value || !email.value || !password.value) {
    error.value = 'Por favor, preencha todos os campos'
    return
  }

  loading.value = true
  error.value = ''

  try {
    const response = await fetch('http://localhost:3000/dev/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        password: password.value
      })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Erro no cadastro')
    }

    // Salvar dados
    localStorage.setItem('authToken', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))

    user.value = data.user
    currentView.value = 'dashboard'
    clearForm()

    // Carregar tarefas do usuário
    await loadTasks()

  } catch (err) {
    error.value = err.message || 'Erro ao criar conta'
  } finally {
    loading.value = false
  }
}

// Função de logout
const handleLogout = () => {
  localStorage.removeItem('authToken')
  localStorage.removeItem('user')
  user.value = null
  currentView.value = 'landing'
}

// Função para scroll suave para features
const scrollToFeatures = () => {
  const element = document.getElementById('features')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

// Funções para gerenciar tarefas
const loadTasks = async () => {
  tasksLoading.value = true
  taskError.value = ''
  
  try {
    const response = await fetch('http://localhost:3000/dev/tasks', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Erro ao carregar tarefas')
    }

    tasks.value = data.tasks || []
    console.log('Tarefas carregadas:', tasks.value)
  } catch (err) {
    taskError.value = err.message || 'Erro ao carregar tarefas'
    console.error('Erro ao carregar tarefas:', err)
  } finally {
    tasksLoading.value = false
  }
}

const getTasksByStatus = (status) => {
  return tasks.value.filter(task => task.status === status)
}

const canMoveTask = (task, newStatus) => {
  // Se a tarefa não tem dependências, pode ser movida
  if (!task.depends_on_task_id || !task.dependency_info) {
    return true;
  }
  
  // Se está tentando sair do estado 'not-started', verifica dependências
  if (task.status === 'not-started' && newStatus !== 'not-started') {
    return task.dependency_info.completed === true;
  }
  
  // Para outros casos, permite a movimentação
  return true;
}

const handleDragStart = (event, task) => {
  draggedTask.value = task
  event.dataTransfer.effectAllowed = 'move'
}

const handleDragOver = (event) => {
  event.preventDefault()
  event.dataTransfer.dropEffect = 'move'
}

const handleDrop = async (event, newStatus) => {
  event.preventDefault()
  if (draggedTask.value) {
    try {
      // Verificar se a tarefa pode ser movida (dependências)
      if (!canMoveTask(draggedTask.value, newStatus)) {
        const dependencyInfo = draggedTask.value.dependency_info;
        taskError.value = `Esta tarefa depende de "${dependencyInfo.task_title}" (${dependencyInfo.user_name}). Aguarde a conclusão da tarefa dependente.`;
        draggedTask.value = null;
        return;
      }

      const response = await fetch(`http://localhost:3000/dev/tasks/${draggedTask.value.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({ status: newStatus })
      })

      if (!response.ok) {
        throw new Error('Erro ao atualizar tarefa')
      }
      
      // Atualizar no frontend
      const taskIndex = tasks.value.findIndex(t => t.id === draggedTask.value.id)
      if (taskIndex !== -1) {
        tasks.value[taskIndex].status = newStatus
      }
      
      console.log('Tarefa atualizada:', draggedTask.value.id, 'para', newStatus)
    } catch (err) {
      taskError.value = err.message || 'Erro ao atualizar tarefa'
      console.error('Erro ao atualizar tarefa:', err)
    }
    
    draggedTask.value = null
  }
}

const addNewTask = async () => {
  if (newTaskTitle.value.trim()) {
    try {
      const taskData = {
        title: newTaskTitle.value.trim(),
        description: newTaskDescription.value.trim(),
        status: 'not-started',
        category: newTaskCategory.value
      }

      // Adicionar dependências se existirem
      if (hasDependency.value && dependencyUserEmail.value && dependencyTaskTitle.value) {
        taskData.depends_on_user_email = dependencyUserEmail.value
        taskData.dependency_title = dependencyTaskTitle.value
      }

      const response = await fetch('http://localhost:3000/dev/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(taskData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao criar tarefa')
      }
      
      // Adicionar a nova tarefa à lista
      tasks.value.push(data.task)
      
      // Limpar o formulário
      newTaskTitle.value = ''
      newTaskDescription.value = ''
      newTaskCategory.value = 'geral'
      hasDependency.value = false
      dependencyUserEmail.value = ''
      dependencyTaskTitle.value = ''
      showAddTaskModal.value = false
      
      // Mostrar mensagem se tarefa de dependência foi criada
      if (data.dependency_created) {
        taskError.value = ''
        // Mostrar sucesso por alguns segundos
        setTimeout(() => {
          taskError.value = data.message || 'Tarefa criada com sucesso!'
          setTimeout(() => {
            taskError.value = ''
          }, 3000)
        }, 100)
      }
      
      console.log('Nova tarefa criada:', data.task)
    } catch (err) {
      taskError.value = err.message || 'Erro ao criar tarefa'
      console.error('Erro ao criar tarefa:', err)
    }
  }
}

const deleteTask = async (taskId) => {
  try {
    const response = await fetch(`http://localhost:3000/dev/tasks/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    })

    if (!response.ok) {
      throw new Error('Erro ao deletar tarefa')
    }

    tasks.value = tasks.value.filter(task => task.id !== taskId)
    console.log('Tarefa deletada:', taskId)
  } catch (err) {
    taskError.value = err.message || 'Erro ao deletar tarefa'
    console.error('Erro ao deletar tarefa:', err)
  }
}

const loadUsers = async () => {
  usersLoading.value = true
  usersError.value = ''
  
  try {
    // Carregar usuários
    const usersResponse = await fetch('http://localhost:3000/dev/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    })

    const usersData = await usersResponse.json()

    if (!usersResponse.ok) {
      throw new Error(usersData.message || 'Erro ao carregar usuários')
    }

    users.value = usersData.users || []
    
    // Carregar todas as tarefas de todos os usuários para calcular estatísticas
    const allTasksResponse = await fetch('http://localhost:3000/dev/tasks/all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    })

    if (allTasksResponse.ok) {
      const allTasksData = await allTasksResponse.json()
      // Armazenar todas as tarefas em uma variável separada para cálculos
      window.allUsersTasks = allTasksData.tasks || []
    }
    
    console.log('Usuários carregados:', users.value)
  } catch (err) {
    usersError.value = err.message || 'Erro ao carregar usuários'
    console.error('Erro ao carregar usuários:', err)
  } finally {
    usersLoading.value = false
  }
}

const toggleUsersList = () => {
  showUsersList.value = !showUsersList.value
  if (showUsersList.value && users.value.length === 0) {
    loadUsers()
  }
}

const getUserTaskStats = (userId) => {
  // Usar todas as tarefas para calcular estatísticas, não apenas as do usuário atual
  const allTasks = window.allUsersTasks || []
  const userTasks = allTasks.filter(task => task.user_id === userId)
  
  return {
    total: userTasks.length,
    'not-started': userTasks.filter(t => t.status === 'not-started').length,
    'in-progress': userTasks.filter(t => t.status === 'in-progress').length,
    'pending': userTasks.filter(t => t.status === 'pending').length,
    'completed': userTasks.filter(t => t.status === 'completed').length
  }
}
</script>
