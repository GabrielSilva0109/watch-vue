<template>
  <div class="min-h-screen bg-background text-text-primary">
    <!-- Landing Page -->
    <LandingPage v-if="currentView === 'landing'" 
      @switch-to-login="switchToLogin"
      @switch-to-register="switchToRegister"
    />

    <!-- Login Page -->
    <LoginPage v-if="currentView === 'login'"
      @switch-to-landing="switchToLanding"
      @switch-to-register="switchToRegister"
      @login-success="handleLoginSuccess"
    />

    <!-- Register Page -->
    <RegisterPage v-if="currentView === 'register'"
      @switch-to-landing="switchToLanding"
      @switch-to-login="switchToLogin"
      @register-success="handleRegisterSuccess"
    />

    <!-- Dashboard -->
    <Dashboard v-if="currentView === 'dashboard'"
      :user="user"
      @logout="handleLogout"
      @user-update="handleUserUpdate"
    />

    <!-- Loading Modal -->
    <LoadingModal v-if="loading" />

    <!-- Error Modal -->
    <ErrorModal v-if="error" :message="error" @close="error = ''" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import LoginPage from './pages/Login.vue'
import RegisterPage from './pages/Register.vue'
import Dashboard from './pages/Dashboard.vue'
import LoadingModal from './components/LoadingModal.vue'
import ErrorModal from './components/ErrorModal.vue'
import LandingPage from './pages/LandingApp.vue'

// Estados da aplicação
const currentView = ref('landing')
const user = ref(JSON.parse(localStorage.getItem('user') || '{}'))
const loading = ref(false)
const error = ref('')

function handleUserUpdate(updatedUserData) {
  // Atualizar o objeto user local
  user.value = {
    ...user.value,
    ...updatedUserData
  }
  
  // Atualizar no localStorage
  localStorage.setItem('user', JSON.stringify(user.value))
}

// Funções para alternar entre telas
const switchToLanding = () => {
  currentView.value = 'landing'
  error.value = ''
}

const switchToLogin = () => {
  currentView.value = 'login'
  error.value = ''
}

const switchToRegister = () => {
  currentView.value = 'register'
  error.value = ''
}

// Handlers de sucesso
const handleLoginSuccess = (userData) => {
  user.value = userData
  currentView.value = 'dashboard'
}

const handleRegisterSuccess = (userData) => {
  user.value = userData
  currentView.value = 'dashboard'
}

// Função de logout
const handleLogout = () => {
  localStorage.removeItem('authToken')
  localStorage.removeItem('user')
  user.value = null
  currentView.value = 'landing'
}

// Verificar se há um usuário logado ao carregar a aplicação
onMounted(async () => {
  const savedUser = localStorage.getItem('user')
  const token = localStorage.getItem('authToken')
  
  if (savedUser && token) {
    user.value = JSON.parse(savedUser)
    currentView.value = 'dashboard'
  }
})
</script>