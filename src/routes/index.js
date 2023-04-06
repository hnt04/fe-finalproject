import * as React from "react";
import { Routes, Route } from "react-router-dom";
import BlankLayout from "../layouts/BlankLayout";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import AuthRequire from "./AuthRequire";
import RegisterPage from "../pages/RegisterPage";
import AccountPage from "../pages/AccountPage";
// import Profile from "../features/user/Profile";
import CommendationBoardPage from "../features/commendtionboard/CommendationBoardPage";
import AuthRequiredHR from "./AuthRequiredHR";
import MemberList from "../features/member/MemberList";
import TasksPage from "../features/task/TasksPage";
import UserProfilePage from "../pages/UserProfilePage";
import PostUnCheck from "../features/post/PostUnCheck";

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
        {/* <Route path="me" element={<Profile />} /> */}
        <Route path="users/:userId" element={<UserProfilePage />} />
        <Route path="member" element={<MemberList />} />
        <Route path="commendation" element={<CommendationBoardPage />} />
        <Route path="post-box" element={<PostUnCheck />} />
        <Route path="tasks" element={<TasksPage />} />
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
