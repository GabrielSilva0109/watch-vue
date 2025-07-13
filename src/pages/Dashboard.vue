<template>
  <div class="min-h-screen bg-background">
    <Header 
      :user="user" 
      :active-tab.sync="activeTab" 
      @logout="$emit('logout')"
      @tab-change="handleTabChange"
      @user-update="handleUserUpdate"
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
      <UsersTab 
        v-if="activeTab === 'users'"
        :users="users"
        :loading="usersLoading"
        @refresh="loadUsers"
      />

      <!-- Tab Content: Relatórios -->
      <ReportsTab 
        v-if="activeTab === 'reports'"
        :users="users"
        :tasks="tasks"
      />
    </main>

    <!-- Add Task Modal -->
    <CreateTaskModal 
      :is-visible="showAddTaskModal"
      :is-loading="taskLoading"
      :editing-task="editingTask"
      :users="users"
      :current-user="user"
      @close="closeTaskModal"
      @submit="handleTaskSubmit"
    />
  </div>
</template>

<script setup>

import { ref, onMounted, computed } from 'vue'
import Header from '../components/Header.vue'
import CreateTaskModal from '../components/CreateTaskModal.vue'
import StatsCard from '../components/StatsCard.vue'
import KanbanBoard from '../components/KanbanBoard.vue'
import UsersTab from '../components/UsersTab.vue'
import ReportsTab from '../components/ReportsTab.vue'

const props = defineProps({
  user: {
    type: Object,
    required: true
  }
})

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

const emit = defineEmits(['logout', 'user-update'])

function handleUserUpdate(updatedUserData) {
  // Emitir evento para o componente pai (App.vue) atualizar o user
  emit('user-update', updatedUserData)
  
  // Atualizar no localStorage
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}')
  const updatedUser = {
    ...currentUser,
    ...updatedUserData
  }
  localStorage.setItem('user', JSON.stringify(updatedUser))
}

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

      const response = await fetch('http://localhost:3000/dev/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(taskDataToSend)
      })

      const data = await response.json()

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

    console.log('Dados de tarefas carregados:', data)

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
        taskError.value = `Esta tarefa está bloqueada até que "${dependencyInfo.task_title}" de ${dependencyInfo.user_name} seja concluída. Aguarde a finalização da tarefa dependente.`
        // Remover o loading antes do return
        updatingTasks.value = updatingTasks.value.filter(id => id !== draggedTask.value.id)
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
    } finally {
      // Garantir que o loading seja removido em qualquer caso
      updatingTasks.value = updatingTasks.value.filter(id => id !== draggedTask.value.id)
      draggedTask.value = null
    }
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

onMounted(() => {
  loadTasks()
  loadUsers()
})
</script>