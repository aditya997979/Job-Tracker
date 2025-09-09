import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const nav = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    try {
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'
      const { data } = await axios.post(`${baseUrl}/api/auth/login`, form)
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      nav('/')
    } catch (err) {
      const message = err?.response?.data?.message || err?.message || 'Network error'
      alert(message)
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-sand-50 fade-in">
      <form
        onSubmit={submit}
        className="bg-white p-8 rounded-2xl shadow-soft w-80 space-y-4 hover:shadow-lift transition-shadow duration-300"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        {/* Email input */}
        <input
          required
          placeholder="Email"
          type="email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-450 transition"
        />

        {/* Password input with toggle */}
        <div className="relative">
          <input
            required
            placeholder="Password"
            type={showPassword ? 'text' : 'password'}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full p-3 border rounded-lg pr-12 focus:outline-none focus:ring-2 focus:ring-amber-450 transition"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-500 font-medium hover:text-gray-700 transition"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        {/* Submit */}
        <button
          className="w-full bg-clay-600 text-white py-3 rounded-lg font-semibold hover:bg-clay-700 transition"
        >
          Login
        </button>

        {/* Optional: Signup link */}
        <p className="text-center text-sm text-gray-500">
          Don't have an account? <a href="/register" className="text-clay-700 hover:underline">Sign up</a>
        </p>
      </form>
    </div>
  )
}
