import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { hasToken } from '../../auth/auth';

const Todo = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!hasToken()) navigate('/signin');
  }, [navigate]);

  return (
    <div>
      <h1>Todo</h1>
      <ul>
        <li>
          <label>
            <input type="checkbox" />
            <span>TODO 1</span>
          </label>
        </li>
        <li>
          <label>
            <input type="checkbox" />
            <span>TODO 2</span>
          </label>
        </li>
      </ul>
    </div>
  );
};

export default Todo;
