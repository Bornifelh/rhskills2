import {
  IonCard,
  IonContent,
  IonPage,
  IonInput,
  IonList,
  IonItem,
  IonButton,
  IonTextarea,
  IonText,
  IonHeader,
  IonCardHeader,
  IonCardTitle,
  IonGrid,
  IonRow,
} from "@ionic/react";
import React from "react";

const AjoutExperiencePage = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Nouvelle experience</IonCardTitle>
          </IonCardHeader>
          <IonList>
            <IonItem>
              <IonGrid>
                <IonRow>
                  <IonInput
                    label="Text input"
                    placeholder="Enter text"
                  ></IonInput>
                  <IonInput
                    label="Text input"
                    placeholder="Enter text"
                  ></IonInput>
                  <IonInput
                    label="Text input"
                    placeholder="Enter text"
                  ></IonInput>
                  <IonInput
                    label="Text input"
                    placeholder="Enter text"
                  ></IonInput>

                  {/* Textarea */}
                  <IonTextarea
                    placeholder="Saisissez le details sur votre formation"
                    autoGrow={true}
                  ></IonTextarea>
                </IonRow>
              </IonGrid>
            </IonItem>
          </IonList>
        </IonCard>
        <IonButton>Ajouter</IonButton>
      </IonContent>
    </IonPage>
  );
};
export default AjoutExperiencePage;
