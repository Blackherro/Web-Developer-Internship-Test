// src/components/EmployeeList.tsx
import React from 'react';
import '../styles/EmployeeList.css';
import { Employee } from '../models/Employees';

interface EmployeeListProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void; // Hàm chỉnh sửa
  onDelete: (id: number) => void; // Hàm xóa
}

const EmployeeList: React.FC<EmployeeListProps> = ({ employees, onEdit, onDelete }) => {
  return (
    <table className="employee-list">
      <thead>
        <tr>
          <th>ID</th>
          <th>Tên</th>
          <th>Chức vụ</th>
          <th>Email</th>
          <th>Mật khẩu</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee.id}>
            <td>{employee.id}</td>
            <td>{employee.name}</td>
            <td>{employee.position}</td>
            <td>{employee.email}</td>
            <td>{employee.password}</td>
            <td>
              <button onClick={() => onEdit(employee)}>Sửa</button>
              <button onClick={() => onDelete(employee.id)}>Xóa</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeList;
