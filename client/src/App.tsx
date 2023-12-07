import React from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { LoginCallback, SecureRoute, Security } from '@okta/okta-react';
import LoginWidget from './Auth/LoginWidget';
import { oktaConfig } from './config/OktaConfig';
import NavigationBar from './layouts/NavigationAndFooter/NavigationBar';
import HomePage from './layouts/HomePage/HomePage';
import Footer from './layouts/NavigationAndFooter/Footer';
import SearchBookPage from './layouts/SearchBookPage/components/SearchBookPage';
import BookCheckoutPage from './layouts/BookCheckoutPage/BookCheckoutPage';
import './App.css';
import ReviewListPage from './layouts/ReviewListPage/ReviewListPage';
import ShelfPage from './layouts/ShelfPage/ShelfPage';
import MessagesPage from './layouts/MessagePage/MessagePage';
import AdminLibraryPage from './layouts/AdminLibraryPage/AdminLibraryPage';

const oktaAuth = new OktaAuth(oktaConfig);


function App() {

  const customAuthHandler = () => {
    history.push('/login');
  }

  const history = useHistory();

  const restoreOriginalUri = async (_oktaAuth: any, originalUri: any) => {
    history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
  };


  return (
    <div className='d-flex flex-column min-vh-100'>
      <Security
        oktaAuth={oktaAuth}
        restoreOriginalUri={restoreOriginalUri}
        onAuthRequired={customAuthHandler}
      >
        <NavigationBar />
        <div className='flex-grow-1'>
          <Switch>
            <Route path="/" exact>
              <Redirect to="/home" />
            </Route>
            <Route path="/home" exact>
              <HomePage />
            </Route>
            <Route path="/search">
              <SearchBookPage />
            </Route>
            <Route path="/checkout/:bookId">
              <BookCheckoutPage />
            </Route>
            <Route path="/reviewlist/:bookId">
              <ReviewListPage />
            </Route>
            <Route path='/login' render={
              () => <LoginWidget config={oktaConfig} />
            }
            />
            <Route path='/login/callback' component={LoginCallback} />
            <SecureRoute path="/shelf"> <ShelfPage /> </SecureRoute>
            <SecureRoute path="/messages"> <MessagesPage /> </SecureRoute>
            <SecureRoute path="/admin"> <AdminLibraryPage /> </SecureRoute>
          </Switch>
        </div>
        <Footer />
      </Security>
    </div>
  );
}
export default App;
