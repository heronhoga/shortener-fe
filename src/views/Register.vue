<script setup>
import { isEqualPassword, isValidEmail, isValidPassword, isValidPhoneNumber } from '@/utils/validator'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const loading = ref(false)
const error = ref('')

const form = reactive({
  email: '',
  username: '',
  password: '',
  phone: ''
})

const confirmPassword = ref('')

const handleRegister = async () => {
  error.value = ''

  if (!isValidEmail(form.email)) {
    error.value = 'Please enter a valid email address'
    return
  }

  if (!isValidPhoneNumber(form.phone)) {
    error.value = 'Please enter a valid phone number'
    return
  }

  if (!isValidPassword(form.password)) {
    error.value = 'Please enter a valid new password'
    return
  }

  if (!isEqualPassword(form.password, confirmPassword)) {
    error.value = 'New Password and Confirmation Password must be equal'
  }

  loading.value = true
  try {
    await register(form)
    router.push('/')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="p-10">
      <h2 class="text-3xl font-extrabold text-gray-900 text-center">Register</h2>

      <p class="mt-2 text-center text-gray-600">
        Register yourself to be part of <strong>Snipe</strong>
      </p>

      <form class="mt-6 space-y-4 text-gray-900" @submit.prevent="handleRegister">
        <div>
          <p v-if="error" class="text-sm text-red-600 mt-2">
            {{ error }}
          </p>
          <label class="block text-sm font-medium text-gray-700"> Email </label>
          <input
            v-model="form.email"
            type="email"
            required
            class="mt-1 p-2 w-full rounded-lg border focus:ring-slate-500 focus:border-slate-500"
            :class="error ? 'border-red-500' : 'border-gray-300'"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700"> Username </label>
          <input
            v-model="form.username"
            type="text"
            required
            class="mt-1 p-2 w-full rounded-lg border focus:ring-slate-500 focus:border-slate-500"
            :class="error ? 'border-red-500' : 'border-gray-300'"
            placeholder="hg"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700"> Phone </label>
          <input
            v-model="form.phone"
            type="text"
            required
            class="mt-1 p-2 w-full rounded-lg border focus:ring-slate-500 focus:border-slate-500"
            :class="error ? 'border-red-500' : 'border-gray-300'"
            placeholder="+62.."
          />
        </div>
        <hr class="border-gray-300" />

        <!-- password and confirmation -->
        <div>
          <label class="block text-sm font-medium text-gray-700">
            Password (At least 8 chars, 1 letter and 1 number)
          </label>
          <input
            v-model="form.password"
            type="password"
            required
            class="mt-1 p-2 w-full rounded-lg border focus:ring-slate-500 focus:border-slate-500"
            :class="error ? 'border-red-500' : 'border-gray-300'"
            placeholder="••••••••"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700"> Confirm Password </label>
          <input
            v-model="confirmPassword"
            type="password"
            required
            class="mt-1 p-2 w-full rounded-lg border focus:ring-slate-500 focus:border-slate-500"
            :class="error ? 'border-red-500' : 'border-gray-300'"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full py-3 rounded-lg bg-slate-600 text-white font-medium hover:bg-slate-700 transition disabled:opacity-60"
        >
          {{ loading ? 'Registering...' : 'Register' }}
        </button>
      </form>

      <!-- Divider -->
      <div class="my-6 flex items-center">
        <div class="flex-grow border-t border-gray-300"></div>
        <span class="mx-3 text-gray-400 text-sm">OR</span>
        <div class="flex-grow border-t border-gray-300"></div>
      </div>

      <p class="mt-6 text-center text-sm text-gray-600">
        Already have an account?
        <router-link to="/login" class="text-slate-600 font-medium hover:underline">
          Login
        </router-link>
      </p>
    </div>
  </div>
</template>
