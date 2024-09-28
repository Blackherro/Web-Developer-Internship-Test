
import React, { useState } from 'react';
import { Employee } from '../models/Employees';
import '../styles/EmployeeForm.css'; 


interface EmployeeFormProps {
  onAdd: (employee: Omit<Employee, 'id'>) => void; 
  employeeToEdit: Employee | null; 
  onEdit: (employee: Employee) => void;
}


const EmployeeForm: React.FC<EmployeeFormProps> = ({ onAdd, employeeToEdit, onEdit }) => {
  const [name, setName] = useState(employeeToEdit ? employeeToEdit.name : '');
  const [position, setPosition] = useState(employeeToEdit ? employeeToEdit.position : '');
  const [email, setEmail] = useState(employeeToEdit ? employeeToEdit.email : '');
  const [password, setPassword] = useState(employeeToEdit ? employeeToEdit.password : '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const employeeData = { name, position, email, password };
    if (employeeToEdit) {
      onEdit({ ...employeeData, id: employeeToEdit.id }); 
    } else {
      onAdd(employeeData);
    }
    setName('');
    setPosition('');
    setEmail('');
    setPassword('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Tên nhân viên</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Chức vụ</label>
        <input type="text" value={position} onChange={(e) => setPosition(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Mật khẩu</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button type="submit">{employeeToEdit ? 'Cập nhật nhân viên' : 'Thêm nhân viên'}</button>
    </form>
  );
};

export default EmployeeForm;
