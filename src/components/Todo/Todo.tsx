import React, { useEffect, useMemo, useState } from 'react';
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

  const headers = useMemo(
    () => ({ authorization: `Bearer ${getToken()}` }),
    [],
  );

  const [todoList, setTodoList] = useState<TodoItem[]>([]);

  useEffect(() => {
    if (!hasToken()) navigate('/signin');
  }, [navigate]);

  useEffect(() => {
    if (hasToken())
      axios
        .get('https://www.pre-onboarding-selection-task.shop/todos', {
          headers,
        })
        .then(res => setTodoList(res.data));
  }, [headers]);

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

  const deleteTodo = ({ id }: TodoItem) => {
    axios
      .delete(`https://www.pre-onboarding-selection-task.shop/todos/${id}`, {
        headers,
      })
      .then(() => setTodoList(todoList.filter(todo => todo.id !== id)));
  };

  const modifyTodo = ({ id, todo, isCompleted }: TodoItem) => {
    axios
      .put(
        `https://www.pre-onboarding-selection-task.shop/todos/${id}`,
        { todo, isCompleted },
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
        <button data-testid="new-todo-add-button" type="submit">
          추가
        </button>
      </form>
      <ul>
        {todoList.map(todo => (
          <Todo
            key={todo.id}
            todo={todo}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            modifyTodo={modifyTodo}
          />
        ))}
      </ul>
    </div>
  );
};

type TodoProps = {
  todo: TodoItem;
  toggleTodo: (todo: TodoItem) => void;
  deleteTodo: (todo: TodoItem) => void;
  modifyTodo: (todo: TodoItem) => void;
};

const Todo = ({ todo, toggleTodo, deleteTodo, modifyTodo }: TodoProps) => {
  const [isModify, setIsModify] = useState(false);

  return !isModify ? (
    <TodoInfo
      todo={todo}
      toggleTodo={toggleTodo}
      deleteTodo={deleteTodo}
      setIsModify={setIsModify}
    />
  ) : (
    <TodoModify
      todo={todo}
      toggleTodo={toggleTodo}
      modifyTodo={modifyTodo}
      setIsModify={setIsModify}
    />
  );
};

type TodoInfoProps = {
  todo: TodoItem;
  toggleTodo: (todo: TodoItem) => void;
  deleteTodo: (todo: TodoItem) => void;
  setIsModify: (isModify: boolean) => void;
};

const TodoInfo = ({
  todo,
  toggleTodo,
  deleteTodo,
  setIsModify,
}: TodoInfoProps) => {
  return (
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
      <button data-testid="delete-button" onClick={() => deleteTodo(todo)}>
        삭제
      </button>
    </li>
  );
};

type TodoModifyProps = {
  todo: TodoItem;
  toggleTodo: (todo: TodoItem) => void;
  modifyTodo: (todo: TodoItem) => void;
  setIsModify: (isModify: boolean) => void;
};

const TodoModify = ({
  todo,
  toggleTodo,
  modifyTodo,
  setIsModify,
}: TodoModifyProps) => {
  const { value, onChange } = useInput(todo.todo);

  return (
    <li>
      <input
        type="checkbox"
        checked={todo.isCompleted}
        onChange={() => toggleTodo(todo)}
      />
      <input
        data-testid="modify-input"
        type="text"
        value={value}
        onChange={onChange}
      />
      <button
        data-testid="submit-button"
        onClick={() => {
          modifyTodo({ ...todo, todo: value });
          setIsModify(false);
        }}
      >
        제출
      </button>
      <button data-testid="cancel-button" onClick={() => setIsModify(false)}>
        취소
      </button>
    </li>
  );
};
export default TodoList;
