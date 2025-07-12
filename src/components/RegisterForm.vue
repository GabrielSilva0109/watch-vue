<script setup>
import { ref } from 'vue'
import api from '../services/api'

// Estados do formulário
const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const isLoading = ref(false)
const error = ref('')
const success = ref('')

// Emits para comunicar com o componente pai
const emit = defineEmits(['switch-to-login', 'register-success'])

// Função de cadastro
const handleRegister = async () => {
  if (!name.value || !email.value || !password.value || !confirmPassword.value) {
    error.value = 'Por favor, preencha todos os campos'
    return
  }

  if (password.value !== confirmPassword.value) {
    error.value = 'As senhas não coincidem'
    return
  }

  if (password.value.length < 6) {
    error.value = 'A senha deve ter pelo menos 6 caracteres'
    return
  }

  isLoading.value = true
  error.value = ''
  success.value = ''
  
  try {
    const response = await api.register({
      name: name.value,
      email: email.value,
      password: password.value
    })
    
    console.log('Cadastro realizado com sucesso:', response.user)
    success.value = 'Conta criada com sucesso! Você pode fazer login agora.'
    
    // Limpar formulário
    name.value = ''
    email.value = ''
    password.value = ''
    confirmPassword.value = ''
    
    // Após 2 segundos, mudar para tela de login
    setTimeout(() => {
      emit('switch-to-login')
    }, 2000)
    
  } catch (err) {
    error.value = err.message || 'Erro ao criar conta. Tente novamente.'
    console.error('Erro no cadastro:', err)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="w-full max-w-md mx-auto">
    <div class="bg-background-light rounded-lg shadow-lg p-8 border border-background-lighter">
      <h2 class="text-2xl font-bold text-center text-text-primary mb-6">
        Cadastrar
      </h2>
      
      <form @submit.prevent="handleRegister" class="space-y-4">
        <!-- Campo Nome -->
        <div>
          <label for="name" class="block text-sm font-medium text-text-secondary mb-1">
            Nome completo
          </label>
          <input
            id="name"
            v-model="name"
            type="text"
            required
            class="w-full px-3 py-2 bg-background-lighter border border-background-lighter rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text-primary placeholder-text-muted"
            placeholder="Seu nome completo"
          />
        </div>

        <!-- Campo Email -->
        <div>
          <label for="email" class="block text-sm font-medium text-text-secondary mb-1">
            Email
          </label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            class="w-full px-3 py-2 bg-background-lighter border border-background-lighter rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text-primary placeholder-text-muted"
            placeholder="seu@email.com"
          />
        </div>

        <!-- Campo Senha -->
        <div>
          <label for="password" class="block text-sm font-medium text-text-secondary mb-1">
            Senha
          </label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            class="w-full px-3 py-2 bg-background-lighter border border-background-lighter rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text-primary placeholder-text-muted"
            placeholder="••••••••"
          />
          <p class="text-xs text-text-muted mt-1">Mínimo 6 caracteres</p>
        </div>

        <!-- Campo Confirmar Senha -->
        <div>
          <label for="confirmPassword" class="block text-sm font-medium text-text-secondary mb-1">
            Confirmar senha
          </label>
          <input
            id="confirmPassword"
            v-model="confirmPassword"
            type="password"
            required
            class="w-full px-3 py-2 bg-background-lighter border border-background-lighter rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text-primary placeholder-text-muted"
            placeholder="••••••••"
          />
        </div>

        <!-- Mensagem de erro -->
        <div v-if="error" class="text-red-400 text-sm text-center bg-red-900/20 border border-red-600/30 rounded-md p-3">
          {{ error }}
        </div>

        <!-- Mensagem de sucesso -->
        <div v-if="success" class="text-green-400 text-sm text-center bg-green-900/20 border border-green-600/30 rounded-md p-3">
          {{ success }}
        </div>

        <!-- Botão de Cadastro -->
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <span v-if="isLoading" class="flex items-center justify-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Cadastrando...
          </span>
          <span v-else>Cadastrar</span>
        </button>
      </form>

      <!-- Link para login -->
      <div class="mt-6 text-center">
        <p class="text-sm text-text-secondary">
          Já tem uma conta?
          <button
            @click="emit('switch-to-login')"
            class="text-primary hover:text-primary-hover font-medium"
          >
            Faça login
          </button>
        </p>
      </div>
    </div>
  </div>
</template>
