import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const nav = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:5000/api/auth/register', form)
      nav('/login')
    } catch (err) {
      alert(err?.response?.data?.message || 'Error')
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={submit}
        className="bg-white p-8 rounded-xl shadow-lg w-80 space-y-4 hover:shadow-2xl transition-shadow duration-300"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Register</h2>

        {/* Name */}
        <input
          required
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        {/* Email */}
        <input
          required
          placeholder="Email"
          type="email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        {/* Password with toggle */}
        <div className="relative">
          <input
            required
            placeholder="Password"
            type={showPassword ? 'text' : 'password'}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full p-3 border rounded pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
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
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Register
        </button>

        {/* Optional: Login link */}
        <p className="text-center text-sm text-gray-500">
          Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a>
        </p>
      </form>
    </div>
  )
}
