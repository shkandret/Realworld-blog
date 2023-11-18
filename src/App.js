import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProtectedRoute from './ulits/ProtectedRoute';

import styles from './App.module.scss';

import Header from './components/Header/Header';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import ArticlesList from './components/ArticlesList/ArticlesList';
import ArticlePage from './components/ArticlePage/ArticlePage';
import Profile from './components/Profile/Profile';
import ArticleForm from './components/ArticleForm/ArticleForm';

function App() {
  return (
    <div className={styles.container}>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={ArticlesList} />
          <Route exact path="/articles" component={ArticlesList} />
          <Route exact path="/articles/:slug" component={ArticlePage} />
          <ProtectedRoute exact path="/articles/:slug/edit" component={ArticleForm} />
          <ProtectedRoute path="/new-article" component={ArticleForm} />
          <Route path="/sign-in" component={SignIn} />
          <Route path="/sign-up" component={SignUp} />
          <ProtectedRoute path="/profile" component={Profile} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
