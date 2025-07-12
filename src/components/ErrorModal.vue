<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-red-900/20 border border-red-600/30 p-6 rounded-lg max-w-md mx-4">
      <p class="text-red-400 mb-4">{{ message }}</p>
      <button
        @click="$emit('close')"
        class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
      >
        Fechar
      </button>
    </div>
  </div>
</template>

<script setup>
    defineProps({
    message: {
        type: String,
        required: true
    }
    })

    defineEmits(['close'])
</script>