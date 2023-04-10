import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken, hasToken } from '../../auth/auth';
import useInput from '../../hooks/useInput';
import axios from 'axios';

type TodoItem = {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
};

const TodoList = () => {
  const navigate = useNavigate();
  const {
    value: todo,
    onChange: onChangeTodo,
    resetValue: resetTodo,
  } = useInput('');

  const headers = { authorization: `Bearer ${getToken()}` };

  const [todoList, setTodoList] = useState<TodoItem[]>([]);

  useEffect(() => {
    if (!hasToken()) navigate('/signin');
  }, [navigate]);

  useEffect(() => {
    axios
      .get('https://www.pre-onboarding-selection-task.shop/todos', {
        headers,
      })
      .then(res => setTodoList(res.data));
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post(
        'https://www.pre-onboarding-selection-task.shop/todos',
        { todo },
        { headers },
      )
      .then(res => setTodoList([...todoList, res.data]));
    resetTodo();
  };

  const toggleTodo = ({ id, todo, isCompleted }: TodoItem) => {
    axios
      .put(
        `https://www.pre-onboarding-selection-task.shop/todos/${id}`,
        { todo, isCompleted: !isCompleted },
        { headers },
      )
      .then(res =>
        setTodoList(todoList.map(todo => (todo.id === id ? res.data : todo))),
      );
  };

  return (
    <div>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          data-testid="new-todo-input"
          type="text"
          onChange={onChangeTodo}
          value={todo}
        />
        <button data-testid="new=todo-add-button" type="submit">
          추가
        </button>
      </form>
      <ul>
        {todoList.map(todo => (
          <Todo key={todo.id} todo={todo} toggleTodo={toggleTodo} />
        ))}
      </ul>
    </div>
  );
};

type TodoProps = {
  todo: TodoItem;
  toggleTodo: (todo: TodoItem) => void;
};

const Todo = ({ todo, toggleTodo }: TodoProps) => {
  const [isModify, setIsModify] = useState(false);

  return !isModify ? (
    <li>
      <label>
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onChange={() => toggleTodo(todo)}
        />
        <span>{todo.todo}</span>
      </label>
      <button data-testid="modify-button" onClick={() => setIsModify(true)}>
        수정
      </button>
      <button data-testid="delete-button">삭제</button>
    </li>
  ) : (
    <li>
      <input
        type="checkbox"
        checked={todo.isCompleted}
        onChange={() => toggleTodo(todo)}
      />
      <input data-testid="modify-input" type="text" />
      <button data-testid="submit-button">제출</button>
      <button data-testid="cancel-button" onClick={() => setIsModify(false)}>
        취소
      </button>
    </li>
  );
};

export default TodoList;
