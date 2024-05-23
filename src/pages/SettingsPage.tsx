import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonRow,
  IonText,
} from "@ionic/react";
import styles from "./Settings.module.css";
import {
  arrowBack,
  eye,
  information,
  lockClosed,
  logOut,
  notifications,
} from "ionicons/icons";
import React, { useRef } from "react";

const SettingsPage: React.FC = () => {
  const modal = useRef<HTMLIonModalElement>(null);
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonRow>
                <IonButton fill="clear">
                  <IonIcon icon={arrowBack}></IonIcon>
                </IonButton>
                <IonText>
                  <h4>Settings</h4>
                </IonText>
              </IonRow>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonList>
          <IonItem>
            <IonButton fill="clear" className={styles.btnsettings}>
              <IonButton className={styles.btnicone}>
                <IonIcon icon={notifications}></IonIcon>
              </IonButton>
              <IonText>
                <h4>Notifications</h4>
              </IonText>
            </IonButton>
          </IonItem>

          <IonItem>
            <IonButton fill="clear" className={styles.btnsettings}>
              <IonButton className={styles.btnicone}>
                <IonIcon icon={lockClosed}></IonIcon>
              </IonButton>
              <IonText>
                <h4>Sécurité</h4>
              </IonText>
            </IonButton>
          </IonItem>

          <IonItem>
            <IonButton fill="clear" className={styles.btnsettings}>
              <IonButton className={styles.btnicone}>
                <IonIcon icon={eye}></IonIcon>
              </IonButton>
              <IonText>
                <h4>Apparence</h4>
              </IonText>
            </IonButton>
          </IonItem>

          <IonItem>
            <IonButton fill="clear" className={styles.btnsettings}>
              <IonButton className={styles.btnicone}>
                <IonIcon icon={information}></IonIcon>
              </IonButton>
              <IonText>
                <h4>Aide</h4>
              </IonText>
            </IonButton>
          </IonItem>

          <IonItem>
            <IonButton
              fill="clear"
              className={styles.btnsettings}
              id="open-modal"
              expand="block"
            >
              <IonButton className={styles.btnicone}>
                <IonIcon icon={eye}></IonIcon>
              </IonButton>
              <IonText>
                <h4>Se déconnecter</h4>
              </IonText>
            </IonButton>
          </IonItem>
        </IonList>
      </IonContent>
      <IonModal
        trigger="open-modal"
        initialBreakpoint={0.2}
        breakpoints={[0, 0.2]}
      >
        <IonGrid>
          <IonIcon icon={logOut}></IonIcon>
          <IonRow>
            <IonText>Etes vous sûr de vouloir vous deconnecter ?</IonText>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton>Oui</IonButton>
            </IonCol>
            <IonCol>
              <IonButton>Non</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonModal>
    </IonPage>
  );
};
export default SettingsPage;
