<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { login, loginWithGoogle } from '@/services/auth.services'

const router = useRouter()
const loading = ref(false)

const form = reactive({
  email: '',
  password: '',
})

const handleLogin = async () => {
  loading.value = true
  try {
    await login(form)
    router.push('/')
  } finally {
    loading.value = false
  }
}

const handleGoogleCredential = async (response) => {
  try {
    await loginWithGoogle(response.credential)
    router.push('/')
  } catch (e) {
    console.error(e)
  }
}

onMounted(() => {
  google.accounts.id.initialize({
    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    callback: handleGoogleCredential,
  })

  google.accounts.id.renderButton(
    document.getElementById('google-btn'),
    { theme: 'outline', size: 'large', width: 320 }
  )
})
</script>



<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="w-full max-w-md bg-white rounded-xl shadow p-8">
      <h2 class="text-3xl font-extrabold text-gray-900 text-center">
        Login
      </h2>

      <p class="mt-2 text-center text-gray-600">
        Sign in to continue to <strong>Snipe</strong>
      </p>

      <form class="mt-6 space-y-4" @submit.prevent="handleLogin">
        <div>
          <label class="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            v-model="form.email"
            type="email"
            required
            class="mt-1 p-2 w-full rounded-lg border-gray-300 focus:border-slate-500 focus:ring-slate-500"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            v-model="form.password"
            type="password"
            required
            class="mt-1 p-2 w-full rounded-lg border-gray-300 focus:border-slate-500 focus:ring-slate-500"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full py-3 rounded-lg bg-slate-600 text-white font-medium hover:bg-slate-700 transition disabled:opacity-60"
        >
          {{ loading ? 'Signing in...' : 'Login' }}
        </button>
      </form>

      <!-- Divider -->
      <div class="my-6 flex items-center">
        <div class="flex-grow border-t border-gray-300"></div>
        <span class="mx-3 text-gray-400 text-sm">OR</span>
        <div class="flex-grow border-t border-gray-300"></div>
      </div>

      <!-- Google Auth -->
      <div id="google-btn" class="w-full flex justify-center"></div>


      <p class="mt-6 text-center text-sm text-gray-600">
        Don’t have an account?
        <router-link
          to="/register"
          class="text-slate-600 font-medium hover:underline"
        >
          Register
        </router-link>
      </p>
    </div>
  </div>
</template>

