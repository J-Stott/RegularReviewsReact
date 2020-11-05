import React, { Suspense, lazy } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import PageContainer from "./shared/components/PageContainer";
import ScrollToTop from "./shared/components/ScrollToTop";
import LoadingSpinner from "./shared/components/LoadingSpinner";

import Navbar from "./shared/navigation/Navbar";
import Footer from "./shared/components/Footer/Footer";
import HomePage from "./home/pages/home";
import ReviewPage from "./review/pages/review";
import UserPage from "./user/pages/user";
import GamePage from "./game/pages/game";
import LoginPage from "./auth/pages/login";
import LogoutPage from "./auth/pages/logout";

import RegisterPage from "./auth/pages/register";
import ForgotPage from "./auth/pages/forgot";
import ResetPage from "./auth/pages/reset";

import PrivacyPage from "./Legal/pages/privacy";
import TermsPage from "./Legal/pages/terms";
import CookiesPage from "./Legal/pages/cookies";

import { AuthContext } from "./context/AuthContext";
import { useAuth } from "./hooks/auth-hook";

import { conditionalRender } from "./Utility/RenderUtilities";
import "./App.css";

const CreatePage = lazy(() => import("./review/pages/create"));
const CreateGamePage = lazy(() => import("./review/pages/create-game"));
const ReviewEditPage = lazy(() => import("./review/pages/edit"));
const DraftEditPage = lazy(() => import("./drafts/pages/edit"));
const DraftsPage = lazy(() => import("./drafts/pages/drafts"));
const ProfilePage = lazy(() => import("./profile/pages/profile"));


const defaultAvatar = "/uploads/avatars/default.png";

function App() {
  const { checkingAuth, userData, login, logout, updateUserData } = useAuth();

  let routes = null;

  if (!checkingAuth) {
    if (userData !== null) {
      routes = (
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/users/:username" exact>
            <UserPage />
          </Route>
          <Route path="/games/:gameLink" exact>
            <GamePage />
          </Route>
          <Route path="/reviews/create" exact>
            <CreatePage />
          </Route>
          <Route path="/reviews/create/:linkName" exact>
            <CreateGamePage />
          </Route>
          <Route path="/reviews/:reviewId" exact>
            <ReviewPage />
          </Route>
          <Route path="/reviews/:reviewId/edit" exact>
            <ReviewEditPage />
          </Route>
          <Route path="/privacy" exact>
            <PrivacyPage />
          </Route>
          <Route path="/terms" exact>
            <TermsPage />
          </Route>
          <Route path="/cookies" exact>
            <CookiesPage />
          </Route>
          <Route path="/drafts/:username" exact>
            <DraftsPage />
          </Route>
          <Route path="/drafts/:draftId/edit" exact>
            <DraftEditPage />
          </Route>
          <Route path="/profile/:username" exact>
            <ProfilePage />
          </Route>
          <Route path="/logout" exact>
            <LogoutPage />
          </Route>
          <Redirect to="/" />
        </Switch>
      );
    } else {
      routes = (
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/users/:username" exact>
            <UserPage />
          </Route>
          <Route path="/games/:gameLink" exact>
            <GamePage />
          </Route>
          <Route path="/reviews/:reviewId" exact>
            <ReviewPage />
          </Route>
          <Route path="/privacy" exact>
            <PrivacyPage />
          </Route>
          <Route path="/terms" exact>
            <TermsPage />
          </Route>
          <Route path="/cookies" exact>
            <CookiesPage />
          </Route>
          <Route path="/login" exact>
            <LoginPage />
          </Route>
          <Route path="/register" exact>
            <RegisterPage />
          </Route>
          <Route path="/forgot" exact>
            <ForgotPage />
          </Route>
          <Route path="/reset/:token" exact>
            <ResetPage />
          </Route>
          <Redirect to="/login" />
        </Switch>
      );
    }
  }

  return conditionalRender(
    <AuthContext.Provider
      value={{
        isLoggedIn: userData !== null,
        userData: userData,
        login: login,
        logout: logout,
        updateUserData: updateUserData,
      }}
    >
      <BrowserRouter>
        <PageContainer>
          <ScrollToTop />
          <Navbar
            avatar={userData !== null ? userData.avatar : defaultAvatar}
          />
          <Suspense
            fallback={
              <div>
                <LoadingSpinner />
              </div>
            }
          >
            {conditionalRender(routes, !checkingAuth)}
          </Suspense>
          <Footer />
        </PageContainer>
      </BrowserRouter>
    </AuthContext.Provider>,
    !checkingAuth
  );
}

export default App;
