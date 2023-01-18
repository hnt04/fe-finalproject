import * as React from "react";
import { Routes, Route } from "react-router-dom";
import BlankLayout from "../layouts/BlankLayout";
import MainLayout from "../layouts/MainLayout";
import UserProfilePage from "../pages/UserProfilePage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import AuthRequire from "./AuthRequire";
import RegisterPage from "../pages/RegisterPage";
import AccountPage from "../pages/AccountPage";
import Profile from "../features/user/Profile";
import CommendationBoardPage from "../features/commendtionboard/CommendationBoardPage";
import AuthRequiredHR from "./AuthRequiredHR";
import UserMainPage from "../features/user/UserMainPage";
import MemberList from "../features/member/MemberList";
import MemberProfile from "../features/member/MemberProfile";
import TaskList from "../features/task/TaskList";
import TaskAllList from "../features/task/TaskAllList";
import TasksPage from "../features/task/TasksPage";

function Router() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthRequire>
            <MainLayout />
          </AuthRequire>
        }
      >
        <Route index element={<HomePage />} />
        <Route path="account" element={<AccountPage />} />
        <Route path="me" element={<Profile />} />
        <Route path="users/:userId" element={<MemberProfile />} />
        <Route path="member" element={<MemberList />} />
        <Route path="commendation" element={<CommendationBoardPage />} />
        <Route path="tasks" element={<TaskAllList />} />
        <Route path="tasks/me" element={<TasksPage />} />
        <Route path="users" element={
            <AuthRequiredHR>
              <UserMainPage />
            </AuthRequiredHR>
          }></Route>
      </Route>

      <Route element={<BlankLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route element={<BlankLayout />}>
        <Route
          path="/register"
          element={
            <AuthRequiredHR>
              <RegisterPage />
            </AuthRequiredHR>
          }
        ></Route>
      </Route>

    </Routes>
  );
}

export default Router;
