<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <div class="text-center">
    <h2 class="text-2xl font-semibold text-gray-700 mb-4">{{ msg }}</h2>

    <div class="bg-gray-50 p-6 rounded-lg mb-6">
      <button 
        type="button" 
        @click="count++"
        class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
      >
        count is {{ count }}
      </button>
      <p class="text-gray-600 mt-4">
        Edit
        <code class="bg-gray-200 px-2 py-1 rounded text-sm">components/HelloWorld.vue</code> 
        to test HMR
      </p>
    </div>

    <div class="space-y-3 text-sm text-gray-600">
      <p>
        Check out
        <a 
          href="https://vuejs.org/guide/quick-start.html#local" 
          target="_blank"
          class="text-blue-500 hover:text-blue-700 underline"
        >
          create-vue
        </a>
        , the official Vue + Vite starter
      </p>
      <p>
        Install
        <a 
          href="https://github.com/johnsoncodehk/volar" 
          target="_blank"
          class="text-blue-500 hover:text-blue-700 underline"
        >
          Volar
        </a>
        in your IDE for a better DX
      </p>
      <p class="text-gray-500">Click on the Vite and Vue logos to learn more</p>
    </div>
  </div>
</template>

<style scoped>
/* Estilos customizados com Tailwind podem ser adicionados aqui */
</style>
