<script setup>
import { ref, onMounted } from 'vue'

// Props recebidas do componente pai
const props = defineProps({
  user: {
    type: Object,
    required: true
  }
})

// Emits para comunicar com o componente pai
const emit = defineEmits(['logout'])

// Estados das tarefas
const tasks = ref([
  { id: 1, title: 'Configurar ambiente de desenvolvimento', description: 'Instalar Node.js, Vue.js e dependências', status: 'pending', priority: 'high' },
  { id: 2, title: 'Criar componente de login', description: 'Desenvolver formulário de autenticação', status: 'completed', priority: 'medium' },
  { id: 3, title: 'Implementar dashboard', description: 'Criar painel principal da aplicação', status: 'in-progress', priority: 'high' },
  { id: 4, title: 'Adicionar validação de formulários', description: 'Implementar validação nos campos', status: 'pending', priority: 'medium' },
  { id: 5, title: 'Configurar tema escuro', description: 'Aplicar paleta de cores personalizada', status: 'completed', priority: 'low' },
  { id: 6, title: 'Criar sistema de drag and drop', description: 'Implementar arrastar e soltar para tarefas', status: 'in-progress', priority: 'high' },
  { id: 7, title: 'Otimizar performance', description: 'Melhorar velocidade de carregamento', status: 'not-started', priority: 'low' },
  { id: 8, title: 'Adicionar testes unitários', description: 'Implementar testes para componentes', status: 'not-started', priority: 'medium' },
])

// Estados para drag and drop
const draggedTask = ref(null)
const showAddTaskModal = ref(false)
const newTask = ref({ title: '', description: '', priority: 'medium' })

// Estado local
const currentTime = ref(new Date().toLocaleString())

// Atualizar o tempo a cada segundo
setInterval(() => {
  currentTime.value = new Date().toLocaleString()
}, 1000)

// Funções para gerenciar tarefas
const getTasksByStatus = (status) => {
  return tasks.value.filter(task => task.status === status)
}

const handleDragStart = (event, task) => {
  draggedTask.value = task
  event.dataTransfer.effectAllowed = 'move'
}

const handleDragOver = (event) => {
  event.preventDefault()
  event.dataTransfer.dropEffect = 'move'
}

const handleDrop = (event, newStatus) => {
  event.preventDefault()
  if (draggedTask.value) {
    const taskIndex = tasks.value.findIndex(t => t.id === draggedTask.value.id)
    if (taskIndex !== -1) {
      tasks.value[taskIndex].status = newStatus
    }
    draggedTask.value = null
  }
}

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'high': return 'bg-red-500'
    case 'medium': return 'bg-yellow-500'
    case 'low': return 'bg-green-500'
    default: return 'bg-gray-500'
  }
}

const getStatusTitle = (status) => {
  switch (status) {
    case 'not-started': return 'Não Iniciadas'
    case 'in-progress': return 'Em Progresso'
    case 'pending': return 'Pendentes'
    case 'completed': return 'Concluídas'
    default: return 'Outras'
  }
}

const addNewTask = () => {
  if (newTask.value.title.trim()) {
    const newId = Math.max(...tasks.value.map(t => t.id)) + 1
    tasks.value.push({
      id: newId,
      title: newTask.value.title.trim(),
      description: newTask.value.description.trim(),
      status: 'not-started',
      priority: newTask.value.priority
    })
    newTask.value = { title: '', description: '', priority: 'medium' }
    showAddTaskModal.value = false
  }
}

const deleteTask = (taskId) => {
  tasks.value = tasks.value.filter(task => task.id !== taskId)
}

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
            <h1 class="text-2xl font-bold text-text-primary">Gerenciamento de Tarefas</h1>
          </div>
          <div class="flex items-center space-x-4">
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
        <!-- Welcome Card -->
        <div class="bg-background-light rounded-lg shadow p-6 mb-6 border border-background-lighter">
          <h2 class="text-xl font-semibold text-text-primary mb-2">
            Bem-vindo, {{ props.user.name || props.user.email }}!
          </h2>
          <p class="text-text-secondary">
            Gerencie suas tarefas arrastando-as entre as colunas
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
                draggable="true"
                @dragstart="handleDragStart($event, task)"
              >
                <div class="flex justify-between items-start mb-2">
                  <h4 class="text-sm font-medium text-text-primary">{{ task.title }}</h4>
                  <button
                    @click="deleteTask(task.id)"
                    class="text-red-400 hover:text-red-300 transition-colors"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
                <p class="text-xs text-text-secondary mb-2">{{ task.description }}</p>
                <div class="flex items-center justify-between">
                  <span :class="getPriorityColor(task.priority)" class="px-2 py-1 rounded-full text-xs text-white">
                    {{ task.priority }}
                  </span>
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
                  <button
                    @click="deleteTask(task.id)"
                    class="text-red-400 hover:text-red-300 transition-colors"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
                <p class="text-xs text-text-secondary mb-2">{{ task.description }}</p>
                <div class="flex items-center justify-between">
                  <span :class="getPriorityColor(task.priority)" class="px-2 py-1 rounded-full text-xs text-white">
                    {{ task.priority }}
                  </span>
                </div>
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
                  <button
                    @click="deleteTask(task.id)"
                    class="text-red-400 hover:text-red-300 transition-colors"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
                <p class="text-xs text-text-secondary mb-2">{{ task.description }}</p>
                <div class="flex items-center justify-between">
                  <span :class="getPriorityColor(task.priority)" class="px-2 py-1 rounded-full text-xs text-white">
                    {{ task.priority }}
                  </span>
                </div>
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
                  <button
                    @click="deleteTask(task.id)"
                    class="text-red-400 hover:text-red-300 transition-colors"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
                <p class="text-xs text-text-secondary mb-2 line-through">{{ task.description }}</p>
                <div class="flex items-center justify-between">
                  <span :class="getPriorityColor(task.priority)" class="px-2 py-1 rounded-full text-xs text-white">
                    {{ task.priority }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Modal para adicionar nova tarefa -->
    <div v-if="showAddTaskModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-background-light rounded-lg p-6 w-full max-w-md mx-4 border border-background-lighter">
        <h3 class="text-lg font-medium text-text-primary mb-4">Nova Tarefa</h3>
        <form @submit.prevent="addNewTask" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-text-secondary mb-1">Título</label>
            <input
              v-model="newTask.title"
              type="text"
              required
              class="w-full px-3 py-2 bg-background-lighter border border-background-lighter rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text-primary"
              placeholder="Digite o título da tarefa"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-text-secondary mb-1">Descrição</label>
            <textarea
              v-model="newTask.description"
              rows="3"
              class="w-full px-3 py-2 bg-background-lighter border border-background-lighter rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text-primary"
              placeholder="Digite a descrição da tarefa"
            ></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-text-secondary mb-1">Prioridade</label>
            <select
              v-model="newTask.priority"
              class="w-full px-3 py-2 bg-background-lighter border border-background-lighter rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text-primary"
            >
              <option value="low">Baixa</option>
              <option value="medium">Média</option>
              <option value="high">Alta</option>
            </select>
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
  </div>
</template>
