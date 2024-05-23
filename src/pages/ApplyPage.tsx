import {
  IonButton,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonPage,
  IonRow,
  IonText,
  IonToast,
} from "@ionic/react";
import { arrowBack, cloudUploadOutline } from "ionicons/icons";
import image from "../images/logo-google-icon.png";
import React, { useState, useRef } from "react";
import styles from "./Settings.module.css";

export const ApplyPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [showToast, setShowToast] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      setFile(selectedFile);
    }
  };

  const handleFileChange = (event: { target: { files: File[] } }) => {
    const file = event.target.files[0];
    if (file) {
      setShowToast(true);
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonRow>
          <IonButton className="ion-padding">
            <IonIcon icon={arrowBack}></IonIcon>
          </IonButton>
          <IonText className="ion-padding">Poste à postuler</IonText>
        </IonRow>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonImg src={image}></IonImg>
              </IonCol>
              <IonCol>
                <IonText>UI/UX Designer</IonText>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonCard>
        <IonItem>
          <IonText className="ion-padding">
            Chargé votre CV pour postuler à une offre d'emploi
          </IonText>
        </IonItem>

        {/* <div>
            <label htmlFor="file-upload" className={styles.BtnUpload}>
              Upload file
              <input id="file-upload" type="file" onChange={onFileChange} />
            </label>
          </div>
          <IonButton onClick={onFileUpload}>
            Upload file
            <IonIcon icon={cloudUploadOutline} slot="start" />
          </IonButton>
          <input
            type="file"
            hidden
            accept="application/pdf"
            onChange={onFileChange}
          /> */}
        <IonButton
          fill="clear"
          expand="block"
          onClick={handleClick}
          className={styles.BtnUpload}
        >
          <IonIcon icon={cloudUploadOutline} slot="start"></IonIcon>
        </IonButton>
        <input
          ref={fileInputRef}
          type="file"
          style={{ display: "none" }}
          accept="pdf/*"
        />
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="File uploaded successfully!"
          duration={2000}
        />
      </IonContent>
      <IonButton>Postuler</IonButton>
    </IonPage>
  );
};
export default ApplyPage;
