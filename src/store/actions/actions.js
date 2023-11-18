import instanceAxios from '../service/instanceAxios';

import {
  getAllArticles,
  getArticle,
  postCreateArticle,
  deleteArticle,
  putEditArticle,
  postFavorite,
  deleteFavorite,
} from '../service/articleService';

import { signIn, signUp, updateUser, getCurrentUser } from '../service/userService';

import {
  GET_ARTICLES_REQUEST,
  GET_ARTICLES_SUCCESS,
  GET_ARTICLES_FAILURE,
  GET_ARTICLE_DETAILED_REQUEST,
  GET_ARTICLE_DETAILED_SUCCESS,
  GET_ARTICLE_DETAILED_FAILURE,
  POST_NEW_ARTICLE,
  POST_NEW_ARTICLE_SUCCESS,
  POST_NEW_ARTICLE_FAILURE,
  DELETE_ARTICLE,
  DELETE_ARTICLE_SUCCESS,
  DELETE_ARTICLE_FAILURE,
  PUT_EDIT_ARTICLE,
  PUT_EDIT_ARTICLE_SUCCESS,
  PUT_EDIT_ARTICLE_FAILURE,
  POST_FAVORITE,
  DELETE_FAVORITE,
  POST_REGISTRATION,
  POST_REGISTRATION_SUCCESS,
  POST_REGISTRATION_FAILURE,
  POST_LOGIN,
  POST_LOGIN_SUCCESS,
  POST_LOGIN_FAILURE,
  PUT_EDIT_PROFILE,
  PUT_EDIT_PROFILE_SUCCESS,
  PUT_EDIT_PROFILE_FAILURE,
  GET_CURRENT_USER,
  LOG_OUT,
} from './actionsTypes';

export const getArticlesRequest = () => ({
  type: GET_ARTICLES_REQUEST,
});
export const getArticlesSuccess = (articles, articlesCount) => ({
  type: GET_ARTICLES_SUCCESS,
  payload: { articles, articlesCount },
});
export const getArticlesFailure = (error) => ({
  type: GET_ARTICLES_FAILURE,
  payload: error,
});
export const getArticleDetailedRequest = () => ({
  type: GET_ARTICLE_DETAILED_REQUEST,
});
export const getArticleDetailedSuccess = (article) => ({
  type: GET_ARTICLE_DETAILED_SUCCESS,
  payload: article,
});
export const getArticleDetailedFailure = (error) => ({
  type: GET_ARTICLE_DETAILED_FAILURE,
  payload: error,
});
export const postNewArticlesRequest = () => ({
  type: POST_NEW_ARTICLE,
});
export const postNewArticlesSuccess = (article) => ({
  type: POST_NEW_ARTICLE_SUCCESS,
  payload: article,
});
export const postNewArticlesFailure = (error) => ({
  type: POST_NEW_ARTICLE_FAILURE,
  payload: error,
});
export const deleteArticleRequest = () => ({
  type: DELETE_ARTICLE,
});
export const deleteArticleSuccess = () => ({
  type: DELETE_ARTICLE_SUCCESS,
});
export const deleteArticleFailure = (error) => ({
  type: DELETE_ARTICLE_FAILURE,
  payload: error,
});
export const putEditArticlesRequest = () => ({
  type: PUT_EDIT_ARTICLE,
});
export const putEditArticlesSuccess = () => ({
  type: PUT_EDIT_ARTICLE_SUCCESS,
});
export const putEditArticlesFailure = (error) => ({
  type: PUT_EDIT_ARTICLE_FAILURE,
  payload: error,
});

export const postFavoritedRequest = (article) => ({
  type: POST_FAVORITE,
  payload: article,
});
export const deleteFavoritedRequest = (article) => ({
  type: DELETE_FAVORITE,
  payload: article,
});

