import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import SignUp from './components/Signup/Signup';
import SignIn from './components/Signin/Signin';

function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          Component={() => (
            <div>
              <h1>root</h1>
            </div>
          )}
        ></Route>
        <Route path="/signup" Component={SignUp}></Route>
        <Route path="/signin" Component={SignIn}></Route>
      </Routes>
    </div>
  );
}

export default App;
