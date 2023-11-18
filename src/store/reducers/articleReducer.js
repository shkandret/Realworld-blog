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
  CLEAR_ARTICLE,
} from '../actions/actionsTypes';

const initialStateArticles = {
  articles: [],
  articlesCount: 0,
  error: null,
  loading: false,
  article: {
    slug: null,
    title: null,
    description: null,
    body: null,
    tagList: [],
    createdAt: null,
    updatedAt: null,
    favorited: false,
    favoritesCount: 0,
    author: { username: null, image: null },
  },
  server: { errors: null },
  created: false,
  edited: false,
  deleted: false,
};

const articleReducer = (state = initialStateArticles, action) => {
  switch (action.type) {
    case GET_ARTICLES_REQUEST:
    case GET_ARTICLE_DETAILED_REQUEST:
    case POST_NEW_ARTICLE:
    case PUT_EDIT_ARTICLE:
    case DELETE_ARTICLE:
      return { ...state, loading: true, error: null };

    case GET_ARTICLES_SUCCESS:
      return {
        ...state,
        loading: false,
        articles: action.payload.articles,
        articlesCount: action.payload.articlesCount,
        deleted: false,
        edited: false,
        created: false,
      };

    case GET_ARTICLE_DETAILED_SUCCESS:
      return {
        ...state,
        loading: false,
        article: { ...action.payload },
      };

    case CLEAR_ARTICLE:
      return {
        ...state,
        article: null,
      };

    case POST_NEW_ARTICLE_SUCCESS:
    case PUT_EDIT_ARTICLE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        created: action.type === POST_NEW_ARTICLE_SUCCESS,
        edited: action.type === PUT_EDIT_ARTICLE_SUCCESS,
      };

    case DELETE_ARTICLE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        deleted: true,
      };

    case GET_ARTICLES_FAILURE:
    case GET_ARTICLE_DETAILED_FAILURE:
    case POST_NEW_ARTICLE_FAILURE:
    case PUT_EDIT_ARTICLE_FAILURE:
    case DELETE_ARTICLE_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case POST_FAVORITE:
    case DELETE_FAVORITE:
      return {
        ...state,
        articles: state.articles.map((item) =>
          item.slug === action.payload.slug
            ? { ...item, favorited: action.type === POST_FAVORITE, favoritesCount: action.payload.favoritesCount }
            : item
        ),
        article: action.payload,
      };

    default:
      return state;
  }
};

export default articleReducer;
