import React, { useEffect } from 'react';
import EmployeeForm from '../pages/components/EmployeeForm';
import EmployeeList from '../pages/components/EmployeeList';
import { fetchEmployees } from '../pages/api/employees'; 
import { Employee } from '../pages/models/Employees';



const AdminPage: React.FC = () => {
    const [employees, setEmployees] = React.useState<Employee[]>([]);
    const [employeeToEdit, setEmployeeToEdit] = React.useState<Employee | null>(null);
  
    useEffect(() => {
      fetchEmployees().then(data => {
        setEmployees(data as Employee[]);
      });
    }, []);
  
    const addEmployee = (employee: Omit<Employee, 'id'>) => {
      setEmployees([...employees, { id: employees.length + 1, ...employee }]);
    };
  
    const editEmployee = (employee: Employee) => {
      setEmployees(employees.map(emp => (emp.id === employee.id ? employee : emp)));
      setEmployeeToEdit(null); 
    };
  
    const deleteEmployee = (id: number) => {
      setEmployees(employees.filter(employee => employee.id !== id));
    };
  
    const handleEdit = (employee: Employee) => {
      setEmployeeToEdit(employee);
    };
  
    return (
      <div>
        <h2>{employeeToEdit ? 'Chỉnh sửa nhân viên' : 'Thêm nhân viên mới'}</h2>
        <EmployeeForm 
          onAdd={addEmployee} 
          onEdit={editEmployee} 
          employeeToEdit={employeeToEdit} 
        />
        <h2>Danh sách nhân viên</h2>
        <EmployeeList 
          employees={employees} 
          onEdit={handleEdit} 
          onDelete={deleteEmployee} 
        />
      </div>
    );
  };
  
  export default AdminPage;
