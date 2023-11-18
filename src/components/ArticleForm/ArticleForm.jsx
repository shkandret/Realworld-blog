import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { createArticle, editArticle } from '../../store/actions/actions';
import { Alert, Spin, message } from 'antd';
import { yupResolver } from '@hookform/resolvers/yup';
import { articleFormSchema } from '../../YUP/yup';

import styles from './ArticleForm.module.scss';

function ArticleForm({}) {
  const { loading, error, created, edited, logged } = useSelector((state) => state.articleReducer);
  const { slug } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({ mode: 'onBlur', resolver: yupResolver(articleFormSchema) });

  const [tagList, setTagList] = React.useState([]);

  const onSubmit = async (data) => {
    const { title, description, body } = data;
    const articleData = {
      article: {
        title,
        description,
        body,
        tagList,
      },
    };

    if (slug) {
      dispatch(editArticle(articleData, slug));
      message.success('Article edited succsessfully');
    } else {
      dispatch(createArticle(articleData));
      message.success('Article created succsessfully');
    }
  };

  useEffect(() => {
    if (created || edited) {
      history.push('/');
    }
  }, [created, edited, history]);

  const handleAddTag = () => {
    const newTag = getValues('tagList').trim();
    if (newTag !== '') {
      setTagList([...tagList, newTag]);
      setValue('tagList', '');
    }
  };

  const handleRemoveTag = (index) => {
    setTagList(tagList.filter((_, i) => i !== index));
  };

  return (
    <>
      {loading && !error ? <Spin /> : null}
      {error ? <Alert message="Error loading data" type="error" showIcon /> : null}
      <div className={styles.article}>
        <h2>{slug ? 'Edit article' : 'Create new article'}</h2>
        <form className={styles.create__article} onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            placeholder="Title"
            className={styles.input}
            {...register('title', { required: true })}
          />
          {errors?.title && <div className={styles.error}>{errors?.title.message}</div>}

          <label htmlFor="description">Short description</label>
          <textarea id="description" placeholder="Short description" {...register('description', { required: true })} />
          {errors?.description && <div className={styles.error}>{errors?.description.message}</div>}

          <label htmlFor="body">Text</label>
          <textarea id="body" placeholder="Text" {...register('body', { required: true })} />
          {errors?.body && <div className={styles.error}>{errors?.body.message}</div>}

          <div className={styles.tagList}>
            <label htmlFor="tags">Tags</label>
            <div className={styles.tags}>
              {tagList.map((tag, index) => (
                <span key={index}>
                  <div className={styles.input}>{tag}</div>
                  <button type="button" className={styles.btn_delete} onClick={() => handleRemoveTag(index)}>
                    Delete
                  </button>
                </span>
              ))}
            </div>
            <div>
              <input
                type="text"
                className={styles.input}
                id="tagList"
                placeholder="tagList"
                {...register('tagList', { required: false })}
              />
              <button type="button" className={styles.btn_add} onClick={handleAddTag}>
                Add tag
              </button>
            </div>
          </div>
          <input type="submit" value="Send" />
        </form>
      </div>
    </>
  );
}

export default ArticleForm;
