<template>
  <div class="flex items-center justify-center min-h-screen p-4">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-text-primary mb-2">Watch Tasks</h1>
        <p class="text-text-secondary">Crie sua conta gratuitamente</p>
      </div>
      
      <form @submit.prevent="handleRegister" class="bg-background-light p-8 rounded-lg shadow-lg border border-background-lighter">
        <div class="mb-4">
          <label class="block text-text-primary text-sm font-medium mb-2">
            Nome
          </label>
          <input
            v-model="name"
            type="text"
            required
            class="w-full px-3 py-2 bg-background-lighter border border-background-lighter rounded-md text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Seu nome"
          />
        </div>
        
        <div class="mb-4">
          <label class="block text-text-primary text-sm font-medium mb-2">
            Email
          </label>
          <input
            v-model="email"
            type="email"
            required
            class="w-full px-3 py-2 bg-background-lighter border border-background-lighter rounded-md text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="seu@email.com"
          />
        </div>
        
        <div class="mb-6">
          <label class="block text-text-primary text-sm font-medium mb-2">
            Senha
          </label>
          <input
            v-model="password"
            type="password"
            required
            class="w-full px-3 py-2 bg-background-lighter border border-background-lighter rounded-md text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="••••••••"
          />
        </div>

        <!-- Mensagem de erro -->
        <div v-if="error" class="mb-4 text-red-400 text-sm text-center bg-red-900/20 border border-red-600/30 rounded-md p-3">
          {{ error }}
        </div>
        
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {{ isLoading ? 'Criando conta...' : 'Criar conta' }}
        </button>
        
        <div class="mt-6 text-center space-y-2">
          <button
            type="button"
            @click="$emit('switch-to-login')"
            class="text-primary hover:text-primary-hover transition-colors"
          >
            Já tem uma conta? Faça login
          </button>
          <br>
          <button
            type="button"
            @click="$emit('switch-to-landing')"
            class="text-text-secondary hover:text-text-primary transition-colors"
          >
            Voltar ao início
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['switch-to-landing', 'switch-to-login', 'register-success'])

const name = ref('')
const email = ref('')
const password = ref('')
const isLoading = ref(false)
const error = ref('')

const handleRegister = async () => {
  if (!name.value || !email.value || !password.value) {
    error.value = 'Por favor, preencha todos os campos'
    return
  }

  isLoading.value = true
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

    // Emitir sucesso
    emit('register-success', data.user)

    // Limpar formulário
    name.value = ''
    email.value = ''
    password.value = ''

  } catch (err) {
    error.value = err.message || 'Erro ao criar conta'
    console.error('Erro no cadastro:', err)
  } finally {
    isLoading.value = false
  }
}
</script>