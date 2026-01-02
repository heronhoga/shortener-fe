<script setup>
defineProps({
  link: {
    type: Object,
    required: true
  }
})

const copyLink = async (url) => {
  await navigator.clipboard.writeText(url)
}
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition p-6">
    <div class="flex items-start justify-between">
      <h3 class="font-semibold text-lg text-gray-900">
        {{ link.name }}
      </h3>

      <button class="text-gray-400 hover:text-gray-600">⋮</button>
    </div>

    <p class="mt-2 text-slate-600 break-all">
      {{ link.url }}
    </p>

    <div class="mt-4 text-sm text-gray-500 space-y-1">
      <p>Created: {{ link.created_at }}</p>
      <p>Updated: {{ link.updated_at }}</p>
    </div>

    <div class="mt-5 flex gap-3">
      <button
        @click="copyLink(link.url)"
        class="px-3 py-1.5 text-sm rounded-md bg-gray-400 hover:bg-gray-500 text-white"
      >
        Copy
      </button>

      <button class="px-3 py-1.5 text-sm rounded-md bg-cyan-400 hover:bg-cyan-500 text-white">
        Edit
      </button>

      <button class="px-3 py-1.5 text-sm rounded-md bg-red-400 hover:bg-red-500 text-white">
        Delete
      </button>
    </div>
  </div>
</template>
