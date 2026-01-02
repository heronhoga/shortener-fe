<script setup>
import { ref, onMounted } from 'vue'
import LinkCard from '@/components/LinkCard.vue'
import LinksLayout from '@/layouts/LinksLayout.vue'

const links = ref([])

onMounted(() => {
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
    },
    {
      id: 3,
      name: 'Instagram Bio',
      url: 'https://sni.pe/xyz456',
      created_at: '2025-01-10',
      updated_at: '2025-01-18'
    },
    {
      id: 4,
      name: 'Instagram Bio',
      url: 'https://sni.pe/xyz456',
      created_at: '2025-01-10',
      updated_at: '2025-01-18'
    },
    {
      id: 5,
      name: 'Instagram Bio',
      url: 'https://sni.pe/xyz456',
      created_at: '2025-01-10',
      updated_at: '2025-01-18'
    }
  ]
})
</script>

<template>
  <LinksLayout>
    <template #title>My Links</template>

    <div v-if="links.length" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <LinkCard v-for="link in links" :key="link.id" :link="link" />
    </div>

    <div v-else class="text-center text-gray-500 mt-20">
      No links yet. Create your first one.
    </div>
  </LinksLayout>
</template>
