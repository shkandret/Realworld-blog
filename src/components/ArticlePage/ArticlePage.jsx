import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Article from '../Article/Article';
import { getArticleDetailed, clearArticle } from '../../store/actions/actions';
import { Spin } from 'antd';
import { useHistory } from 'react-router-dom';

import styles from './ArticlePage.module.scss';

function ArticlePage() {
  const { slug } = useParams();
  let article = useSelector((state) => state.articleReducer.article);
  const logged = useSelector((state) => state.userReducer.logged);
  const history = useHistory();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!logged) {
      history.push('/sign-in');
    }
  }, [logged, history]);

  useEffect(() => {
    dispatch(getArticleDetailed(slug));

    return () => {
      dispatch(clearArticle());
      console.log('qweqwe');
    };
  }, [dispatch, slug]);

  if (!article) {
    return <Spin />;
  }

  return (
    <div className={styles.single_post}>
      <Article item={article} showmore={true} />
      <ReactMarkdown skipHtml className={styles.body}>
        {article.body}
      </ReactMarkdown>
    </div>
  );
}

export default ArticlePage;
