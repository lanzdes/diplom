import React, { ChangeEvent, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { useDispatch } from 'react-redux';

// import logo from './logo.svg';
import './App.css';
// import styled from 'styled-components';

import { Button } from './components/atoms/Button';
// import { ReactComponent as FavoriteIcon } from './assets/icons/favoritesIcon.svg';
// import { ColorService } from './services/ColorService';
import { Input } from './components/atoms/Input';
import { RegistrationPage } from './components/pages/Registration';
import { FormTemplate } from './components/templates/FormTemplate/FormTemplate';
import { Header } from './components/molecules/Header/Header';
import { FilmPage } from './components/pages/Film/Film';
import { FilmsPage } from './components/pages/Films/Films';
import { TrendsPage } from './components/pages/Trends/Trends';
import { FavoritesPage } from './components/pages/Favorites/Favorites';
import { RegistrationActivation } from './components/pages/Registration/RegistrationActivation';
import { LoginPage } from './components/pages/Login/Login';
import { useExitPrompt } from './components/pages/Login/useExitPrompt';

import { bootstrapSagaAction } from './core/slices/authSlice';
import { AddFilm } from './components/pages/AddFilm/AddFilm';
import { MyFilms } from './components/pages/MyFilms/MyFilms';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(bootstrapSagaAction());
  }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <FormTemplate title="Films">
                <FilmsPage />
              </FormTemplate>
            }></Route>
          <Route
            path="/activate/:uid/:token"
            element={
              // <div></div>
              <FormTemplate title="Confirm">
                <RegistrationActivation />
              </FormTemplate>
            }></Route>
          <Route
            path="/add-film"
            element={
              // <div></div>
              <FormTemplate title="Add film">
                <AddFilm />
              </FormTemplate>
            }></Route>
          <Route
            path="/films"
            element={
              // <div></div>
              <FormTemplate title="Films">
                <FilmsPage />
              </FormTemplate>
            }>
            {/* <Route
              path=":filmID"
              element={
                // <div></div>
                <FormTemplate title="text">
                  <FilmPage />
                </FormTemplate>
              }></Route> */}
          </Route>
          <Route
            path="/favorites"
            element={
              // <div></div>
              <FormTemplate title="favorites">
                <FavoritesPage />
              </FormTemplate>
            }>
            {/* <Route
              path=":filmID"
              element={
                // <div></div>
                <FormTemplate title="text">
                  <FilmPage />
                </FormTemplate>
              }></Route> */}
          </Route>
          <Route
            path="/films/:filmID"
            element={
              // <div></div>
              <FormTemplate title="text">
                <FilmPage />
              </FormTemplate>
            }></Route>
          <Route
            path="/trends"
            element={
              <FormTemplate title="Trends">
                <TrendsPage />
              </FormTemplate>
            }></Route>
          <Route
            path="/login"
            element={
              <FormTemplate title="text">
                <LoginPage />
              </FormTemplate>
            }></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// const FavoriteIconStyled = styled(FavoriteIcon)`
//   path {
//     fill: ${ColorService.SECONDARY};
//   }
// `;

// fetch('https://studapi.teachmeskills.by/blog/films/?limit=20')
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => {
//      // console.log(data);
//   });

export default App;
