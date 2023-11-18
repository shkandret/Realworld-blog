import instanceAxios from './instanceAxios';

export const getAllArticles = async (offset) => {
  const count = 5;
  if (offset === 1) offset = 0;
  else offset = offset * count - count;
  const res = await instanceAxios.get('articles', {
    params: {
      limit: 5,
      offset,
    },
  });
  return res;
};

export const getArticle = async (slug) => {
  const res = await instanceAxios.get(`articles/${slug}`);
  return res;
};

export const postCreateArticle = async (articleData) => {
  const res = await instanceAxios.post('articles', articleData);
  return res;
};

export const deleteArticle = async (slug) => {
  const res = await instanceAxios.delete(`articles/${slug}`);
  return res;
};

export const putEditArticle = async (articleData, slug) => {
  const res = await instanceAxios.put(`articles/${slug}`, articleData);
  return res;
};

export const postFavorite = async (slug) => {
  const res = await instanceAxios.post(`articles/${slug}/favorite`);
  return res;
};

export const deleteFavorite = async (slug) => {
  const res = await instanceAxios.delete(`articles/${slug}/favorite`);
  return res;
};
