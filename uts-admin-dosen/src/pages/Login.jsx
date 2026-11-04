import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Input, Label, Button } from '@/components/ui/UIComponents';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === '13602@mail.com' && password === '13602') {
      localStorage.setItem('user', JSON.stringify({ email }));
      navigate('/admin/dashboard');
    } else {
      setError('Email atau password salah!');
    }
  };

  return (
    <div className="min-h-screen bg-violet-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-violet-600 mb-1">ADMIN-13602</h2>
          <p className="text-xs text-gray-500">Silakan login untuk melanjutkan</p>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-500 border border-red-100 p-3 rounded-md mb-5 text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <Label>Email</Label>
            <Input 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              placeholder="15673@mail.com"
              required 
            />
          </div>
          <div>
            <Label>Password</Label>
            <Input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              placeholder="Masukkan password"
              required 
            />
          </div>
          <Button type="submit" className="w-full mt-2 py-2.5">Login</Button>
        </form>
      </Card>
    </div>
  );
}