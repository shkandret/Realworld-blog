import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { postLike, deleteLike, delArticle } from '../../store/actions/actions';
import { Popconfirm, message } from 'antd';
import moment from 'moment';

import styles from './Article.module.scss';

function Article({ item, showmore }) {
  const { slug, title, description, tagList, createdAt, favoritesCount, author, favorited } = item;
  const user = useSelector((state) => state.userReducer.user.username);
  const logged = useSelector((state) => state.userReducer.logged);
  const history = useHistory();

  const dispatch = useDispatch();

  const [canEdit, setCanEdit] = useState(false);

  useEffect(() => {
    setCanEdit(author.username === user && logged && showmore);
  }, [author.username, user, logged, showmore]);

  const handleFavorite = useCallback(() => {
    if (logged) {
      favorited ? dispatch(deleteLike(slug)) : dispatch(postLike(slug));
    }
  }, [dispatch, favorited, logged, slug]);

  const formatMomentDate = useCallback((dateString) => {
    const date = moment(dateString);
    return date.format('MMMM D, YYYY');
  }, []);

  const onDelete = async () => {
    dispatch(delArticle(slug));
    message.success('Article deleted');
    history.push('/');
  };

  return (
    <li className={showmore ? styles.article__more : styles.article}>
      <div className={styles.article__info}>
        <div className={styles.title__wrapper}>
          <Link to={`/articles/${slug}`} className={styles.title}>
            {title}
          </Link>
          <label className={styles.article__label}>
            <button
              className={favorited ? styles.article__label_active : styles.article__label_like}
              disabled={!logged}
              onClick={handleFavorite}
            />
            <p className={styles.article__label_count}>{favoritesCount}</p>
          </label>
        </div>
        <div className={styles.tagList}>
          {tagList.map((item) => (
            <div className={styles.article__tag} key={item}>
              {item}
            </div>
          ))}
        </div>
        <div className={styles.description}>{description}</div>
      </div>
      <div className={styles.author}>
        <div>
          <div className={styles.name}>{item.author.username}</div>
          <div className={styles.created}>{formatMomentDate(createdAt)}</div>
          {canEdit ? (
            <>
              <div>
                <Popconfirm
                  placement="right"
                  title="Are you sure to delete this article?"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={onDelete}
                >
                  <button className={styles.btn_delete}>Delete</button>
                </Popconfirm>
                <button className={styles.btn_edit} onClick={() => history.push(`/articles/${slug}/edit`)}>
                  Edit
                </button>
              </div>
            </>
          ) : null}
        </div>
        <img className={styles.avatar} src={author.image} alt="avatar" />
      </div>
    </li>
  );
}

export default Article;
