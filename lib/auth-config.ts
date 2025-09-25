export interface User {
  id: string
  name: string
  email: string
  image?: string
}

export interface AuthConfig {
  googleClientId: string
}

// In a real app, these would come from environment variables
export const authConfig: AuthConfig = {
  googleClientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "your-google-client-id",
}

// Mock Google OAuth for demo purposes
export const mockGoogleAuth = {
  signIn: async (): Promise<User> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Return mock user data
    return {
      id: "google-user-123",
      name: "John Doe",
      email: "john.doe@gmail.com",
      image: "https://lh3.googleusercontent.com/a/default-user=s96-c",
    }
  },

  signOut: async (): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
  },
}
