<template>
  <div v-if="isVisible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-background-light rounded-lg p-6 w-full max-w-md mx-4 border border-background-lighter">
      <h3 class="text-lg font-semibold text-text-primary mb-4">Nova Tarefa</h3>
      
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
        
        <div>
          <label class="block text-text-primary text-sm font-medium mb-1">
            <input
              v-model="formData.hasDependency"
              type="checkbox"
              class="mr-2"
            />
            Esta tarefa depende de outra pessoa
          </label>
        </div>
        
        <div v-if="formData.hasDependency" class="space-y-3 p-3 bg-background rounded border border-background-lighter">
          <div>
            <label class="block text-text-primary text-sm font-medium mb-1">
              Email do usuário
            </label>
            <input
              v-model="formData.dependsOnUserEmail"
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
              v-model="formData.dependencyTitle"
              type="text"
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
            {{ isLoading ? 'Criando...' : 'Criar Tarefa' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  },
  isLoading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'submit'])

// Dados do formulário
const formData = ref({
  title: '',
  description: '',
  category: 'geral',
  hasDependency: false,
  dependsOnUserEmail: '',
  dependencyTitle: ''
})

// Resetar formulário quando modal é fechado
watch(() => props.isVisible, (newValue) => {
  if (!newValue) {
    resetForm()
  }
})

// Função para resetar o formulário
const resetForm = () => {
  formData.value = {
    title: '',
    description: '',
    category: 'geral',
    hasDependency: false,
    dependsOnUserEmail: '',
    dependencyTitle: ''
  }
}

// Função para lidar com o envio do formulário
const handleSubmit = () => {
    if (!formData.value.title.trim()) {
        return
    }

    const taskData = {
        title: formData.value.title.trim(),
        description: formData.value.description.trim(),
        category: formData.value.category,
        status: 'not-started'
    }

    if (formData.value.hasDependency) {
        taskData.depends_on_user_email = formData.value.dependsOnUserEmail.trim()
        taskData.dependency_title = formData.value.dependencyTitle.trim()
    }

    emit('submit', taskData)
    }

    // Função para cancelar/fechar modal
    const handleCancel = () => {
    emit('close')
    }
</script>