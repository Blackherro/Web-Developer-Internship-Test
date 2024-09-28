
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import '../pages/styles/LoginPage.css'; 
import welcomeImage from '../public/logoTA.jpg';

interface Employee {
  id: number;
  name: string;
  position: string;
  email: string;
  password: string;
}

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]); 
  const router = useRouter();

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await fetch('/api/employees');
        const data: Employee[] = await response.json(); 
        setEmployees(data);
      } catch (err) {
        console.error('Error fetching employees:', err);
      }
    };

    fetchEmployeeData();
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

  
    const user = employees.find((u: Employee) => u.email === email && u.password === password);

    if (user) {
      router.push(user.position === 'Admin' ? '/admin' : '/user');
    } else {
      setError('Tên đăng nhập hoặc mật khẩu không đúng');
    }

    setLoading(false);
  };

  return (
    <div className="login-container">
      <Image
            src={welcomeImage}
            alt="Chào mừng"
            className="welcome-image"
            width={700}  
            height={300} 
          />
      {error && <p className="error-message">{error}</p>}
      <h2>Đăng Nhập</h2>
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>Đăng Nhập</button>
        {loading && <p>Đang đăng nhập...</p>}
      </form>
    </div>
  );
};

export default LoginPage;
