import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Userlist.module.css'; // CSS 파일을 import

const UserlistContainer = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('/api/users') // Flask API의 사용자 목록 조회 엔드포인트
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  return (
<div className={styles.main_container}>
      <div className={styles.userlist_container}>
        <h1 className={styles.userlist_title}>User List</h1><br></br>
        <ul>
          {users.map(user => (
            <li key={user.user_id} className={styles.user_item}>
              <div className={styles.user_text}>{user.user_id}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserlistContainer;
