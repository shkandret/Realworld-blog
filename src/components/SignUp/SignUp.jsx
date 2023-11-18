import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { registerUser } from '../../store/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Spin } from 'antd';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpSchema } from '../../YUP/yup';
import { message } from 'antd';

import styles from './SignUp.module.scss';

function SignUp() {
  const { loading, error, logged } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: 'onBlur', resolver: yupResolver(signUpSchema) });

  const onSubmit = (data) => {
    const { username, email, password } = data;
    const user = {
      user: {
        username,
        email,
        password,
      },
    };
    dispatch(registerUser(user));
  };

  useEffect(() => {
    if (logged) {
      message.success('Account created succsessfully');
      history.push('/sign-in');
      reset();
    }
  }, [logged, history, reset]);

  return (
    <>
      {loading && !error ? <Spin /> : null}
      {error ? <Alert message="Ошибка при загрузке данных" type="error" showIcon /> : null}
      <div className={styles.sign__form}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <h2>Create new account</h2>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              className={styles.input}
              type="text"
              id="username"
              placeholder="Username"
              {...register('username', { required: true })}
            />
            {errors?.username && <div className={styles.error}>{errors?.username.message}</div>}
          </div>

          <div>
            <label htmlFor="email">Email address:</label>
            <input
              className={styles.input}
              type="email"
              id="email"
              placeholder="Email address"
              {...register('email', { required: true })}
            />
            {errors?.email && <div className={styles.error}>{errors?.email?.message}</div>}
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
            {errors?.password && <div className={styles.error}>{errors?.password?.message}</div>}
          </div>
          <div>
            <label htmlFor="repeatPassword">Repeat Password:</label>
            <input
              className={styles.input}
              type="password"
              id="repeatPassword"
              placeholder="Repeat password"
              {...register('repeatPassword', { required: true })}
            />
            {errors?.repeatPassword && <div className={styles.error}>{errors?.repeatPassword?.message}</div>}
          </div>

          <div htmlFor="form__agree">
            <input className={styles.checkbox} type="checkbox" id="agree" {...register('agree', { required: true })} />
            <label htmlFor="agree">I agree to the processing of my personal information</label>
          </div>
          {errors?.agree && <div className={styles.error}>{errors?.agree?.message}</div>}

          <input value="Create" type="submit" />
          <p>
            Already have an account? <Link to="/sign-in">Sign In</Link>.
          </p>
        </form>
      </div>
    </>
  );
}

export default SignUp;
