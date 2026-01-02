<script setup>
import { useRouter } from 'vue-router'
import { logout } from '@/services/auth.services'
import { useNotificationStore } from '@/stores/notification'

const router = useRouter()
const notify = useNotificationStore()

const handleLogout = async () => {
  try {
    await logout()
    notify.show('Logout Successful', 'success')
    router.push('/')
  } catch {
    notify.show('Logout Failed', 'error')
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-xl md:text-2xl font-bold text-gray-900">
        <slot name="title">Page</slot>
      </h1>

      <div class="flex items-center gap-1 md:gap-4">
        <button
          class="px-2 py-1 md:px-4 md:py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-[10px] md:text-base"
          @click="handleLogout"
        >
          Log Out
        </button>

        <button
          class="px-2 py-1 md:px-4 md:py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 text-[10px] md:text-base"
        >
          + Create Link
        </button>

        <router-link
          to="/profile"
          class="w-7 h-7 md:w-10 md:h-10 rounded-full bg-slate-600 text-white flex items-center justify-center font-semibold"
        >
          A
        </router-link>
      </div>
    </div>

    <!-- Page content -->
    <slot />
  </div>
</template>
