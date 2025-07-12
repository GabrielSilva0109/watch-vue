<template>
  <div class="min-h-screen bg-background">
    <!-- Header -->
    <header class="bg-background-light border-b border-background-lighter">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <div class="flex items-center space-x-4">
            <h1 class="text-2xl font-bold text-primary">Watch Tasks</h1>
            <span class="text-text-secondary">Bem-vindo, {{ user.name }}!</span>
          </div>
          <div class="flex items-center space-x-4">
            <button
              @click="toggleUsersList"
              class="text-text-secondary hover:text-text-primary transition-colors"
            >
              {{ showUsersList ? 'Ocultar' : 'Ver' }} Usuários
            </button>
            <button
              @click="showAddTaskModal = true"
              class="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-hover transition-colors"
            >
              Nova Tarefa
            </button>
            <button
              @click="$emit('logout')"
              class="text-text-secondary hover:text-text-primary transition-colors"
            >
              Sair
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-background-light p-6 rounded-lg border border-background-lighter">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
                <span class="text-white text-sm">📋</span>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-text-secondary">Total</p>
              <p class="text-2xl font-semibold text-text-primary">{{ tasks.length }}</p>
            </div>
          </div>
        </div>
        
        <div class="bg-background-light p-6 rounded-lg border border-background-lighter">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                <span class="text-white text-sm">⏳</span>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-text-secondary">Não Iniciadas</p>
              <p class="text-2xl font-semibold text-text-primary">{{ getTasksByStatus('not-started').length }}</p>
            </div>
          </div>
        </div>
        
        <div class="bg-background-light p-6 rounded-lg border border-background-lighter">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span class="text-white text-sm">🔄</span>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-text-secondary">Em Progresso</p>
              <p class="text-2xl font-semibold text-text-primary">{{ getTasksByStatus('in-progress').length }}</p>
            </div>
          </div>
        </div>
        
        <div class="bg-background-light p-6 rounded-lg border border-background-lighter">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span class="text-white text-sm">✅</span>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-text-secondary">Concluídas</p>
              <p class="text-2xl font-semibold text-text-primary">{{ getTasksByStatus('completed').length }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Users List -->
      <div v-if="showUsersList" class="mb-8">
        <div class="bg-background-light rounded-lg border border-background-lighter p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-text-primary">Usuários da Plataforma</h3>
            <button
              @click="loadUsers"
              class="text-primary hover:text-primary-hover transition-colors"
            >
              Atualizar
            </button>
          </div>
          
          <div v-if="usersLoading" class="text-center py-4">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          </div>
          
          <div v-else-if="users.length === 0" class="text-center py-4">
            <p class="text-text-muted">Nenhum usuário encontrado</p>
          </div>
          
          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-for="u in users" :key="u.id" class="bg-background p-4 rounded-lg border border-background-lighter">
              <div class="flex items-center mb-3">
                <div class="w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-3">
                  <span class="text-white text-lg">{{ u.name.charAt(0).toUpperCase() }}</span>
                </div>
                <div>
                  <h4 class="font-medium text-text-primary">{{ u.name }}</h4>
                  <p class="text-sm text-text-secondary">{{ u.email }}</p>
                </div>
              </div>
              
              <div class="space-y-2">
                <div class="flex justify-between items-center">
                  <span class="text-sm text-text-secondary">Não iniciadas:</span>
                  <span class="text-sm font-medium text-yellow-500">{{ u.stats?.not_started || 0 }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-sm text-text-secondary">Em progresso:</span>
                  <span class="text-sm font-medium text-blue-500">{{ u.stats?.in_progress || 0 }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-sm text-text-secondary">Concluídas:</span>
                  <span class="text-sm font-medium text-green-500">{{ u.stats?.completed || 0 }}</span>
                </div>
                <div class="flex justify-between items-center border-t border-background-lighter pt-2">
                  <span class="text-sm font-medium text-text-secondary">Total:</span>
                  <span class="text-sm font-bold text-text-primary">{{ u.stats?.total || 0 }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Task Error -->
      <div v-if="taskError" class="mb-4 bg-red-900/20 border border-red-600/30 p-4 rounded-lg">
        <p class="text-red-400">{{ taskError }}</p>
        <button
          @click="taskError = ''"
          class="text-red-300 hover:text-red-400 text-sm mt-2"
        >
          Fechar
        </button>
      </div>

      <!-- Kanban Board -->
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <!-- Não Iniciadas -->
        <div class="bg-background-light rounded-lg p-4 border border-background-lighter">
          <h3 class="font-semibold text-text-primary mb-4 flex items-center">
            <span class="w-3 h-3 bg-gray-500 rounded-full mr-2"></span>
            Não Iniciadas ({{ getTasksByStatus('not-started').length }})
          </h3>
          <div
            class="space-y-3 min-h-[400px]"
            @dragover="handleDragOver"
            @drop="handleDrop($event, 'not-started')"
          >
            <div
              v-for="task in getTasksByStatus('not-started')"
              :key="task.id"
              class="bg-background p-4 rounded-lg border border-background-lighter cursor-move"
              draggable="true"
              @dragstart="handleDragStart($event, task)"
            >
              <div class="flex justify-between items-start mb-2">
                <h4 class="font-medium text-text-primary">{{ task.title }}</h4>
                <button
                  @click="deleteTask(task.id)"
                  class="text-red-400 hover:text-red-300 ml-2"
                >
                  ✕
                </button>
              </div>
              <p class="text-sm text-text-secondary mb-2">{{ task.description }}</p>
              
              <!-- Categoria -->
              <div class="flex items-center mb-2">
                <span class="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                  {{ task.category || 'Geral' }}
                </span>
              </div>
              
              <!-- Dependência -->
              <div v-if="task.depends_on_task_id && task.dependency_info" class="mt-2 p-2 bg-red-900/20 border border-red-600/30 rounded">
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
          </div>
        </div>

        <!-- Em Progresso -->
        <div class="bg-background-light rounded-lg p-4 border border-background-lighter">
          <h3 class="font-semibold text-text-primary mb-4 flex items-center">
            <span class="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
            Em Progresso ({{ getTasksByStatus('in-progress').length }})
          </h3>
          <div
            class="space-y-3 min-h-[400px]"
            @dragover="handleDragOver"
            @drop="handleDrop($event, 'in-progress')"
          >
            <div
              v-for="task in getTasksByStatus('in-progress')"
              :key="task.id"
              class="bg-background p-4 rounded-lg border border-background-lighter cursor-move"
              draggable="true"
              @dragstart="handleDragStart($event, task)"
            >
              <div class="flex justify-between items-start mb-2">
                <h4 class="font-medium text-text-primary">{{ task.title }}</h4>
                <button
                  @click="deleteTask(task.id)"
                  class="text-red-400 hover:text-red-300 ml-2"
                >
                  ✕
                </button>
              </div>
              <p class="text-sm text-text-secondary mb-2">{{ task.description }}</p>
              
              <!-- Categoria -->
              <div class="flex items-center mb-2">
                <span class="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                  {{ task.category || 'Geral' }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Pendentes -->
        <div class="bg-background-light rounded-lg p-4 border border-background-lighter">
          <h3 class="font-semibold text-text-primary mb-4 flex items-center">
            <span class="w-3 h-3 bg-orange-500 rounded-full mr-2"></span>
            Pendentes ({{ getTasksByStatus('pending').length }})
          </h3>
          <div
            class="space-y-3 min-h-[400px]"
            @dragover="handleDragOver"
            @drop="handleDrop($event, 'pending')"
          >
            <div
              v-for="task in getTasksByStatus('pending')"
              :key="task.id"
              class="bg-background p-4 rounded-lg border border-background-lighter cursor-move"
              draggable="true"
              @dragstart="handleDragStart($event, task)"
            >
              <div class="flex justify-between items-start mb-2">
                <h4 class="font-medium text-text-primary">{{ task.title }}</h4>
                <button
                  @click="deleteTask(task.id)"
                  class="text-red-400 hover:text-red-300 ml-2"
                >
                  ✕
                </button>
              </div>
              <p class="text-sm text-text-secondary mb-2">{{ task.description }}</p>
              
              <!-- Categoria -->
              <div class="flex items-center mb-2">
                <span class="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                  {{ task.category || 'Geral' }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Concluídas -->
        <div class="bg-background-light rounded-lg p-4 border border-background-lighter">
          <h3 class="font-semibold text-text-primary mb-4 flex items-center">
            <span class="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
            Concluídas ({{ getTasksByStatus('completed').length }})
          </h3>
          <div
            class="space-y-3 min-h-[400px]"
            @dragover="handleDragOver"
            @drop="handleDrop($event, 'completed')"
          >
            <div
              v-for="task in getTasksByStatus('completed')"
              :key="task.id"
              class="bg-background p-4 rounded-lg border border-background-lighter cursor-move"
              draggable="true"
              @dragstart="handleDragStart($event, task)"
            >
              <div class="flex justify-between items-start mb-2">
                <h4 class="font-medium text-text-primary line-through opacity-75">{{ task.title }}</h4>
                <button
                  @click="deleteTask(task.id)"
                  class="text-red-400 hover:text-red-300 ml-2"
                >
                  ✕
                </button>
              </div>
              <p class="text-sm text-text-secondary mb-2 line-through opacity-75">{{ task.description }}</p>
              
              <!-- Categoria -->
              <div class="flex items-center mb-2">
                <span class="text-xs bg-primary/20 text-primary px-2 py-1 rounded opacity-75">
                  {{ task.category || 'Geral' }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Add Task Modal -->
    <div v-if="showAddTaskModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-background-light rounded-lg p-6 w-full max-w-md mx-4 border border-background-lighter">
        <h3 class="text-lg font-semibold text-text-primary mb-4">Nova Tarefa</h3>
        
        <form @submit.prevent="addNewTask" class="space-y-4">
          <div>
            <label class="block text-text-primary text-sm font-medium mb-1">
              Título
            </label>
            <input
              v-model="newTask.title"
              type="text"
              required
              class="w-full px-3 py-2 bg-background-lighter border border-background-lighter rounded-md text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Digite o título da tarefa"
            />
          </div>
          
          <div>
            <label class="block text-text-primary text-sm font-medium mb-1">
              Descrição
            </label>
            <textarea
              v-model="newTask.description"
              rows="3"
              class="w-full px-3 py-2 bg-background-lighter border border-background-lighter rounded-md text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Descreva a tarefa"
            ></textarea>
          </div>
          
          <div>
            <label class="block text-text-primary text-sm font-medium mb-1">
              Categoria
            </label>
            <select
              v-model="newTask.category"
              class="w-full px-3 py-2 bg-background-lighter border border-background-lighter rounded-md text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="geral">Geral</option>
              <option value="trabalho">Trabalho</option>
              <option value="pessoal">Pessoal</option>
              <option value="urgente">Urgente</option>
              <option value="projeto">Projeto</option>
            </select>
          </div>
          
          <div>
            <label class="block text-text-primary text-sm font-medium mb-1">
              <input
                v-model="newTask.hasDependency"
                type="checkbox"
                class="mr-2"
              />
              Esta tarefa depende de outra pessoa
            </label>
          </div>
          
          <div v-if="newTask.hasDependency" class="space-y-3 p-3 bg-background rounded border border-background-lighter">
            <div>
              <label class="block text-text-primary text-sm font-medium mb-1">
                Email do usuário
              </label>
              <input
                v-model="newTask.dependsOnUserEmail"
                type="email"
                class="w-full px-3 py-2 bg-background-lighter border border-background-lighter rounded-md text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="email@exemplo.com"
              />
            </div>
            
            <div>
              <label class="block text-text-primary text-sm font-medium mb-1">
                Título da tarefa dependente
              </label>
              <input
                v-model="newTask.dependencyTitle"
                type="text"
                class="w-full px-3 py-2 bg-background-lighter border border-background-lighter rounded-md text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Ex: Comprar ingredientes"
              />
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
              :disabled="taskLoading"
              class="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-hover transition-colors disabled:opacity-50"
            >
              {{ taskLoading ? 'Criando...' : 'Criar Tarefa' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  user: {
    type: Object,
    required: true
  }
})

defineEmits(['logout'])

// Estados
const tasks = ref([])
const users = ref([])
const showAddTaskModal = ref(false)
const showUsersList = ref(false)
const tasksLoading = ref(false)
const usersLoading = ref(false)
const taskLoading = ref(false)
const taskError = ref('')
const draggedTask = ref(null)

// Novo task
const newTask = ref({
  title: '',
  description: '',
  category: 'geral',
  hasDependency: false,
  dependsOnUserEmail: '',
  dependencyTitle: ''
})

// Carregar tarefas
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
  } catch (err) {
    taskError.value = err.message || 'Erro ao carregar tarefas'
  } finally {
    tasksLoading.value = false
  }
}

// Carregar usuários
const loadUsers = async () => {
  usersLoading.value = true
  
  try {
    const response = await fetch('http://localhost:3000/dev/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Erro ao carregar usuários')
    }

    users.value = data.users || []
  } catch (err) {
    console.error('Erro ao carregar usuários:', err)
  } finally {
    usersLoading.value = false
  }
}

// Filtrar tarefas por status
const getTasksByStatus = (status) => {
  return tasks.value.filter(task => task.status === status)
}

// Verificar se pode mover tarefa
const canMoveTask = (task, newStatus) => {
  if (!task.depends_on_task_id || !task.dependency_info) {
    return true
  }
  
  if (task.status === 'not-started' && newStatus !== 'not-started') {
    return task.dependency_info.completed === true
  }
  
  return true
}

// Drag and drop
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
      if (!canMoveTask(draggedTask.value, newStatus)) {
        const dependencyInfo = draggedTask.value.dependency_info
        taskError.value = `Esta tarefa depende de "${dependencyInfo.task_title}" (${dependencyInfo.user_name}). Aguarde a conclusão da tarefa dependente.`
        draggedTask.value = null
        return
      }

      const response = await fetch(`http://localhost:3000/dev/tasks/${draggedTask.value.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({
          status: newStatus
        })
      })

      if (!response.ok) {
        throw new Error('Erro ao atualizar tarefa')
      }

      await loadTasks()
      
    } catch (err) {
      taskError.value = err.message || 'Erro ao atualizar tarefa'
    }
    
    draggedTask.value = null
  }
}

// Adicionar nova tarefa
const addNewTask = async () => {
  if (!newTask.value.title) return

  taskLoading.value = true
  
  try {
    const taskData = {
      title: newTask.value.title,
      description: newTask.value.description,
      category: newTask.value.category,
      status: 'not-started'
    }

    if (newTask.value.hasDependency) {
      taskData.depends_on_user_email = newTask.value.dependsOnUserEmail
      taskData.dependency_title = newTask.value.dependencyTitle
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

    await loadTasks()
    
    // Limpar formulário
    newTask.value = {
      title: '',
      description: '',
      category: 'geral',
      hasDependency: false,
      dependsOnUserEmail: '',
      dependencyTitle: ''
    }
    
    showAddTaskModal.value = false
    
  } catch (err) {
    taskError.value = err.message || 'Erro ao criar tarefa'
  } finally {
    taskLoading.value = false
  }
}

// Deletar tarefa
const deleteTask = async (taskId) => {
  if (!confirm('Tem certeza que deseja deletar esta tarefa?')) return

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

    await loadTasks()
    
  } catch (err) {
    taskError.value = err.message || 'Erro ao deletar tarefa'
  }
}

// Toggle lista de usuários
const toggleUsersList = () => {
    showUsersList.value = !showUsersList.value
    if (showUsersList.value && users.value.length === 0) {
      loadUsers()
    }
  }

  // Carregar dados iniciais
  onMounted(() => {
    loadTasks()
  })
</script>