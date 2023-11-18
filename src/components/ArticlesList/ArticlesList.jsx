import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getArticles } from '../../store/actions/actions';
import Article from '../Article/Article';
import { Pagination, Spin, Alert } from 'antd';
import styles from './ArticlesList.module.scss';

function ArticleList() {
  const articleReducer = useSelector((state) => state.articleReducer);

  const { articles, articlesCount, loading, error, deleted, edited } = articleReducer;

  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArticles(page));
  }, [dispatch, page, deleted, edited]);

  const handlePageChange = (value) => {
    if (value !== page) {
      setPage(value);
    }
  };

  return (
    <>
      {loading && !error ? <Spin /> : null}
      {error ? <Alert message="Ошибка при загрузке данных" type="error" showIcon /> : null}
      <ul className={styles.article__list}>
        {articles.map((item) => (
          <Article item={item} key={item.slug} />
        ))}
      </ul>
      <div className={styles.article__list__pagination}>
        <Pagination
          defaultCurrent={1}
          total={articlesCount}
          onChange={handlePageChange}
          current={page}
          defaultPageSize={5}
          pageSize={5}
          showSizeChanger={false}
        />
      </div>
    </>
  );
}

export default ArticleList;
