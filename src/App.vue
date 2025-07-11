<script setup>
import { ref } from 'vue'
import LoginForm from './components/LoginForm.vue'
import RegisterForm from './components/RegisterForm.vue'
import Dashboard from './components/Dashboard.vue'

// Estados da aplicação
const currentView = ref('login') 
const user = ref(null)

// Funções para alternar entre telas
const switchToLogin = () => {
  currentView.value = 'login'
}

const switchToRegister = () => {
  currentView.value = 'register'
}

const handleLoginSuccess = (userData) => {
  user.value = userData
  currentView.value = 'dashboard'
}

const handleRegisterSuccess = (userData) => {
  user.value = userData
  currentView.value = 'dashboard'
}

const handleLogout = () => {
  user.value = null
  currentView.value = 'login'
}
</script>

<template>
  <div class="min-h-screen bg-background">
    <!-- Tela de Login -->
    <div v-if="currentView === 'login'" class="flex items-center justify-center min-h-screen p-4">
      <div class="w-full max-w-md">
        <div class="text-center mb-8">
          <h1 class="text-4xl font-bold text-text-primary mb-2">Watch Tasks</h1>
          <p class="text-text-secondary">Faça login para continuar</p>
        </div>
        <LoginForm 
          @switch-to-register="switchToRegister"
          @login-success="handleLoginSuccess"
        />
      </div>
    </div>

    <!-- Tela de Cadastro -->
    <div v-if="currentView === 'register'" class="flex items-center justify-center min-h-screen p-4">
      <div class="w-full max-w-md">
        <div class="text-center mb-8">
          <h1 class="text-4xl font-bold text-text-primary mb-2">Watch Vue</h1>
          <p class="text-text-secondary">Crie sua conta gratuitamente</p>
        </div>
        <RegisterForm 
          @switch-to-login="switchToLogin"
          @register-success="handleRegisterSuccess"
        />
      </div>
    </div>

    <!-- Dashboard -->
    <div v-if="currentView === 'dashboard'">
      <Dashboard 
        :user="user"
        @logout="handleLogout"
      />
    </div>
  </div>
</template>

<style scoped>
/* Estilos customizados podem ser adicionados aqui */
</style>
