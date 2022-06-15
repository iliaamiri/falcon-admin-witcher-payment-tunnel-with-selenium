import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {toast, ToastContainer} from 'react-toastify';
import {CloseButton, Fade} from '../components/common/Toast';

import {auth} from '../witcherApi/api';

import DashboardLayout from './DashboardLayout';
import ErrorLayout from './ErrorLayout';

import loadable from '@loadable/component';
import {Redirect} from "react-router-dom";

const AuthBasicLayout = loadable(() => import('./AuthBasicLayout'));

const Layout = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [shouldLogin, setShouldLogin] = useState(false);

  const authneticate = async () => {
    const response = await auth.authenticate();
    const responseData = response.data;

    if (responseData.status) {
      setIsLoggedIn(true);
    } else {
      setShouldLogin(true);
    }
  }

  const Auth = () => {
    if (isLoggedIn) {
      return <Route component={DashboardLayout}/>
    } else {
      return <>{checkForRedirect()}</>
    }
  }

  const checkForRedirect = () => {
    if (shouldLogin) {
      return <Redirect to={"/auth/login"}/>
    }
  }


  useEffect(() => {
    authneticate()
      .then()
      .catch(() => {
        setShouldLogin(true);
      })
  }, [])

  useEffect(() => {
    AuthBasicLayout.preload();
  }, []);

  return (
    <Router fallback={<span/>}>
      <Switch>
        <Route path="/auth" component={AuthBasicLayout}/>
        <Route path="/errors" component={ErrorLayout}/>
        <Auth/>
      </Switch>
      <ToastContainer transition={Fade} closeButton={<CloseButton/>} position={toast.POSITION.BOTTOM_LEFT}/>
    </Router>
  );
};

export default Layout;
