import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './core/store';
import { AuthService } from './services/api/AuthService';
import { UserService } from './services/api/UserService';
import { FilmsService } from './services/api/FilmsService';

AuthService.setCredentials({
  URL: 'https://studapi.teachmeskills.by',
});
AuthService.prefix = 'auth';

UserService.setCredentials({
  URL: 'https://studapi.teachmeskills.by',
});
UserService.prefix = 'auth/users';

FilmsService.setCredentials({
  URL: 'https://studapi.teachmeskills.by',
});
FilmsService.prefix = 'blog/films';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    {/* <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route
            index
            element={
              <FormTemplate title="text">
                <RegistrationPage />
              </FormTemplate>
            }
          />
          <Route
            path="films"
            element={
              // <div></div>
              <FormTemplate title="text">
                <FilmsPage />
              </FormTemplate>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter> */}
    <App />
  </Provider>,
  // </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
