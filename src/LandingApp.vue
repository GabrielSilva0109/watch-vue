<template>
  <div class="min-h-screen bg-background">
    <!-- Landing Page -->
    <div v-if="currentView === 'landing'" class="min-h-screen">
      <!-- Header/Navigation -->
      <header class="bg-background-light border-b border-background-lighter">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center py-4">
            <div class="flex items-center">
              <h1 class="text-2xl font-bold text-primary">Watch Tasks</h1>
            </div>
            <div class="flex items-center space-x-4">
              <button
                @click="switchToLogin"
                class="text-text-secondary hover:text-text-primary transition-colors"
              >
                Entrar
              </button>
              <button
                @click="switchToRegister"
                class="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-hover transition-colors"
              >
                Começar Grátis
              </button>
            </div>
          </div>
        </div>
      </header>

      <!-- Hero Section -->
      <section class="py-20 px-4 text-center">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-5xl font-bold text-text-primary mb-6">
            Organize suas tarefas com
            <span class="text-primary">simplicidade</span>
          </h2>
          <p class="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
            O Watch Tasks é a ferramenta perfeita para gerenciar seus projetos e tarefas de forma intuitiva. 
            Use nosso sistema Kanban para acompanhar o progresso em tempo real.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              @click="switchToRegister"
              class="bg-primary text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-primary-hover transition-colors"
            >
              Começar Agora - Grátis
            </button>
            <button
              @click="scrollToFeatures"
              class="border border-background-lighter text-text-primary px-8 py-3 rounded-lg text-lg font-semibold hover:bg-background-light transition-colors"
            >
              Ver Funcionalidades
            </button>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section id="features" class="py-20 px-4 bg-background-light">
        <div class="max-w-6xl mx-auto">
          <h3 class="text-3xl font-bold text-text-primary text-center mb-12">
            Funcionalidades Principais
          </h3>
          <div class="grid md:grid-cols-3 gap-8">
            <!-- Feature 1 -->
            <div class="bg-background border border-background-lighter rounded-lg p-6">
              <div class="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
              </div>
              <h4 class="text-xl font-semibold text-text-primary mb-2">Kanban Board</h4>
              <p class="text-text-secondary">
                Visualize suas tarefas em colunas organizadas: Não Iniciadas, Em Progresso, Pendentes e Concluídas.
              </p>
            </div>

            <!-- Feature 2 -->
            <div class="bg-background border border-background-lighter rounded-lg p-6">
              <div class="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path>
                </svg>
              </div>
              <h4 class="text-xl font-semibold text-text-primary mb-2">Drag & Drop</h4>
              <p class="text-text-secondary">
                Mova suas tarefas entre as colunas simplesmente arrastando e soltando. Interface intuitiva e responsiva.
              </p>
            </div>

            <!-- Feature 3 -->
            <div class="bg-background border border-background-lighter rounded-lg p-6">
              <div class="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <h4 class="text-xl font-semibold text-text-primary mb-2">Seguro & Confiável</h4>
              <p class="text-text-secondary">
                Seus dados estão protegidos com autenticação JWT e banco de dados PostgreSQL seguro na AWS.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- How it Works Section -->
      <section class="py-20 px-4">
        <div class="max-w-6xl mx-auto">
          <h3 class="text-3xl font-bold text-text-primary text-center mb-12">
            Como Funciona
          </h3>
          <div class="grid md:grid-cols-4 gap-8">
            <div class="text-center">
              <div class="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-white text-xl font-bold">1</span>
              </div>
              <h4 class="text-lg font-semibold text-text-primary mb-2">Crie sua Conta</h4>
              <p class="text-text-secondary">Cadastre-se gratuitamente em segundos</p>
            </div>
            <div class="text-center">
              <div class="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-white text-xl font-bold">2</span>
              </div>
              <h4 class="text-lg font-semibold text-text-primary mb-2">Adicione Tarefas</h4>
              <p class="text-text-secondary">Crie suas tarefas com título e descrição</p>
            </div>
            <div class="text-center">
              <div class="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-white text-xl font-bold">3</span>
              </div>
              <h4 class="text-lg font-semibold text-text-primary mb-2">Organize</h4>
              <p class="text-text-secondary">Arraste e organize suas tarefas no board</p>
            </div>
            <div class="text-center">
              <div class="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-white text-xl font-bold">4</span>
              </div>
              <h4 class="text-lg font-semibold text-text-primary mb-2">Acompanhe</h4>
              <p class="text-text-secondary">Veja o progresso em tempo real</p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="py-20 px-4 bg-primary">
        <div class="max-w-4xl mx-auto text-center">
          <h3 class="text-3xl font-bold text-white mb-4">
            Pronto para começar?
          </h3>
          <p class="text-xl text-orange-100 mb-8">
            Junte-se a milhares de usuários que já organizaram suas tarefas conosco.
          </p>
          <button
            @click="switchToRegister"
            class="bg-white text-primary px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Começar Gratuitamente
          </button>
        </div>
      </section>

      <!-- Footer -->
      <footer class="bg-background-light border-t border-background-lighter py-8">
        <div class="max-w-6xl mx-auto px-4 text-center">
          <p class="text-text-secondary">
            © 2025 Watch Tasks. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>

    <!-- Login Page -->
    <div v-if="currentView === 'login'" class="flex items-center justify-center min-h-screen p-4">
      <div class="w-full max-w-md">
        <div class="text-center mb-8">
          <button 
            @click="switchToLanding"
            class="text-text-secondary hover:text-text-primary mb-4 inline-flex items-center"
          >
            ← Voltar ao início
          </button>
          <h1 class="text-4xl font-bold text-text-primary mb-2">Watch Tasks</h1>
          <p class="text-text-secondary">Faça login para continuar</p>
        </div>
        <LoginForm 
          @switch-to-register="switchToRegister"
          @login-success="handleLoginSuccess"
        />
      </div>
    </div>

    <!-- Register Page -->
    <div v-if="currentView === 'register'" class="flex items-center justify-center min-h-screen p-4">
      <div class="w-full max-w-md">
        <div class="text-center mb-8">
          <button 
            @click="switchToLanding"
            class="text-text-secondary hover:text-text-primary mb-4 inline-flex items-center"
          >
            ← Voltar ao início
          </button>
          <h1 class="text-4xl font-bold text-text-primary mb-2">Watch Tasks</h1>
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

<script setup>
import { ref, onMounted } from 'vue'
import LoginForm from './components/LoginForm.vue'
import RegisterForm from './components/RegisterForm.vue'
import Dashboard from './components/Dashboard.vue'
import api from './services/api'

// Estados da aplicação
const currentView = ref('landing') // Começar com landing page
const user = ref(null)

// Verificar se há um usuário logado ao carregar a aplicação
onMounted(() => {
  const savedUser = localStorage.getItem('user')
  const token = localStorage.getItem('authToken')
  
  if (savedUser && token) {
    user.value = JSON.parse(savedUser)
    currentView.value = 'dashboard'
  }
})

// Funções para alternar entre telas
const switchToLanding = () => {
  currentView.value = 'landing'
}

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
  // Limpar dados do localStorage
  localStorage.removeItem('user')
  localStorage.removeItem('authToken')
  
  // Limpar estado da aplicação
  user.value = null
  currentView.value = 'landing' // Voltar para landing page
  
  // Logout da API
  api.logout()
}

// Função para scroll suave para features
const scrollToFeatures = () => {
  const element = document.getElementById('features')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
/* Estilos customizados para a landing page */
</style>