export const postRegistrationRequest = () => ({
  type: POST_REGISTRATION,
});
export const postRegistrationSuccess = (user) => ({
  type: POST_REGISTRATION_SUCCESS,
  payload: user,
});
export const postRegistrationFailure = (error) => ({
  type: POST_REGISTRATION_FAILURE,
  payload: error,
});
export const postLoginRequest = () => ({
  type: POST_LOGIN,
});
export const postLoginSuccess = (user) => ({
  type: POST_LOGIN_SUCCESS,
  payload: user,
});
export const postLoginFailure = (error) => ({
  type: POST_LOGIN_FAILURE,
  payload: error,
});
export const putEditProfileRequest = () => ({
  type: PUT_EDIT_PROFILE,
});
export const putEditProfileSuccess = (user) => ({
  type: PUT_EDIT_PROFILE_SUCCESS,
  payload: user,
});
export const putEditProfileFailure = (error) => ({
  type: PUT_EDIT_PROFILE_FAILURE,
  payload: error,
});
export const getCurrentUserRequest = (user) => ({
  type: GET_CURRENT_USER,
  payload: user,
});
export const logOut = () => ({
  type: LOG_OUT,
});

export const getArticles = (page) => {
  return async (dispatch) => {
    try {
      dispatch(getArticlesRequest());
      const res = await getAllArticles(page);
      const { articles, articlesCount } = res.data;
      dispatch(getArticlesSuccess(articles, articlesCount));
    } catch (error) {
      dispatch(getArticlesFailure(error.message));
    }
  };
};

export const getArticleDetailed = (slug) => {
  return async (dispatch) => {
    try {
      dispatch(getArticleDetailedRequest());
      const res = await getArticle(slug);
      const { article } = res.data;
      dispatch(getArticleDetailedSuccess(article));
    } catch (error) {
      dispatch(getArticleDetailedFailure(error.message));
    }
  };
};

export const clearArticle = () => ({
  type: 'CLEAR_ARTICLE',
});

export const createArticle = (articleData) => {
  return async (dispatch) => {
    try {
      dispatch(postNewArticlesRequest());
      const res = await postCreateArticle(articleData);
      const { article } = res.data;
      dispatch(postNewArticlesSuccess(article));
    } catch (error) {
      dispatch(postNewArticlesFailure(error.message));
    }
  };
};

export const editArticle = (articleData, slug) => {
  return async (dispatch) => {
    try {
      dispatch(putEditArticlesRequest());
      const res = await putEditArticle(articleData, slug);
      console.log(res);
      dispatch(putEditArticlesSuccess());
    } catch (error) {
      dispatch(putEditArticlesFailure(error));
    }
  };
};

export const delArticle = (slug) => {
  return async (dispatch) => {
    try {
      dispatch(deleteArticleRequest());
      const res = await deleteArticle(slug);
      if (res.status === 204) dispatch(deleteArticleSuccess());
    } catch (error) {
      dispatch(deleteArticleFailure(error));
    }
  };
};

export const postLike = (slug) => {
  return async (dispatch) => {
    try {
      const res = await postFavorite(slug);
      const { article } = res.data;
      dispatch(postFavoritedRequest(article));
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteLike = (slug) => {
  return async (dispatch) => {
    try {
      const res = await deleteFavorite(slug);
      const { article } = res.data;
      dispatch(deleteFavoritedRequest(article));
    } catch (error) {
      console.log(error);
    }
  };
};

export const registerUser = (userData) => {
  return async (dispatch) => {
    try {
      dispatch(postRegistrationRequest());
      const res = await signUp(userData);
      const { user } = res.data;
      dispatch(postRegistrationSuccess(user));
    } catch (error) {
      dispatch(postRegistrationFailure(error.message));
    }
  };
};

export const loginUser = (userData) => {
  return async (dispatch) => {
    try {
      dispatch(postLoginRequest());
      const res = await signIn(userData);
      const { user } = res.data;
      const { token } = user;
      if (token !== localStorage.getItem('token')) {
        localStorage.setItem('token', token);
        instanceAxios.defaults.headers.Authorization = `Token ${token}`;
      }
      dispatch(postLoginSuccess(user));
    } catch (error) {
      dispatch(postLoginFailure(error.message));
    }
  };
};

export const editProfile = (userData) => {
  return async (dispatch) => {
    try {
      const res = await updateUser(userData);
      const { user } = res.data;
      dispatch(putEditProfileSuccess(user));
    } catch (error) {
      console.log(error.response);
      dispatch(putEditProfileFailure(error.message));
    }
  };
};

export const currentUser = () => {
  return async (dispatch) => {
    try {
      const res = await getCurrentUser();
      const { user } = res.data;
      dispatch(getCurrentUserRequest(user));
    } catch (error) {
      console.log(error);
    }
  };
};
