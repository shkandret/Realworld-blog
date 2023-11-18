import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { loginUser } from '../../store/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Spin } from 'antd';
import { yupResolver } from '@hookform/resolvers/yup';
import { signInSchema } from '../../YUP/yup';

import styles from './SignIn.module.scss';

function SignIn() {
  const { loading, error, logged } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: 'onBlur', resolver: yupResolver(signInSchema) });

  const onSubmit = (data) => {
    const { email, password } = data;
    const user = {
      user: {
        email,
        password,
      },
    };
    dispatch(loginUser(user));
  };

  useEffect(() => {
    if (logged) {
      history.push('/');
      reset();
    }
  }, [logged, history, reset]);

  return (
    <>
      {loading && !error ? <Spin /> : null}
      {error ? <Alert message="Ошибка при загрузке данных" type="error" showIcon /> : null}
      <div className={styles.sign__form}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <h2>Sign In</h2>
          <div>
            <label htmlFor="email">Email address:</label>
            <input
              className={styles.input}
              type="email"
              id="email"
              placeholder="Email address"
              {...register('email', { required: true })}
            />
            {errors?.email && <div className={styles.error}>{errors?.email.message}</div>}
          </div>

          <div>
            <label htmlFor="password">Password:</label>
            <input
              className={styles.input}
              type="password"
              id="password"
              placeholder="Password"
              {...register('password', { required: true })}
            />
            {errors?.password && <div className={styles.error}>{errors?.password.message}</div>}
          </div>

          <input value="Login" type="submit" />
          <p>
            Don't have an account? <Link to="/sign-up">Sign Up</Link>.
          </p>
        </form>
      </div>
    </>
  );
}

export default SignIn;
