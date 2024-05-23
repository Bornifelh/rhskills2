import React, { useEffect, useRef, useState } from "react";
import {
  IonLabel,
  IonList,
  IonItem,
  IonImg,
  IonRouterLink,
  IonButton,
  IonModal,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonInput,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonPage,
  IonContent,
  IonText,
} from "@ionic/react";
import styles from "./HomePage.module.css";
import { OverlayEventDetail } from "@ionic/react/dist/types/components/react-component-lib/interfaces";

interface entreprise {
  id: number;
  nomEntreprise: string;
  secteurEntreprise: string;
  villeEntreprise: string;
  paysEntreprise: string;
  detailsEntreprise: string;
  lienEntreprise: string;
  offreEntreprise: string;
  logoEntreprise: string;
}

const EntreprisePage: React.FC = () => {
  const [entreprises, setEntreprises] = useState<entreprise[]>([]);
  const [selectedEntreprise, setSelectedJob] = useState<entreprise | null>(
    null
  );
  const modalRef = useRef<HTMLIonModalElement>(null);
  const inputRef = useRef<HTMLIonInputElement>(null);
  const [message, setMessage] = useState<string>();

  useEffect(() => {
    // Appel de l'API PHP pour récupérer les emplois
    fetch(
      "http://localhost/ionic projects/rh-skills/src/bdd/get_entreprise.php"
    )
      .then((response) => response.json())
      .then((data: entreprise[]) => setEntreprises(data))
      .catch((error) => console.error("Error fetching jobs:", error));
  }, []);

  function confirm() {
    modalRef.current?.dismiss(inputRef.current?.value, "confirm");
  }

  function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
    if (ev.detail.role === "confirm") {
      setMessage(`Hello, ${ev.detail.data}!`);
    }
  }

  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal(job: entreprise) {
    setSelectedJob(job);
    setIsModalOpen(true);
  }

  function closeModal() {
    setSelectedJob(null);
    setIsModalOpen(false);
  }
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonList className={styles.contentListJobs}>
          {entreprises.map((entreprise) => (
            <IonCard
              key={entreprise.id}
              button
              onClick={() => openModal(entreprise)}
            >
              <IonCardHeader>
                <IonImg
                  src={entreprise.logoEntreprise}
                  className={styles.logoJob}
                  alt={entreprise.nomEntreprise}
                />
                <IonCardTitle className={styles.titreJob}>
                  {entreprise.nomEntreprise}
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <div className={styles.sectionText}>
                  <IonText>
                    <h2>
                      Siège social : {entreprise.villeEntreprise},{" "}
                      {entreprise.paysEntreprise} ({entreprise.offreEntreprise}{" "}
                      Offres)
                    </h2>
                  </IonText>
                </div>
              </IonCardContent>
            </IonCard>
          ))}
        </IonList>
      </IonContent>
      {selectedEntreprise && (
        <IonModal isOpen={isModalOpen} onDidDismiss={() => closeModal()}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => setSelectedJob(null)}>
                  Cancel
                </IonButton>
              </IonButtons>
              <IonTitle>{selectedEntreprise?.nomEntreprise}</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonCard>
              {selectedEntreprise && (
                <div>
                  <IonImg
                    src={selectedEntreprise.logoEntreprise}
                    className={styles.logoJob}
                    alt={selectedEntreprise.nomEntreprise}
                  />
                  <IonList lines="none">
                    <IonItem>
                      <IonText>
                        <h3>
                          {selectedEntreprise.villeEntreprise},{" "}
                          {selectedEntreprise.paysEntreprise}
                        </h3>
                      </IonText>
                    </IonItem>
                    <IonItem>
                      <IonLabel>
                        {selectedEntreprise.detailsEntreprise}
                      </IonLabel>
                    </IonItem>
                    <IonItem>
                      <IonLabel>
                        Offres d'emplois displonibles :{" "}
                        {selectedEntreprise.offreEntreprise}
                      </IonLabel>
                    </IonItem>
                    <IonItem>
                      <h4>
                        <a href="">Voir les offres</a>
                      </h4>
                    </IonItem>
                    <IonItem>
                      <IonLabel>
                        Site officiel :{" "}
                        <a
                          href={selectedEntreprise.lienEntreprise}
                          target="_blank"
                        >
                          {selectedEntreprise.lienEntreprise}
                        </a>
                      </IonLabel>
                    </IonItem>
                  </IonList>
                </div>
              )}
            </IonCard>
          </IonContent>
          <IonButton onClick={() => setSelectedJob(null)}>
            Voir les offres ({selectedEntreprise.offreEntreprise})
          </IonButton>
        </IonModal>
      )}
    </IonPage>
  );
};
export default EntreprisePage;
