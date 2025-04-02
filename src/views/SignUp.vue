<template>
  <div class="auth-container">
    <h1>Sign Up</h1>
    <div v-if="error" class="error-message">{{ error }}</div>
    
    <form @submit.prevent="handleSignUp">
      <div class="form-group">
        <label for="name">Name</label>
        <input 
          type="text" 
          id="name" 
          v-model="name" 
          required 
          placeholder="Full name"
        />
      </div>

       <div class="form-group">
        <label for="phone_number">Phone Number</label>
        <input 
          type="text" 
          id="phone_number" 
          v-model="phone_number" 
          required 
          placeholder="Phone Number"
        />
      </div>
      
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
        {{ loading ? 'Signing up...' : 'Sign Up' }}
      </button>
    </form>
    
    <div class="auth-footer">
      Already have an account? 
      <router-link to="/signin">Sign In</router-link>
    </div>
  </div>
</template>

<script>
import authService from '../services/auth.service'

export default {
  name: 'SignUp',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      phone_number: '',
      loading: false,
      error: null
    }
  },
  methods: {
    async handleSignUp() {
      this.loading = true
      this.error = null
      
      try {
        await authService.signUp(this.name, this.email, this.password, this.phone_number)
        this.$router.push('/signin')
      } catch (err) {
        this.error = err.message || 'Failed to sign up'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>