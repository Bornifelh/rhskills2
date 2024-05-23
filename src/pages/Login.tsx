import React from "react";
import styles from "./Login.module.css";

import {
  IonContent,
  IonPage,
  IonImg,
  IonButton,
  IonList,
  IonText,
  IonNavLink,
  IonInput,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonCheckbox,
} from "@ionic/react";

const Login: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start" className={styles.contentback}>
            <IonBackButton defaultHref="/home" text="Retour" />
          </IonButtons>
          <IonText slot="end">Créer un compte</IonText>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className={styles.contenairLogin}>
        <IonList className={styles.contentmain}>
          <IonText className={styles.textcreercompte}>
            Créer un compte avec un Email
          </IonText>
          <IonText className={styles.emailpass}>Ton mail :</IonText>
          <IonInput
            className={styles.textinput}
            fill="outline"
            placeholder="Saisissez votre email"
          ></IonInput>
          <IonText className={styles.emailpass}>Mot de passe :</IonText>
          <IonInput
            className={styles.textinput}
            type="password"
            placeholder="********************"
          ></IonInput>
          <IonList className={styles.contentchecktext}>
            <IonCheckbox className={styles.chekbox}></IonCheckbox>
            <IonText>
              I agree to the{" "}
              <a href="" target="_blank">
                terms & conditions
              </a>{" "}
              and
              <a href="" target="_blank">
                Privacy Policy
              </a>
            </IonText>
          </IonList>
          <IonButton className={styles.btncreer}>Créer un compte</IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};
export default Login;
