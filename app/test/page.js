'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

function UserList() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
      //  const response = await axios.get('/db-data-go/getUsers');
        const response = await axios.get('/api/db-data-go/getUsers');
        console.log('API Response:', response.data); // 添加日志
        const usersData = Array.isArray(response.data) ? response.data : Object.values(response.data);
        setUsers(usersData);
    
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();

  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (users.length === 0) {
    return <div>No users found.</div>;
  }

  const secondItem = users[1];

  return (
    <div>
      <h1>User List：{users[1].length}</h1>
      <ul>
        {secondItem.map(user => (
          <li key={user.id}>{user.UserName}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;