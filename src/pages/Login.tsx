import { useState } from 'react';
import { useAuth } from '../auth/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password); // fake login
  };

  const isFormValid = email.trim() !== '' && password.trim() !== '';


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-800 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Challenge TL Frontend
        </h2>

        <div className="mb-4">
          <label htmlFor="email" className="text-sm font-medium text-gray-700 block mb-1">
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            placeholder="ejemplo@correo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="text-sm font-medium text-gray-700 block mb-1">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full py-2 rounded-lg font-semibold transition-all ${isFormValid
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
        >
          Ingresar
        </button>

      </form>
    </div>
  );
};

export default Login;
