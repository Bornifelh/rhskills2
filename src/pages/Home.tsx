import React, { useEffect } from "react";
import {
  IonContent,
  IonPage,
  IonImg,
  IonButton,
  IonList,
  IonText,
  IonIcon,
} from "@ionic/react";
import { useHistory } from "react-router-dom"; // Importation de useHistory pour la navigation
import styles from "./style.module.css";
import imgMainPage from "../images/img-main-page.png";
import { logoGoogle } from "ionicons/icons";
import SeConnecter from "./SeConnecter";

const Home: React.FC = () => {
  const history = useHistory(); // Utilisation de l'hook useHistory pour la navigation

  // Fonction pour naviguer vers la page de login
  const navigateToLogin = () => {
    history.push("/SeConnecter");
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (!storedEmail) {
      // Rediriger vers la page de connexion si aucune information d'utilisateur n'est trouvée
      history.push("/SeConnecter");
    } else {
      history.push("/MainPage");
    }
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen className={styles.contenair}>
        <IonImg
          src={imgMainPage}
          alt="Main Page"
          className={styles.imgcontent}
        />
        <IonList className={styles.btncontents}>
          <IonText className={styles.textprincipal}>
            Trouve ton travail de rêve avec RH-Skills
          </IonText>
          <div className={styles.contentconnexion}>
            <IonText>Avez-vous un compte ?</IonText>
            <IonButton
              fill="clear"
              className={styles.btnlogin}
              onClick={navigateToLogin}
            >
              Se connecter
            </IonButton>
          </div>

          <IonButton className={styles.btns} onClick={navigateToLogin}>
            S'inscrire avec un email
          </IonButton>

          <IonButton
            fill="outline"
            className={`${styles.btns} ${styles.google}`}
          >
            <IonIcon icon={logoGoogle} />
            S'inscrire avec Google
          </IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
