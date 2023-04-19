import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import SignUp from './components/Signup/Signup';
import SignIn from './components/Signin/Signin';
import TodoList from './components/Todo/Todo';

function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <h1>root</h1>
            </div>
          }
        ></Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/todo" element={<TodoList />} />
      </Routes>
    </div>
  );
}

export default App;
