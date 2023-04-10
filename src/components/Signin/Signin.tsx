import React, { useEffect } from 'react';
import useInput from '../../hooks/useInput';
import axios from 'axios';
import { hasToken, setToken } from '../../auth/auth';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (hasToken()) navigate('/todo');
  }, [navigate]);

  const {
    value: email,
    onChange: onChangeEmail,
    resetValue: resetEmail,
  } = useInput('');
  const {
    value: password,
    onChange: onChangePassword,
    resetValue: resetPassword,
  } = useInput('');

  const handleSubmit = () => {
    axios
      .post('https://www.pre-onboarding-selection-task.shop/auth/signin', {
        email,
        password,
      })
      .then(res => {
        setToken(res.data.access_token);
        navigate('/todo');
      })
      .catch(err =>
        err.response.status === 401 || err.response.status === 404
          ? alert('이메일 또는 비밀번호가 틀렸습니다.')
          : alert('unexpected error'),
      );

    resetEmail();
    resetPassword();
  };

  const isValid = /^[^\s@]+@[^\s@]+$/.test(email) && password.length >= 8;

  return (
    <div>
      <h1>로그인</h1>
      <div>
        <label htmlFor="email-input">이메일</label>
        <input
          data-testid="email-input"
          id={'email-input'}
          type="email"
          placeholder="이메일을 입력하세요."
          value={email}
          onChange={onChangeEmail}
        />
      </div>
      <div>
        <label htmlFor="password-input">비밀번호</label>
        <input
          data-testid="password-input"
          id={'password-input'}
          type="password"
          placeholder="비밀번호를 입력하세요."
          value={password}
          onChange={onChangePassword}
        />
      </div>
      <button
        data-testid="signin-button"
        onClick={handleSubmit}
        disabled={!isValid}
      >
        로그인
      </button>
    </div>
  );
};

export default SignIn;
