<script setup>
import { ref, onMounted } from 'vue'
import LinkCard from '@/components/LinkCard.vue'

const links = ref([])

onMounted(async () => {
  // replace with API call
  links.value = [
    {
      id: 1,
      name: 'Landing Page',
      url: 'https://sni.pe/abc123',
      created_at: '2025-01-12',
      updated_at: '2025-01-20'
    },
    {
      id: 2,
      name: 'Instagram Bio',
      url: 'https://sni.pe/xyz456',
      created_at: '2025-01-10',
      updated_at: '2025-01-18'
    }
  ]
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-2xl font-bold text-gray-900">My Links</h1>

      <div class="flex items-center gap-4">
        <button class="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700">
          + Create Link
        </button>

        <!-- Profile -->
        <router-link
          to="/profile"
          class="w-10 h-10 rounded-full bg-slate-600 text-white flex items-center justify-center font-semibold"
        >
          A
        </router-link>
      </div>
    </div>

    <!-- Cards -->
    <div v-if="links.length" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <LinkCard
        v-for="link in links"
        :key="link.id"
        :link="link"
      />
    </div>

    <!-- Empty State -->
    <div v-else class="text-center text-gray-500 mt-20">
      No links yet. Create your first one.
    </div>
  </div>
</template>
