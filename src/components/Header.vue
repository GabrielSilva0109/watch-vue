<template>
  <header class="bg-background-light border-b border-background-lighter">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center py-4">
        <div class="flex items-center space-x-4">
          <h1 class="text-2xl font-bold text-primary">Watch Tasks</h1>
          <div class="flex items-center space-x-2">
            <span class="text-text-secondary">Bem-vindo, {{ user.name }}!</span>
            <button
              @click="openEditModal"
              class="text-text-secondary hover:text-text-primary transition-colors"
              title="Editar perfil"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
            </button>
          </div>
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

    <!-- Modal de Edição -->
    <div 
      v-if="showEditModal" 
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      @click="closeEditModal"
    >
      <div 
        class="bg-background-light rounded-lg p-6 w-full max-w-md mx-4"
        @click.stop
      >
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-text-primary">Editar Perfil</h3>
          <button
            @click="closeEditModal"
            class="text-text-secondary hover:text-text-primary transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <form @submit.prevent="saveEdit">
          <div class="mb-4">
            <label class="block text-text-secondary text-sm font-medium mb-2">
              Nome
            </label>
            <input
              v-model="editForm.name"
              type="text"
              class="w-full px-3 py-2 border border-background-lighter rounded-lg bg-background-light text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Digite seu nome"
              required
              :disabled="loading"
            />
          </div>
          
          <div class="mb-6">
            <label class="block text-text-secondary text-sm font-medium mb-2">
              Email
            </label>
            <input
              v-model="editForm.email"
              type="email"
              class="w-full px-3 py-2 border border-background-lighter rounded-lg bg-background-light text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Digite seu email"
              required
              :disabled="loading"
            />
          </div>
          
          <div v-if="errorMessage" class="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {{ errorMessage }}
          </div>
          
          <div class="flex justify-end space-x-3">
            <button
              type="button"
              @click="closeEditModal"
              class="px-4 py-2 text-text-secondary hover:text-text-primary transition-colors"
              :disabled="loading"
            >
              Cancelar
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
              :disabled="loading"
            >
              {{ loading ? 'Salvando...' : 'Salvar' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, reactive } from 'vue'

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

const emit = defineEmits(['logout', 'tab-change', 'user-update'])

const showEditModal = ref(false)
const loading = ref(false)
const errorMessage = ref('')
const editForm = reactive({
  name: '',
  email: ''
})

function openEditModal() {
  showEditModal.value = true
  errorMessage.value = ''
  editForm.name = props.user.name
  editForm.email = props.user.email || ''
}

function closeEditModal() {
  showEditModal.value = false
  errorMessage.value = ''
  editForm.name = ''
  editForm.email = ''
}

async function saveEdit() {
  try {
    loading.value = true
    errorMessage.value = ''
    
    if (!editForm.name.trim() || !editForm.email.trim()) {
      errorMessage.value = 'Nome e email são obrigatórios'
      return
    }

    const response = await fetch(`http://localhost:3000/dev/users/${props.user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: editForm.name.trim(),
        email: editForm.email.trim()
      })
    })

    const data = await response.json()

    if (response.ok && data.success) {
      const updatedData = {
        name: editForm.name.trim(),
        email: editForm.email.trim()
      }
      
      console.log('Emitindo user-update com:', updatedData)
      emit('user-update', updatedData)
      closeEditModal()
    } else {
      errorMessage.value = data.error || 'Erro ao atualizar usuário'
    }
  } catch (error) {
    console.error('Erro ao salvar usuário:', error)
    errorMessage.value = 'Erro interno. Tente novamente.'
  } finally {
    loading.value = false
  }
}
</script>