import React, { useEffect, useState, createContext } from "react";
import {
  HashRouter,
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router,
  useHistory,
} from "react-router-dom";
import "./scss/style.scss";
import "./App.css";
import AuthService from "./services/auth.service";
import PgCatProvider from "./context/PgCatContext"
import ArticleProvider from "./context/ArticleContext"
import ProgrammeProvider from "./context/ProgrammeContext"
import AttendeeProvider from "./context/AttendeeContext"
import UserProvider from "./context/UserContext"
import AuthProvider from "./context/AuthContext"
import GalleryProvider from "./context/GalleryContext"

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee,faEye } from '@fortawesome/free-solid-svg-icons'

import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

// optional configuration
const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_CENTER,
  timeout: 5000,
  offset: '70px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}

library.add(fab, faCheckSquare, faCoffee)

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const TheLayout = React.lazy(() => import("./containers/TheLayout"));

// Pages
const Login = React.lazy(() => import("./views/pages/login/Login"));
const Register = React.lazy(() => import("./views/pages/register/Register"));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));

const user = AuthService.getCurrentUser();

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      exact
      render={(props) => {
        //console.log('login props',props)
        return (
          localStorage.lac_user ?
          (<Component {...props} />):(
            <Redirect to={{ pathname: "/login", state: { from: props.location.pathname } }}  />
          )
        );
      }}
            />
  );
};

function App() {
  const UserContext = createContext();

  return (
  <AlertProvider template={AlertTemplate} {...options}>
    <Router>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
            <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
            <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
            <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
            
            <PgCatProvider.Provider>
            <ArticleProvider.Provider>
            <ProgrammeProvider.Provider>
            <AttendeeProvider.Provider>
            <UserProvider.Provider>
              <AuthProvider.Provider>
            <GalleryProvider.Provider>
            <ProtectedRoute path="/" component={TheLayout} />
            </GalleryProvider.Provider>
            </AuthProvider.Provider>
            </UserProvider.Provider>
            </AttendeeProvider.Provider>
            </ProgrammeProvider.Provider>
            </ArticleProvider.Provider>
            </PgCatProvider.Provider>
            
          </Switch>
        </React.Suspense>
    </Router>
    </AlertProvider>
  );

  // return (
  //   <Router>
  //     <React.Suspense fallback={loading}>
  //       <Switch>
         

  //         <ProtectedRoute
            
  //           path="/dashboard"
  //           name="Dashboard"
  //           component={(props)=><TheLayout {...props} />}
  //         />
  //         <Route
  //           exact
  //           path="/register"
  //           name="Register Page"
  //           render={(props) => <Register {...props} />}
  //         />
  //         <Route
  //           exact
  //           path="/404"
  //           name="Page 404"
  //           render={(props) => <Page404 {...props} />}
  //         />
  //         <Route
  //           exact
  //           path="/500"
  //           name="Page 500"
  //           render={(props) => <Page500 {...props} />}
  //         />
  //         <Route
  //           exact
  //           path="/login"
  //           name="Login Page"
  //           render={(props) => <Login {...props} />}
  //         />

  //         <Route
  //           exact
  //           path="/"
  //           name="Home"
  //           render={(props) => <Login {...props} />}
  //         />
  //       </Switch>
  //     </React.Suspense>
  //   </Router>
  // );
}

export default App;
