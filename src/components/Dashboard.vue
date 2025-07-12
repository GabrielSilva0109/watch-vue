<template>
  <div class="min-h-screen bg-background">
    <Header 
      :user="user" 
      :active-tab.sync="activeTab" 
      @logout="$emit('logout')"
      @tab-change="handleTabChange"
    />

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Tab Content: Tarefas -->
      <div v-if="activeTab === 'tasks'">
        <!-- Header da seção Tarefas -->
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-text-primary">Minhas Tarefas</h2>
          <button
            @click="showAddTaskModal = true"
            class="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-hover transition-colors"
          >
            Nova Tarefa
          </button>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatsCard 
            title="Total"
            :value="tasks.length"
            icon="📋"
            icon-bg-class="bg-blue-500"
          />

          <StatsCard 
            title="Não Iniciadas"
            :value="getTasksByStatus('not-started').length"
            icon="⏳"
            icon-bg-class="bg-yellow-500"
          />

          <StatsCard 
            title="Em Progresso"
            :value="getTasksByStatus('in-progress').length"
            icon="🔄"
            icon-bg-class="bg-blue-500"
          />
          
          <StatsCard 
            title="Concluídas"
            :value="getTasksByStatus('completed').length"
            icon="✅"
            icon-bg-class="bg-green-500"
          />
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
        <KanbanBoard
          :tasks="tasks"
          :updating-tasks="updatingTasks"
          :deleting-tasks="deletingTasks"
          @dragstart="handleDragStart"
          @delete="deleteTask"
          @drop="handleDrop"
          @edit="handleEditTask"
        />
      </div>

      <!-- Tab Content: Usuários -->
      <div v-if="activeTab === 'users'">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-text-primary">Usuários da Plataforma</h2>
          <button
            @click="loadUsers"
            class="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-hover transition-colors"
          >
            Atualizar
          </button>
        </div>
        
        <div v-if="usersLoading" class="text-center py-8">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p class="text-text-secondary mt-4">Carregando usuários...</p>
        </div>
        
        <div v-else-if="users.length === 0" class="text-center py-8">
          <p class="text-text-muted">Nenhum usuário encontrado</p>
        </div>
        
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="u in users" :key="u.id" class="bg-background-light p-6 rounded-lg border border-background-lighter">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4">
                <span class="text-white text-lg font-bold">{{ u.name.charAt(0).toUpperCase() }}</span>
              </div>
              <div>
                <h3 class="font-semibold text-text-primary">{{ u.name }}</h3>
                <p class="text-sm text-text-secondary">{{ u.email }}</p>
              </div>
            </div>
            
            <div class="space-y-3">
              <div class="flex justify-between items-center">
                <span class="text-sm text-text-secondary">Não iniciadas:</span>
                <span class="text-sm font-medium text-yellow-500 bg-yellow-500/20 px-2 py-1 rounded">
                  {{ u.stats?.not_started || 0 }}
                </span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-text-secondary">Em progresso:</span>
                <span class="text-sm font-medium text-blue-500 bg-blue-500/20 px-2 py-1 rounded">
                  {{ u.stats?.in_progress || 0 }}
                </span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-text-secondary">Pendentes:</span>
                <span class="text-sm font-medium text-orange-500 bg-orange-500/20 px-2 py-1 rounded">
                  {{ u.stats?.pending || 0 }}
                </span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-text-secondary">Concluídas:</span>
                <span class="text-sm font-medium text-green-500 bg-green-500/20 px-2 py-1 rounded">
                  {{ u.stats?.completed || 0 }}
                </span>
              </div>
              <div class="flex justify-between items-center border-t border-background-lighter pt-3">
                <span class="text-sm font-medium text-text-secondary">Total:</span>
                <span class="text-sm font-bold text-text-primary bg-background px-2 py-1 rounded">
                  {{ u.stats?.total || 0 }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tab Content: Relatórios -->
      <div v-if="activeTab === 'reports'">
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
              <div v-for="user in getMostActiveUsers()" :key="user.id" class="flex items-center justify-between">
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
              <div v-for="category in getCategoryDistribution()" :key="category.name" class="flex items-center justify-between">
                <span class="text-text-primary">{{ category.name.charAt(0).toUpperCase() + category.name.slice(1) }}</span>
                <div class="flex items-center">
                  <div class="w-20 h-2 bg-background-lighter rounded-full mr-3">
                    <div 
                      class="h-2 bg-primary rounded-full" 
                      :style="{ width: `${(category.count / getTotalTasks()) * 100}%` }"
                    ></div>
                  </div>
                  <span class="text-sm font-medium text-text-secondary">{{ category.count }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Add Task Modal -->
    <CreateTaskModal 
      :is-visible="showAddTaskModal"
      :is-loading="taskLoading"
      :editing-task="editingTask"
      :users="users"
      @close="closeTaskModal"
      @submit="handleTaskSubmit"
    />
  </div>
</template>

<script setup>

import { ref, onMounted, computed } from 'vue'
import Header from './Header.vue'
import CreateTaskModal from './CreateTaskModal.vue'
import StatsCard from './StatsCard.vue'
import KanbanBoard from './KanbanBoard.vue'

const props = defineProps({
  user: {
    type: Object,
    required: true
  }
})

defineEmits(['logout'])

// Estados
const activeTab = ref('tasks')
const tasks = ref([])
const users = ref([])
const showAddTaskModal = ref(false)
const tasksLoading = ref(false)
const usersLoading = ref(false)
const taskLoading = ref(false)
const taskError = ref('')
const draggedTask = ref(null)
const editingTask = ref(null)

// Estados de loading para operações específicas
const updatingTasks = ref([])
const deletingTasks = ref([])

const isEditingTask = computed(() => editingTask.value !== null)

const openEditModal = (task) => {
  editingTask.value = task
  showAddTaskModal.value = true
}

// Função para fechar modal
const closeTaskModal = () => {
  showAddTaskModal.value = false
  editingTask.value = null
}

// Handler para edição de tarefa
const handleEditTask = (task) => {
  openEditModal(task)
}
// Adicionar/Editar tarefa
const handleTaskSubmit = async (taskData) => {
  taskLoading.value = true
  
  try {
    const isEditing = editingTask.value !== null
    
    if (isEditing) {
      // Edição simples - não permite alterar dependência
      const url = `http://localhost:3000/dev/tasks/${editingTask.value.id}`
      
      const dataToSend = {
        title: taskData.title,
        description: taskData.description,
        category: taskData.category,
        status: taskData.status
      }
      
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(dataToSend)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao atualizar tarefa')
      }
    } else {
      // Criação nova - igual à função antiga
      const taskDataToSend = {
        title: taskData.title,
        description: taskData.description,
        category: taskData.category,
        status: 'not-started'
      }

      // Adicionar dados de dependência se existirem
      if (taskData.depends_on_user_email && taskData.dependency_title) {
        taskDataToSend.depends_on_user_email = taskData.depends_on_user_email
        taskDataToSend.dependency_title = taskData.dependency_title
      }

      console.log('📤 Dados enviados para o backend:', taskDataToSend)

      const response = await fetch('http://localhost:3000/dev/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(taskDataToSend)
      })

      const data = await response.json()
      console.log('📥 Resposta do backend:', data)

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao criar tarefa')
      }
    }

    await loadTasks()
    await loadUsers()
    closeTaskModal()
    
  } catch (err) {
    console.error('Erro completo:', err)
    taskError.value = err.message || `Erro ao ${editingTask.value ? 'atualizar' : 'criar'} tarefa`
  } finally {
    taskLoading.value = false
  }
}

