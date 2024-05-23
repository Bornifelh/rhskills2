import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import imgLock from "../images/img-main-page.png";
import styles from "./Notifications.module.css";
import React from "react";

const NotificationsPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonRow class="ion-padding">
            <IonButtons>
              <IonBackButton defaultHref="/mainpage"></IonBackButton>
            </IonButtons>
            <IonTitle>Notifications</IonTitle>
          </IonRow>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard className={styles.cardlist}>
          <IonImg src={imgLock} className={styles.imglist}></IonImg>
          <IonList className={styles.listnotifications}>
            <IonText>
              <h2>
                Votre soumission à BIS <br /> La company a lu
              </h2>
            </IonText>
            <IonLabel>17/04/2024 - 14:30</IonLabel>
          </IonList>
        </IonCard>

        <IonCard className={styles.cardlist}>
          <IonImg src={imgLock} className={styles.imglist}></IonImg>
          <IonList className={styles.listnotifications}>
            <IonText>
              <h2>
                Votre soumission à BIS <br /> La company a lu
              </h2>
            </IonText>
            <IonLabel>17/04/2024 - 14:30</IonLabel>
          </IonList>
        </IonCard>

        <IonCard className={styles.cardlist}>
          <IonImg src={imgLock} className={styles.imglist}></IonImg>
          <IonList className={styles.listnotifications}>
            <IonText>
              <h2>
                Votre soumission à BIS <br /> La company a lu
              </h2>
            </IonText>
            <IonLabel>17/04/2024 - 14:30</IonLabel>
          </IonList>
        </IonCard>

        <IonCard className={styles.cardlist}>
          <IonImg src={imgLock} className={styles.imglist}></IonImg>
          <IonList className={styles.listnotifications}>
            <IonText>
              <h2>
                Votre soumission à BIS <br /> La company a lu
              </h2>
            </IonText>
            <IonLabel>17/04/2024 - 14:30</IonLabel>
          </IonList>
        </IonCard>

        <IonCard className={styles.cardlist}>
          <IonImg src={imgLock} className={styles.imglist}></IonImg>
          <IonList className={styles.listnotifications}>
            <IonText>
              <h2>
                Votre soumission à BIS <br /> La company a lu
              </h2>
            </IonText>
            <IonLabel>17/04/2024 - 14:30</IonLabel>
          </IonList>
        </IonCard>

        <IonCard className={styles.cardlist}>
          <IonImg src={imgLock} className={styles.imglist}></IonImg>
          <IonList className={styles.listnotifications}>
            <IonText>
              <h2>
                Votre soumission à BIS <br /> La company a lu
              </h2>
            </IonText>
            <IonLabel>17/04/2024 - 14:30</IonLabel>
          </IonList>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};
export default NotificationsPage;
