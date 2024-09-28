import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import EmployeeList from '../pages/components/EmployeeList'; 
import welcomeImage from '../public/logoTA.jpg'; 
import '../pages/styles/HomePage.css';
import { fetchEmployees } from '../pages/api/employees'; 
import { Employee } from '../pages/models/Employees';
const HomePage = () => {
  const [employees, setEmployees] = React.useState<Employee[]>([]);

  useEffect(() => {
    
    fetchEmployees().then(data => {
     
      setEmployees(data as Employee[]);
    });
  }, []);
   
  const addEmployee = (employee: Omit<Employee, 'id'>) => {
    setEmployees([...employees, { id: employees.length + 1, ...employee }]);
  };

  return (
    <div className="home-container">
      <div className="sidebar">
        <h2>Chọn Vai Trò</h2>
        <Link href="/admin" className="button">
          Quản lý Admin
        </Link>
        <Link href="/user" className="button">
          Trang Nhân viên
        </Link>
      </div>
      <div className="main_page">
        <div className="header">
          <Image
            src={welcomeImage}
            alt="Chào mừng"
            className="welcome-image"
            width={500}  
            height={300} 
          />
          <div className="auth-buttons">
            <Link href="/login" className="auth-button">
              Đăng Nhập
            </Link>
            <Link href="/register" className="auth-button">
              Đăng Ký
            </Link>
          </div>
        </div>
        <div className="welcome-section">
          <h1>Chào mừng đến với Hệ thống Quản lý Nhân sự</h1>
          <p>
            Hệ thống này được thiết kế để giúp quản lý các quy trình nhân sự một cách hiệu quả.
          </p>
        </div>

      
        <footer className="footer">
        <p>Liên hệ chúng tôi: <a href="mailto:contact@company.com">contact@company.com</a></p>
        <p>Số điện thoại: (123) 456-7890</p>
      </footer>
      </div>
      
    </div>
  );
};

export default HomePage;
