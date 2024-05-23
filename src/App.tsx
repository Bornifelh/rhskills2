import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import MainPage from "./pages/MainPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import SeConnecter from "./pages/SeConnecter";
import Search from "./pages/Search";
import EntreprisePage from "./pages/EntreprisePage";
import AjoutExperiencePage from "./pages/AjoutExperiencesPage";
import NotificationsPage from "./pages/NotificationsPage";
import SettingsPage from "./pages/SettingsPage";
import ApplyPage from "./pages/ApplyPage";

// Assurez-vous que le chemin est correct

// CSS Imports...

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/mainpage">
          <MainPage />
        </Route>
        <Route exact path="/homepage">
          <HomePage />
        </Route>
        <Route exact path="/profilepage">
          <ProfilePage />
        </Route>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route exact path="/seconnecter">
          <SeConnecter />
        </Route>
        <Route exact path="/searchpage">
          <Search />
        </Route>
        <Route exact path="/entreprise">
          <EntreprisePage />
        </Route>
        <Route exact path="/ajoutexperience">
          <AjoutExperiencePage />
        </Route>
        <Route exact path="/notifications">
          <NotificationsPage />
        </Route>

        <Route exact path="/SettingsPage">
          <SettingsPage />
        </Route>
        <Route exact path="/ApplyPage">
          <ApplyPage />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
