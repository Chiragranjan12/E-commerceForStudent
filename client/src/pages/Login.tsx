import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { authService } from '../services/authService';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [_, setLocation] = useLocation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }
    try {
      await authService.login(formData.email, formData.password);
      setError('');
      setLocation('/');
    } catch (err: any) {
      // Backend throws errors as { error: "message", ... } or { message: "message" }
      const backendError = err.response?.data?.error || err.response?.data?.message || 'Login failed. Please check your credentials.';
      setError(backendError);
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-white flex items-center justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-black mb-8 uppercase text-center">Login</h1>
        {error &&  <div className="mb-4 p-3 bg-red-100 text-red-700 text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-bold mb-2">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300" required />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-bold mb-2">Password</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300" required />
          </div>
          <button type="submit" className="w-full py-3 bg-black text-white font-bold uppercase text-sm hover:bg-gray-900">Sign In</button>
        </form>
        <p className="text-center text-gray-600 mt-8">
          Don't have an account? 
          <Link href="/register">
            <span className="font-bold text-black cursor-pointer ml-1">Register</span>
          </Link>
        </p>
      </div>
    </div>
  );
}
