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
        class="px-3 py-1.5 text-sm rounded-md bg-gray-100 hover:bg-gray-200"
      >
        Copy
      </button>

      <button class="px-3 py-1.5 text-sm rounded-md bg-slate-100 hover:bg-slate-200">Edit</button>

      <button class="px-3 py-1.5 text-sm rounded-md bg-red-100 hover:bg-red-200 text-red-600">
        Delete
      </button>
    </div>
  </div>
</template>
