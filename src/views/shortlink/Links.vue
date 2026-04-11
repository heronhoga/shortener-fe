<script setup>
import { ref, onMounted, computed } from 'vue'
import LinksLayout from '@/layouts/LinksLayout.vue'
import { getLinks } from '@/services/link.services'

const links = ref([])
const search = ref('')
const currentPage = ref(1)
const perPage = ref(5)

onMounted(async () => {
  const param = {
    page: currentPage.value,
    per_page: perPage.value
  }
  try {
    const response = await getLinks(param)
    links.value = response.data
  } catch (e) {
    console.error('Failed to fetch links', e)
  }
})

const filteredLinks = computed(() => {
  if (!search.value) return links.value

  return links.value.filter(
    (link) =>
      link.name.toLowerCase().includes(search.value.toLowerCase()) ||
      link.url.toLowerCase().includes(search.value.toLowerCase())
  )
})

const totalPages = computed(() => Math.ceil(filteredLinks.value.length / perPage.value))

const paginatedLinks = computed(() => {
  const start = (currentPage.value - 1) * perPage.value
  return filteredLinks.value.slice(start, start + perPage.value)
})

/* ---------- actions ---------- */

const copyUrl = async (url) => {
  await navigator.clipboard.writeText(url)
}

const editLink = (link) => {
  console.log('Edit', link)
}

const deleteLink = (id) => {
  links.value = links.value.filter((l) => l.id !== id)
}
</script>

<template>
  <LinksLayout>
    <template #title>My Links</template>

    <!-- Search + Page size -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
      <input
        v-model="search"
        type="text"
        placeholder="Search links..."
        class="w-full md:w-64 px-3 py-2 border rounded-lg text-gray-900"
      />
    </div>

    <!-- Table -->
    <div v-if="paginatedLinks.length" class="overflow-x-auto">
      <table class="min-w-full border border-gray-200 rounded-lg text-gray-900">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-4 py-3 text-left text-sm font-semibold">Name</th>
            <th class="px-4 py-3 text-left text-sm font-semibold">Shortened URL</th>
            <th class="px-4 py-3 text-left text-sm font-semibold">Redirect URL</th>
            <th class="px-4 py-3 text-sm font-semibold">Created</th>
            <th class="px-4 py-3 text-sm font-semibold">Updated</th>
            <th class="px-4 py-3 text-sm font-semibold">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="link in paginatedLinks" :key="link.id" class="border-t hover:bg-gray-50">
            <td class="px-4 py-3 font-medium">
              {{ link.label }}
            </td>

            <td class="px-4 py-3 text-blue-600 truncate max-w-xs">
              <a :href="link.url" target="_blank" class="hover:underline">
                localhost:8000/link/{{ link.name }}
              </a>
            </td>

            <td class="px-4 py-3 text-blue-600 truncate max-w-xs">
              <a :href="link.url" target="_blank" class="hover:underline">
                {{ link.url }}
              </a>
            </td>

            <td class="px-4 py-3 text-sm text-gray-600">
              {{
                new Date(link.created_at).toLocaleDateString({
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })
              }}
            </td>
            <td class="px-4 py-3 text-sm text-gray-600">
              {{
                new Date(link.updated_at).toLocaleDateString({
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })
              }}
            </td>

            <td class="px-4 py-3">
              <div class="flex flex-wrap gap-2 justify-center">
                <button
                  class="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
                  @click="copyUrl(link.url)"
                >
                  Copy
                </button>
                <button
                  class="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                  @click="editLink(link)"
                >
                  Edit
                </button>
                <button
                  class="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
                  @click="deleteLink(link.id)"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Empty -->
    <div v-else class="text-center text-gray-500 mt-20">No links found.</div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="flex justify-center items-center gap-4 mt-6">
      <button
        class="px-3 py-1 border rounded disabled:opacity-50 text-gray-500"
        :disabled="currentPage === 1"
        @click="currentPage--"
      >
        Prev
      </button>

      <span class="text-sm text-gray-500"> Page {{ currentPage }} </span>

      <button
        class="px-3 py-1 border rounded disabled:opacity-50 text-gray-500"
        :disabled="currentPage === totalPages"
        @click="currentPage++"
      >
        Next
      </button>
    </div>
  </LinksLayout>
</template>
