<script setup>
import { reactive, ref } from 'vue'
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
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}
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
      <button
        @click="loginWithGoogle"
        class="w-full flex items-center justify-center gap-3 py-3 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google"
          class="w-5 h-5"
        />
        <span class="font-medium text-gray-700">
          Continue with Google
        </span>
      </button>

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

