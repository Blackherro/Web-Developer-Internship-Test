import { Employee } from '../models/Employees';


let employees: Employee[] = [
  { id: 1, name: "John Doe", position: "Admin", email: "john@example.com", password: "123" },
  { id: 2, name: "Jane Doe", position: "Nhân viên", email: "jane@example.com", password: "123" },
];

export const fetchEmployees = (): Promise<Employee[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(employees), 1000);
  });
};

export const addEmployee = (employee: Omit<Employee, 'id'>): Promise<Employee> => {
  return new Promise((resolve) => {
    const newEmployee: Employee = { ...employee, id: employees.length + 1 };
    employees.push(newEmployee);
    setTimeout(() => resolve(newEmployee), 1000);
  });
};
