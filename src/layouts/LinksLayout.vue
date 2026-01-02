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
      <h1 class="text-2xl font-bold text-gray-900">
        <slot name="title">Page</slot>
      </h1>

      <div class="flex items-center gap-4">
        <button
          class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          @click="handleLogout"
        >
          Log Out
        </button>

        <button class="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700">
          + Create Link
        </button>

        <router-link
          to="/profile"
          class="w-10 h-10 rounded-full bg-slate-600 text-white flex items-center justify-center font-semibold"
        >
          A
        </router-link>
      </div>
    </div>

    <!-- Page content -->
    <slot />
  </div>
</template>
