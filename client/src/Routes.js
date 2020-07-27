import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout, Landing as LandingLayout } from './layouts';

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
  Home as HomeView,
  Courses as CoursesView,
  Course as CourseView,
  Profile as ProfileView,
  About as AboutView,
  SingleModule as SingleModuleView,
  Contact as ContactView,
  Enrollment as EnrollmentView,
  MyCourses as MyCoursesView,
  EditCourse as EditCourseView,
  EditUnit as EditUnitView,
  AddVideo as AddVideoView,
  EditVideo as EditVideoView
} from './views';

const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/home"
      />
      <Redirect
        exact
        from="/sign-up"
        to="/sign-in"
      />
      <RouteWithLayout
        component={HomeView}
        exact
        layout={LandingLayout}
        path='/home'
      />
      <RouteWithLayout
        component={CoursesView}
        exact
        layout={LandingLayout}
        path='/all-courses'
      />
      <RouteWithLayout
        component={ContactView}
        exact
        layout={LandingLayout}
        path='/contact-us'
      />
      <RouteWithLayout
        component={EnrollmentView}
        exact
        layout={LandingLayout}
        path='/enrollment'
      />
      <RouteWithLayout
        component={AboutView}
        exact
        layout={LandingLayout}
        path='/about'
      />
      <RouteWithLayout
        component={AddVideoView}
        exact
        layout={LandingLayout}
        path='/add-video/:course/:module/:unit'
      />
      <RouteWithLayout
        component={EditVideoView}
        exact
        layout={LandingLayout}
        path='/edit-video/:course/:module/:unit/:id'
      />
      <RouteWithLayout
        component={CourseView}
        exact
        layout={LandingLayout}
        path='/course/:id'
      />
      <RouteWithLayout
        component={ProfileView}
        exact
        layout={LandingLayout}
        path='/profile/:id'
      />
      <RouteWithLayout
        component={SingleModuleView}
        exact
        layout={LandingLayout}
        path='/module/:course/:module/:unit'
      />
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
      <RouteWithLayout
        component={MyCoursesView}
        exact
        layout={MainLayout}
        path="/my-courses"
      />
      <RouteWithLayout
        component={EditCourseView}
        exact
        layout={MainLayout}
        path="/edit-course/:id"
      />
      <RouteWithLayout
        component={EditUnitView}
        exact
        layout={MainLayout}
        path="/edit-unit/:course/:module"
      />
      <RouteWithLayout
        component={UserListView}
        exact
        layout={MainLayout}
        path="/users/:type"
      />
      <RouteWithLayout
        component={ProductListView}
        exact
        layout={MainLayout}
        path="/products"
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
        path="/icons"
      />
      <RouteWithLayout
        component={AccountView}
        exact
        layout={MainLayout}
        path="/account"
      />
      <RouteWithLayout
        component={SettingsView}
        exact
        layout={MainLayout}
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
