
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import '../pages/styles/RegisterPage.css'; 
import welcomeImage from '../public/logoTA.jpg';
const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   
  
    router.push('/login'); 
  };

  return (
    <div className="register-container">
    <Image
            src={welcomeImage}
            alt="Chào mừng"
            className="welcome-image"
            width={700} 
            height={300} 
          />
      <h2>Đăng Ký</h2>
      <form onSubmit={handleRegister} className="register-form">
        <input 
          type="text" 
          placeholder="Tên đăng nhập" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Mật khẩu" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">Đăng Ký</button>
      </form>
      <p>Đã có tài khoản? <a href="/login">Đăng nhập</a></p>
    </div>
  );
};

export default RegisterPage;
