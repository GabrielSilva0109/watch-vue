<script setup>
import { ref } from 'vue'

// Estados do formulário
const email = ref('')
const password = ref('')
const isLoading = ref(false)

// Emits para comunicar com o componente pai
const emit = defineEmits(['switch-to-register', 'login-success'])

// Função de login
const handleLogin = async () => {
  if (!email.value || !password.value) {
    alert('Por favor, preencha todos os campos')
    return
  }

  isLoading.value = true
  
  // Simular uma chamada de API
  setTimeout(() => {
    console.log('Login realizado:', { email: email.value, password: password.value })
    isLoading.value = false
    emit('login-success', { email: email.value })
  }, 1000)
}
</script>

<template>
  <div class="w-full max-w-md mx-auto">
    <div class="bg-background-light rounded-lg shadow-lg p-8 border border-background-lighter">
      <h2 class="text-2xl font-bold text-center text-text-primary mb-6">
        Entrar
      </h2>
      
      <form @submit.prevent="handleLogin" class="space-y-4">
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
        </div>

        <!-- Botão de Login -->
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
            Entrando...
          </span>
          <span v-else>Entrar</span>
        </button>
      </form>

      <!-- Link para cadastro -->
      <div class="mt-6 text-center">
        <p class="text-sm text-text-secondary">
          Não tem uma conta?
          <button
            @click="emit('switch-to-register')"
            class="text-primary hover:text-primary-hover font-medium"
          >
            Cadastre-se
          </button>
        </p>
      </div>
    </div>
  </div>
</template>
