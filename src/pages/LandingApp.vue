<template>
  <div class="min-h-screen">
    <!-- Header/Navigation -->
    <header class="bg-background-light border-b border-background-lighter">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <div class="flex items-center">
            <h1 class="text-2xl font-bold text-primary">Watch Tasks</h1>
          </div>
          <div class="flex items-center space-x-4">
            <button
              @click="$emit('switch-to-login')"
              class="text-text-secondary hover:text-text-primary transition-colors"
            >
              Entrar
            </button>
            <button
              @click="$emit('switch-to-register')"
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
            @click="$emit('switch-to-register')"
            class="bg-primary text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-primary-hover transition-colors"
          >
            Começar Agora - Grátis
          </button>
          <button
            @click="scrollToFeatures"
            class="border border-background-lighter text-text-primary px-8 py-3 rounded-lg text-lg font-semibold hover:bg-background-light transition-colors"
          >
            Saiba Mais
          </button>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-20 px-4 bg-background-light">
      <div class="max-w-6xl mx-auto">
        <h3 class="text-3xl font-bold text-text-primary text-center mb-12">
          Recursos Principais
        </h3>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-background p-6 rounded-lg shadow-lg">
            <div class="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
              <span class="text-white text-xl">📋</span>
            </div>
            <h4 class="text-xl font-semibold text-text-primary mb-3">Kanban Board</h4>
            <p class="text-text-secondary">
              Visualize suas tarefas em um board intuitivo com drag-and-drop.
            </p>
          </div>
          <div class="bg-background p-6 rounded-lg shadow-lg">
            <div class="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
              <span class="text-white text-xl">🔄</span>
            </div>
            <h4 class="text-xl font-semibold text-text-primary mb-3">Tempo Real</h4>
            <p class="text-text-secondary">
              Acompanhe o progresso das suas tarefas em tempo real.
            </p>
          </div>
          <div class="bg-background p-6 rounded-lg shadow-lg">
            <div class="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
              <span class="text-white text-xl">🔒</span>
            </div>
            <h4 class="text-xl font-semibold text-text-primary mb-3">Segurança</h4>
            <p class="text-text-secondary">
              Seus dados estão protegidos com autenticação JWT e banco de dados seguro.
            </p>
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
          @click="$emit('switch-to-register')"
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
</template>

<script setup>
  defineEmits(['switch-to-login', 'switch-to-register'])

  // Função para scroll suave para features
  const scrollToFeatures = () => {
    const element = document.getElementById('features')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }
</script>