import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { currentUser, logOut } from '../../store/actions/actions';

import styles from './Header.module.scss';

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');

  const logged = useSelector((state) => state.userReducer.logged);
  const username = useSelector((state) => state.userReducer.user.username);
  const avatar = useSelector((state) => state.userReducer.user.image) || 'https://i.ibb.co/TmH3Vws/images.png';

  useEffect(() => {
    if (token) {
      dispatch(currentUser());
    }
  }, [dispatch, history, logged, token]);

  const onLogout = () => {
    dispatch(logOut());
    history.push('/articles');
  };

  return (
    <header className={styles.header}>
      <Link to="/">Realworld Blog</Link>
      <div className={styles.header__btn}>
        {!logged ? (
          <>
            <Link to="/sign-in" className={styles.sign_in}>
              Sign In
            </Link>
            <Link to="/sign-up" className={styles.sign_up}>
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <Link to="/new-article" className={styles.create_article}>
              Create article
            </Link>
            <Link className={styles.name} to="/profile">
              {username}
            </Link>
            <Link to="/profile">
              <img src={avatar} className={styles.image} alt="alt" />
            </Link>
            <button className={styles.log_out} onClick={onLogout}>
              Log out
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
