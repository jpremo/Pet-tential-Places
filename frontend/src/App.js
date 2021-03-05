import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import BusinessPage from './components/BusinessPage'
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import ProfilePage from "./components/ProfilePage"
import HomePage from './components/HomePage'
import SearchPage from './components/SearchPage'
import Footer from './components/Footer'
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    const control = document.querySelector('.mapboxgl-ctrl-top-right')
    if (control) {
      if (showModal) {
        control.className = "mapboxgl-ctrl-top-right hidden"
      } else {
        control.className = "mapboxgl-ctrl-top-right"
      }
    }
  }, [showModal])
  return (
    <>
      <div className='page-wrapper'>
        <Navigation isLoaded={isLoaded} setShowModal={setShowModal} showModal={showModal} />
        {isLoaded && (
          <>
            <Switch>
              <Route path="/" exact>
                <HomePage />
              </Route>
              <Route path="/signup">
                <SignupFormPage />
              </Route>
              <Route path="/business/:id">
                <BusinessPage setShowModal={setShowModal} />
              </Route>
              <Route path="/profile">
                <ProfilePage />
              </Route>
              <Route path="/search">
                <SearchPage />
              </Route>
              <Route path="/">
                <h1>Page Not Found</h1>
              </Route>
            </Switch>
            <Footer />
          </>
        )}
      </div>
    </>
  );
}

export default App;
