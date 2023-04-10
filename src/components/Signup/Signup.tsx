import axios from 'axios';
import useInput from '../../hooks/useInput';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { hasToken } from '../../auth/auth';

const SignUp = () => {
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
      .post('https://www.pre-onboarding-selection-task.shop/auth/signup', {
        email,
        password,
      })
      .then(res => {
        if (res.status === 201) {
          alert('회원가입이 완료되었습니다.');
          navigate('/signin');
        }
      });

    resetEmail();
    resetPassword();
  };

  const isValid = /^[^\s@]+@[^\s@]+$/.test(email) && password.length >= 8;

  return (
    <div>
      <h1>회원가입</h1>
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
        data-testid="signup-button"
        onClick={handleSubmit}
        disabled={!isValid}
      >
        회원가입
      </button>
    </div>
  );
};

export default SignUp;
