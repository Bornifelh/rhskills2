import React, { useState } from "react";
import styles from "./Login.module.css";
import {
  IonContent,
  IonPage,
  IonButton,
  IonList,
  IonText,
  IonInput,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonCheckbox,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
} from "@ionic/react";
import { useHistory } from "react-router";
import { logoFacebook, logoGoogle } from "ionicons/icons";

const SeConnecter: React.FC = () => {
  const history = useHistory();

  const navigateToLogin = () => {
    history.push("/login");
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost/ionic%20projects/rh-skills/src/bdd/login.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const userData = await response.json();

      if (!response.ok) {
        throw new Error(userData.message);
      }

      if (userData.user_email) {
        // Modification ici
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userId", userData.user_id.toString());
        history.push("/MainPage");
      } else {
        throw new Error("Réponse de l'API inattendue.");
      }
    } catch (error) {
      setError("Erreur rencontrée"); // Correction de la syntaxe ici
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start" className={styles.contentback}>
            <IonBackButton defaultHref="/home" text="Retour" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className={styles.contenairLogin}>
        <IonList className={styles.contentmain}>
          <IonText className={styles.textcreercompte}>Connexion</IonText>
          <IonLabel className={styles.emailpass}>Compte</IonLabel>
          <IonInput
            fill="outline"
            placeholder="Saisissez votre email"
            value={email}
            onIonChange={(e) => setEmail(e.detail.value!)}
          ></IonInput>
          <IonText className={styles.emailpass}>Mot de passe :</IonText>
          <IonInput
            fill="outline"
            type="password"
            placeholder="********************"
            value={password}
            onIonChange={(e) => setPassword(e.detail.value!)}
          ></IonInput>
          <IonList className={styles.contentchecktext}>
            <IonCheckbox className={styles.chekbox}></IonCheckbox>
            <IonLabel>Garder ma session ouverte</IonLabel>
          </IonList>
          <IonButton /*className={styles.btncreer}*/ onClick={handleLogin}>
            Se connecter
          </IonButton>
          <IonText>
            {error && <IonText color="danger">{error}</IonText>}
          </IonText>
          <div className={styles.contentconnexion}>
            <IonText>Avez-vous un compte ?</IonText>
            <IonButton
              fill="clear"
              onClick={navigateToLogin}
            >
              Créer un compte
            </IonButton>
          </div>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonButton>
                  <IonIcon icon={logoFacebook} />
                </IonButton>
              </IonCol>
              <IonCol>
                <IonButton>
                  <IonIcon icon={logoGoogle} />
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default SeConnecter;
