<script setup>
import { ref } from 'vue'

const user = ref({
  name: 'Alex',
  email: 'alex@example.com'
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-8 max-w-xl mx-auto">
    <h1 class="text-2xl font-bold mb-6">Profile Settings</h1>

    <div class="bg-white p-6 rounded-xl shadow-sm space-y-4">
      <div>
        <label class="text-sm text-gray-600">Name</label>
        <input
          v-model="user.name"
          class="mt-1 w-full border rounded-lg p-2"
        />
      </div>

      <div>
        <label class="text-sm text-gray-600">Email</label>
        <input
          v-model="user.email"
          disabled
          class="mt-1 w-full border rounded-lg p-2 bg-gray-100"
        />
      </div>

      <button class="mt-4 px-4 py-2 bg-slate-600 text-white rounded-lg">
        Save Changes
      </button>
    </div>
  </div>
</template>
