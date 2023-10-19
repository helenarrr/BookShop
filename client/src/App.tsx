import React from 'react';
import './App.css';
import NavigationBar from './layouts/NavigationAndFooter/NavigationBar';
import HomePage from './layouts/HomePage/HomePage';
import Footer from './layouts/NavigationAndFooter/Footer';
import { Redirect, Route, Switch } from 'react-router-dom';
import SearchBookPage from './layouts/SearchBookPage/components/SearchBookPage';
import BookCheckoutPage from './layouts/BookCheckoutPage/BookCheckoutPage';

function App() {
  return (
    <div className='d-flex flex-column min-vh-100'>
      <NavigationBar />

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
      </Switch>

      <Footer />
    </div>
  );
}

export default App;
