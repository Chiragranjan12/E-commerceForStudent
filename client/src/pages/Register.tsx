import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { authService } from '../services/authService';

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [_, setLocation] = useLocation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password || !formData.confirm) {
      setError('Please fill in all fields');
      return;
    }
    if (formData.password !== formData.confirm) {
      setError('Passwords do not match');
      return;
    }
    try {
      await authService.register(formData.name, formData.email, formData.password);
      setError('');
      setLocation('/');
    } catch (err: any) {
      const backendError = err.response?.data?.error || err.response?.data?.message || 'Registration failed.';
      setError(backendError);
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-white flex items-center justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-black mb-8 uppercase text-center">Register</h1>
        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-bold mb-2">Full Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300" required />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-bold mb-2">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300" required />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-bold mb-2">Password</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300" required />
          </div>
          <div>
            <label htmlFor="confirm" className="block text-sm font-bold mb-2">Confirm Password</label>
            <input type="password" id="confirm" name="confirm" value={formData.confirm} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300" required />
          </div>
          <button type="submit" className="w-full py-3 bg-black text-white font-bold uppercase text-sm hover:bg-gray-900">Create Account</button>
        </form>
        <p className="text-center text-gray-600 mt-8">
          Already have an account? 
          <Link href="/login">
            <span className="font-bold text-black cursor-pointer ml-1">Login</span>
          </Link>
        </p>
      </div>
    </div>
  );
}
