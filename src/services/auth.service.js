const API_URL = 'http://localhost:3000/api/v1'

export default {
  async signIn(email, password) {
    // try {
      const response = await fetch(`${API_URL}/users/sign_in`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({user: { email, password} })
      })
      
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to sign in')
      }
      
      return response.json()
    // } catch (error) {
    //   throw error
    // }
  },
  
  async signUp(full_name, email, password, phone_number) {
    
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({user: { full_name, email, password, phone_number }})
    })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to sign up')
    }
    
    return response.json()
    
  }
}
