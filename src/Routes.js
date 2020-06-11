import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  Dashboard as DashboardView,
  ProductList as ProductListView,
  UserList as UserListView,
  Typography as TypographyView,
  Icons as IconsView,
  Account as AccountView,
  Settings as SettingsView,
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView,
  UserForm as UserFormView,
  ProductForm as ProductFormView,
  ContactList as ContactListView,
  ContactForm as ContactFormView,
  PetList as PetListView,
  PetForm as PetFormView,
  Parameters as ParametersView,
  MedicalRecords as MedicalRecordsView,
  Agenda as  AgendaView
} from './views';

const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/dashboard"
      />
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        authenticated={true}
        path="/dashboard"
      />
      <RouteWithLayout
        component={UserListView}
        exact
        layout={MainLayout}
        authenticated={true}
        path="/users"
      />
      <RouteWithLayout
        component={UserFormView}
        exact
        layout={MainLayout}
        authenticated={true}
        path="/users/form"
      />
      <RouteWithLayout
        component={ProductListView}
        exact
        layout={MainLayout}
        authenticated={true}
        path="/products"
      />
      <RouteWithLayout
        component={ProductFormView}
        exact
        layout={MainLayout}
        authenticated={true}
        path="/products/form"
      />
      <RouteWithLayout
        component={ContactListView}
        exact
        layout={MainLayout}
        authenticated={true}
        path="/contacts"
      />
      <RouteWithLayout
        component={ContactFormView}
        exact
        layout={MainLayout}
        authenticated={true}
        path="/contacts/form"
      />
      <RouteWithLayout
        component={PetListView}
        exact
        layout={MainLayout}
        authenticated={true}
        path="/pets"
      />
      <RouteWithLayout
        component={PetFormView}
        exact
        layout={MainLayout}
        authenticated={true}
        path="/pets/form"
      />
      <RouteWithLayout
        component={AgendaView}
        exact
        layout={MainLayout}
        authenticated={true}
        path="/agenda"
      />
      <RouteWithLayout
        component={ParametersView}
        exact
        layout={MainLayout}
        authenticated={true}
        path="/parameters"
      />
      <RouteWithLayout
        component={MedicalRecordsView}
        exact
        layout={MainLayout}
        authenticated={true}
        path="/medicalRecords"
      />      
      <RouteWithLayout
        component={TypographyView}
        exact
        layout={MainLayout}
        path="/typography"
      />
      <RouteWithLayout
        component={IconsView}
        exact
        layout={MainLayout}
        authenticated={true}
        path="/icons"
      />
      <RouteWithLayout
        component={AccountView}
        exact
        layout={MainLayout}
        authenticated={true}
        path="/account"
      />
      <RouteWithLayout
        component={SettingsView}
        exact
        layout={MainLayout}
        authenticated={true}
        path="/settings"
      />
      <RouteWithLayout
        component={SignUpView}
        exact
        layout={MinimalLayout}
        path="/sign-up"
      />
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}     
        path="/sign-in"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
