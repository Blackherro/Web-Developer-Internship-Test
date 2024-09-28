import React, { useState, useEffect } from 'react';
import { fetchEmployees } from './api/employees';

interface Request {
  id: number;
  text: string;
}

interface Employee {
  id: number;
  name: string;
  position: string;
  email: string;
}

const UserPage = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [request, setRequest] = useState('');
  const [requests, setRequests] = useState<Request[]>([]);

  useEffect(() => {
    const fetchAndSetEmployees = async () => {
      const data = await fetchEmployees();
      setEmployees(data);

      const loggedInUserString = localStorage.getItem('loggedInUser');
      const loggedInUser: Employee | null = loggedInUserString ? JSON.parse(loggedInUserString) : null;

      if (loggedInUser) {
        setSelectedEmployee(loggedInUser);
      }
    };

    fetchAndSetEmployees();
  }, []);

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newRequest: Request = { id: requests.length + 1, text: request };
    setRequests([...requests, newRequest]);
    setRequest('');
  };

  return (
    <div>
      <h1>Thông tin Nhân viên</h1>
      {selectedEmployee ? (
        <div>
          <h2>Thông tin chi tiết</h2>
          <p>Tên: {selectedEmployee.name}</p>
          <p>Chức vụ: {selectedEmployee.position}</p>
          <p>Email: {selectedEmployee.email}</p>

          <h2>Gửi yêu cầu</h2>
          <form onSubmit={handleRequestSubmit}>
            <input
              type="text"
              placeholder="Nhập yêu cầu của bạn"
              value={request}
              onChange={(e) => setRequest(e.target.value)}
              required
            />
            <button type="submit">Gửi yêu cầu</button>
          </form>

          <h2>Các yêu cầu của bạn</h2>
          <ul>
            {requests.map(req => (
              <li key={req.id}>{req.text}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Không có thông tin nhân viên.</p>
      )}
    </div>
  );
};

export default UserPage;
