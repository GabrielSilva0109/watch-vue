<template>
  <div v-if="isVisible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-background-light rounded-lg p-6 w-full max-w-md mx-4 border border-background-lighter">
      <h3 class="text-lg font-semibold text-text-primary mb-4">
        {{ isEditing ? 'Editar Tarefa' : 'Nova Tarefa' }}
      </h3>
      
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-text-primary text-sm font-medium mb-1">
            Título
          </label>
          <input
            v-model="formData.title"
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
            v-model="formData.description"
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
            v-model="formData.category"
            class="w-full px-3 py-2 bg-background-lighter border border-background-lighter rounded-md text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="geral">Geral</option>
            <option value="trabalho">Trabalho</option>
            <option value="pessoal">Pessoal</option>
            <option value="urgente">Urgente</option>
            <option value="projeto">Projeto</option>
          </select>
        </div>

        <div v-if="isEditing">
          <label class="block text-text-primary text-sm font-medium mb-1">
            Status
          </label>
          <select
            v-model="formData.status"
            class="w-full px-3 py-2 bg-background-lighter border border-background-lighter rounded-md text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="not-started">Não Iniciada</option>
            <option value="in-progress">Em Progresso</option>
            <option value="pending">Pendente</option>
            <option value="completed">Concluída</option>
          </select>
        </div>
        
        <div v-if="!isEditing">
          <label class="block text-text-primary text-sm font-medium mb-1">
            <input
              v-model="formData.hasDependency"
              type="checkbox"
              class="mr-2"
            />
            Esta tarefa depende de outra pessoa
          </label>
        </div>
        
        <div v-if="formData.hasDependency && !isEditing" class="space-y-3 p-3 bg-background rounded border border-background-lighter">
          <div>
            <label class="block text-text-primary text-sm font-medium mb-1">
              Selecione o usuário
            </label>
            <select
              v-model="formData.selectedUserId"
              required
              class="w-full px-3 py-2 bg-background-lighter border border-background-lighter rounded-md text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Selecione um usuário</option>
              <option 
                v-for="user in availableUsers" 
                :key="user.id" 
                :value="user.id"
              >
                {{ user.name }} ({{ user.email }})
              </option>
            </select>
          </div>
          
          <div>
            <label class="block text-text-primary text-sm font-medium mb-1">
              Título da tarefa dependente
            </label>
            <input
              v-model="formData.dependencyTitle"
              type="text"
              required
              class="w-full px-3 py-2 bg-background-lighter border border-background-lighter rounded-md text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Ex: Comprar ingredientes"
            />
          </div>
        </div>
        
        <div class="flex justify-end space-x-3">
          <button
            type="button"
            @click="handleCancel"
            class="px-4 py-2 text-text-secondary hover:text-text-primary transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            :disabled="isLoading"
            class="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-hover transition-colors disabled:opacity-50"
          >
            {{ isLoading ? 'Salvando...' : (isEditing ? 'Salvar' : 'Criar Tarefa') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  editingTask: {
    type: Object,
    default: null
  },
  users: {
    type: Array,
    default: () => []
  },
  currentUser: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close', 'submit'])

// Computed para verificar se está editando
const isEditing = computed(() => props.editingTask !== null)

// Computed para filtrar usuários disponíveis (excluir usuário atual)
const availableUsers = computed(() => {
  return props.users.filter(user => user.id !== props.currentUser?.id)
})

// Dados do formulário
const formData = ref({
  title: '',
  description: '',
  category: 'geral',
  status: 'not-started',
  hasDependency: false,
  selectedUserId: '',
  dependencyTitle: ''
})

// Função para resetar o formulário (declarada antes dos watchers)
const resetForm = () => {
  formData.value = {
    title: '',
    description: '',
    category: 'geral',
    status: 'not-started',
    hasDependency: false,
    selectedUserId: '',
    dependencyTitle: ''
  }
}

// Resetar formulário quando modal é fechado
watch(() => props.isVisible, (newValue) => {
  if (!newValue) {
    resetForm()
  }
})

// Preencher formulário quando editando
watch(() => props.editingTask, (task) => {
  if (task) {
    formData.value = {
      title: task.title || '',
      description: task.description || '',
      category: task.category || 'geral',
      status: task.status || 'not-started',
      hasDependency: false,
      selectedUserId: '',
      dependencyTitle: ''
    }
  } else {
    resetForm()
  }
}, { immediate: true })

// Função para lidar com o envio do formulário
const handleSubmit = () => {
  if (!formData.value.title.trim()) {
    return
  }

  const taskData = {
    title: formData.value.title.trim(),
    description: formData.value.description.trim(),
    category: formData.value.category,
    status: formData.value.status
  }

  // Adicionar dados de dependência se marcado
  if (formData.value.hasDependency && !isEditing.value) {
    // Encontrar o usuário selecionado para pegar o email
    const selectedUser = props.users.find(user => user.id === formData.value.selectedUserId)
    
    if (selectedUser) {
      taskData.depends_on_user_email = selectedUser.email
      taskData.dependency_title = formData.value.dependencyTitle.trim()
    }
  }

  console.log('Dados sendo enviados do modal:', taskData)
  emit('submit', taskData)
}

// Função para cancelar/fechar modal
const handleCancel = () => {
  emit('close')
}
</script>