// Função para tratar mudança de aba
const handleTabChange = (tab) => {
  activeTab.value = tab
}

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

    console.log('Dados recebidos:', data)

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

    users.value = (data.users || []).map(user => {
      const stats = {
        not_started: 0,
        in_progress: 0,
        pending: 0,
        completed: 0,
        total: user.tasks ? user.tasks.length : 0,
      }

      if (user.tasks && Array.isArray(user.tasks)) {
        user.tasks.forEach(task => {
          switch (task.status) {
            case 'not-started':
              stats.not_started++
              break
            case 'in-progress':
              stats.in_progress++
              break
            case 'completed':
              stats.completed++
              break
            case 'pending':
              stats.pending++
              break
          }
        })
      }

      return {
        ...user,
        stats,
      }
    })
  } catch (error) {
    console.error('Erro ao carregar usuários:', error)
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

const handleDrop = async (event, newStatus) => {
  event.preventDefault()
  if (draggedTask.value) {
    updatingTasks.value.push(draggedTask.value.id)
    try {
      if (!canMoveTask(draggedTask.value, newStatus)) {
        const dependencyInfo = draggedTask.value.dependency_info
        taskError.value = `Esta tarefa sds de "${dependencyInfo.task_title}" (${dependencyInfo.user_name}). Aguarde a conclusão da tarefa dependente.`
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
    updatingTasks.value = updatingTasks.value.filter(id => id !== draggedTask.value.id)
    draggedTask.value = null
  }
}

// Deletar tarefa
const deleteTask = async (taskId) => {
  if (!confirm('Tem certeza que deseja deletar esta tarefa?')) return

  deletingTasks.value.push(taskId)

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
  } finally {
    deletingTasks.value = deletingTasks.value.filter(id => id !== taskId)
  }
}

// Funções para relatórios
const getTotalTasks = () => {
  if (users.value.length === 0) return tasks.value.length
  return users.value.reduce((total, user) => total + (user.stats?.total || 0), 0)
}

const getMostActiveUsers = () => {
  return users.value
    .filter(user => user.stats && user.stats.total > 0)
    .sort((a, b) => (b.stats?.total || 0) - (a.stats?.total || 0))
    .slice(0, 5)
}

const getCategoryDistribution = () => {
  const categories = {}
  
  tasks.value.forEach(task => {
    const category = task.category || 'Geral'
    categories[category] = (categories[category] || 0) + 1
  })
  
  return Object.entries(categories)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
}

onMounted(() => {
  loadTasks()
  loadUsers()
})
</script>