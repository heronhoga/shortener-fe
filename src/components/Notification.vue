<script setup>
import { useNotificationStore } from '@/stores/notification'

const store = useNotificationStore()

const typeClass = (type) => {
  return {
    success: 'bg-green-400',
    error: 'bg-red-400',
    info: 'bg-blue-400',
    warning: 'bg-yellow-400'
  }[type] || 'bg-blue-400'
}
</script>

<template>
  <div class="fixed top-5 right-5 z-50 space-y-3">
    <div
      v-for="n in store.notifications"
      :key="n.id"
      :class="[
        'flex items-center px-4 py-3 rounded-lg shadow-lg text-white min-w-[240px] animate-slide-in',
        typeClass(n.type)
      ]"
    >
      <span class="flex-1">{{ n.message }}</span>

      <button
        class="ml-3 text-white/80 hover:text-white"
        @click="store.remove(n.id)"
      >
        ✕
      </button>
    </div>
  </div>
</template>

<style scoped>
@keyframes slide-in {
  from {
    transform: translateX(20px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
.animate-slide-in {
  animation: slide-in 0.3s ease-out;
}
</style>
