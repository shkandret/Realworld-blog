import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { editProfile } from '../../store/actions/actions';
import { Alert, Spin } from 'antd';
import { yupResolver } from '@hookform/resolvers/yup';
import { profileSchema } from '../../YUP/yup';

import styles from './Profile.module.scss';

function EditProfile() {
  const { user, loading, error } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: 'onBlur', resolver: yupResolver(profileSchema) });

  const onSubmit = async (data) => {
    const { username, email, password, image } = data;
    const updatedUser = {
      user: {
        username,
        email,
        password,
        image,
      },
    };
    dispatch(editProfile(updatedUser));

    if (!error) {
      history.push('./');
    }
  };

  useEffect(() => {
    if (!error) {
      reset();
    }
  }, [loading, error, reset]);

  return (
    <>
      {loading && !error ? <Spin /> : null}
      {error ? <Alert message="Ошибка при загрузке данных" type="error" showIcon /> : null}
      <div className={styles.sign__form}>
        <h2>Edit Profile</h2>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              className={styles.input}
              type="text"
              id="username"
              defaultValue={user.username}
              {...register('username', { required: true })}
            />
            {errors?.username && <div className={styles.error}>{errors?.username.message}</div>}
          </div>

          <div>
            <label htmlFor="email">Email address</label>
            <input
              className={styles.input}
              type="email"
              id="email"
              defaultValue={user.email}
              {...register('email', { required: true })}
            />
            {errors?.email && <div className={styles.error}>{errors?.email?.message}</div>}
          </div>

          <div>
            <label htmlFor="password">New password</label>
            <input
              className={styles.input}
              type="password"
              id="password"
              {...register('password', { required: false })}
            />
            {errors?.password && <div className={styles.error}>{errors?.password?.message}</div>}
          </div>

          <div>
            <label htmlFor="image">Avatar image (url)</label>
            <input className={styles.input} type="text" id="image" {...register('image', { required: false })} />
            {errors?.image && <div className={styles.error}>{errors?.image?.message}</div>}
          </div>
          <input value="Save" type="submit" />
        </form>
      </div>
    </>
  );
}

export default EditProfile;
