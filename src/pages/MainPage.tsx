import React from "react";
import styles from "./MainPage.module.css";
import {
  IonContent,
  IonPage,
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect } from "react-router";
import HomePage from "./HomePage";
import Search from "./Search";
import NotificationsPage from "./NotificationsPage";
import ProfilePage from "./ProfilePage";

import { briefcase, chatbubbles, list, person } from "ionicons/icons";

const MainPage: React.FC = () => {
  const history = useHistory();

  const navigateToLogin = () => {
    history.push("/login");
  };

  return (
    <IonReactRouter>
      <IonPage>
        <IonContent>
          <IonTabs className={styles.contentMainPage}>
            <IonRouterOutlet>
              <Redirect exact from="/" to="/accueil" />
              <Route path="/accueil" component={HomePage} exact={true} />
              <Route path="/recherche" component={Search} exact={true} />
              <Route
                path="/notifications"
                component={NotificationsPage}
                exact={true}
              />
              <Route path="/profile" component={ProfilePage} exact={true} />
            </IonRouterOutlet>

            <IonTabBar slot="bottom">
              <IonTabButton tab="postes" href="/accueil">
                <IonIcon icon={briefcase} />
                <IonLabel>Postes</IonLabel>
              </IonTabButton>
              <IonTabButton tab="recherche" href="/recherche">
                <IonIcon icon={list} />
                <IonLabel>Soumission</IonLabel>
              </IonTabButton>
              <IonTabButton tab="notifications" href="/notifications">
                <IonIcon icon={chatbubbles} />
                <IonLabel>Notifications</IonLabel>
              </IonTabButton>
              <IonTabButton tab="profile" href="/profile">
                <IonIcon icon={person} />
                <IonLabel>Profile</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonContent>
      </IonPage>
    </IonReactRouter>
  );
};

export default MainPage;
