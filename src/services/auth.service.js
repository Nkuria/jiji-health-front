const API_URL = 'http://localhost:3000/api/v1'

const formatErrorMessages = (errors) => {
  if (!errors) return 'An unknown error occurred'

  if (typeof errors === 'object' && !Array.isArray(errors)) {
    const errorMessages = []
    
    for (const field in errors) {
      if (Array.isArray(errors[field])) {
        errorMessages.push(`${field}: ${errors[field].join(', ')}`)
      }
    }
    
    if (errorMessages.length > 0) {
      return errorMessages.join('. ')
    }
  }
  
  return errors.message || 'An error occurred during the request'
}

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
      throw new Error(formatErrorMessages(error))
    }
    
    return response.json()
    
  },

  
}
