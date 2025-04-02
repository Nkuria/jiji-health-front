<template>
  <div class="auth-container">
    <h1>Sign In</h1>
    <div v-if="error" class="error-message">{{ error }}</div>
    
    <form @submit.prevent="handleSignIn">
      <div class="form-group">
        <label for="email">Email</label>
        <input 
          type="email" 
          id="email" 
          v-model="email" 
          required 
          placeholder="Email address"
        />
      </div>
      
      <div class="form-group">
        <label for="password">Password</label>
        <input 
          type="password" 
          id="password" 
          v-model="password" 
          required 
          placeholder="Password"
        />
      </div>
      
      <button type="submit" :disabled="loading">
        {{ loading ? 'Signing in...' : 'Sign In' }}
      </button>
    </form>
    
    <div class="auth-footer">
      Don't have an account? 
      <router-link to="/signup">Sign Up</router-link>
    </div>
  </div>
</template>

<script>
import authService from '../services/auth.service'

export default {
  name: 'SignIn',
  data() {
    return {
      email: '',
      password: '',
      loading: false,
      error: null
    }
  },
  methods: {
    async handleSignIn() {
      this.loading = true
      this.error = null
      
      try {
        const response = await authService.signIn(this.email, this.password)
        localStorage.setItem('token', response.token)
        this.$router.push('/dashboard')
      } catch (err) {
        this.error = err.message || 'Failed to sign in'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>