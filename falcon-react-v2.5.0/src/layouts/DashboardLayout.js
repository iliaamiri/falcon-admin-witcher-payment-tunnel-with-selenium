import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../components/dashboard/Dashboard';
import DashboardAlt from '../components/dashboard-alt/DashboardAlt';
import NavbarTop from '../components/navbar/NavbarTop';
import NavbarVertical from '../components/navbar/NavbarVertical';
import Footer from '../components/footer/Footer';
import loadable from '@loadable/component';
import AppContext from '../context/Context';
import ProductProvider from '../components/e-commerce/ProductProvider';
import SidePanelModal from '../components/side-panel/SidePanelModal';
import Orders from "../components/e-commerce/Orders";
import AuthBasicLayout from "./AuthBasicLayout";
import TestForm from "../components/test/TestForm";

const DashboardRoutes = loadable(() => import('./DashboardRoutes'));

const DashboardLayout = ({ location }) => {
  const { isFluid, isTopNav } = useContext(AppContext);

  useEffect(() => {
    DashboardRoutes.preload();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className={isFluid ? 'container-fluid' : 'container'}>
      {!isTopNav && <NavbarVertical />}
      <ProductProvider>
        <div className="content">
          <NavbarTop />
          <Switch>
            <Route path="/" exact component={Orders} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/test" component={TestForm} />
            <Route path="/login" component={AuthBasicLayout} />
            {/*<Route path="/dashboard-alt" exact component={DashboardAlt} />*/}
            {/* All other menu items' Routing: */}
            <DashboardRoutes />
          </Switch>
          <Footer />
        </div>
        <SidePanelModal />
      </ProductProvider>
    </div>
  );
};

DashboardLayout.propTypes = { location: PropTypes.object.isRequired };

export default DashboardLayout;
