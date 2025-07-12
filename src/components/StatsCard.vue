<template>
  <div class="bg-background-light p-6 rounded-lg border border-background-lighter">
    <div class="flex items-center">
      <div class="flex-shrink-0">
        <div 
          class="w-8 h-8 rounded-full flex items-center justify-center"
          :class="iconBgClass"
        >
          <span class="text-white text-sm">{{ icon }}</span>
        </div>
      </div>
      <div class="ml-4">
        <p class="text-sm font-medium text-text-secondary">{{ title }}</p>
        <p class="text-2xl font-semibold text-text-primary">{{ value }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
    const props = defineProps({
    title: {
        type: String,
        required: true
    },
    value: {
        type: [Number, String],
        required: true
    },
    icon: {
        type: String,
        required: true
    },
    iconBgClass: {
        type: String,
        default: 'bg-gray-500'
    }
    })
</script>