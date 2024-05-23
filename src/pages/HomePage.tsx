import React, { useEffect, useRef, useState } from "react";
import {
  IonContent,
  IonPage,
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
  IonGrid,
  IonRow,
  IonInfiniteScroll,
  IonCol,
  IonSearchbar,
  IonIcon,
  IonItemGroup,
  IonItemDivider,
  IonText,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect } from "react-router";
import styles from "./HomePage.module.css";
import { OverlayEventDetail } from "@ionic/core/components";
import imageCut from "../images/logo-google-icon.png";
import { filter, notifications, wallet } from "ionicons/icons";
import { useHistory } from "react-router";

interface Job {
  id: number;
  imagePoste: string;
  poste: string;
  lieu: string;
  dateSaisie: string;
  descriptionPoste: string;
  responsabilitePoste: string;
  idEntreprise: string;
}

interface Requirejob {
  id: number;
  nomRequirement: string;
  idJobs: string;
}

const HomePage: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobrequirement, setJobrequirements] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const modalRef = useRef<HTMLIonModalElement>(null);
  const inputRef = useRef<HTMLIonInputElement>(null);
  const [message, setMessage] = useState<string>();
  const [searchTerm, setSearchTerm] = useState<Job[]>([]);
  const [searchResults, setSearchResults] = useState<Job[]>([]);
  const history = useHistory();

  useEffect(() => {
    // Appel de l'API PHP pour récupérer les emplois
    fetch("http://localhost/ionic projects/rh-skills/src/bdd/get_jobs.php")
      .then((response) => response.json())
      .then((data: Job[]) => setJobs(data))
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

  const handleSearch = async (event: CustomEvent) => {
    const term = event.detail.value;
    setSearchTerm(term);

    // Envoyer une requête à l'API PHP avec le terme de recherche
    try {
      if (term) {
        const response = await fetch(
          `http://localhost/ionic%20projects/rh-skills/src/bdd/search_job.php?search=${term}`
        );
        if (!response.ok) {
          throw new Error("Il n'y a pas de résultats pour votre recherche");
        }
        const data = await response.json();
        setSearchResults(data);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error searching:", error);
      // Afficher un message d'erreur à l'utilisateur
    }
  };

  const userId = localStorage.getItem("userId");
  if (userId) {
    fetch(
      `http://localhost/ionic%20projects/rh-skills/src/bdd/get_profile_details.php?id=${userId}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.error("Error fetching profile data: ", error);
      });
  }

  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal(job: Job) {
    setSelectedJob(job);
    setIsModalOpen(true);
  }

  function closeModal() {
    setSelectedJob(null);
    setIsModalOpen(false);
  }

  const modal = useRef<HTMLIonModalElement>(null);

  const navigateToNotification = () => {
    history.push("/NotificationsPage");
  };
  return (
    <IonPage>
      <IonContent fullscreen>
        {/* Bienvenue */}
        <IonGrid>
          <IonRow className={styles.rowbienvenue}>
            <IonCol>
              <IonRow>
                <IonButton>
                  <IonIcon icon={wallet}></IonIcon>
                </IonButton>
                <IonText>
                  <h4>Hello, {user?.prenomUsers}</h4>
                </IonText>
              </IonRow>
            </IonCol>
            <IonButton onClick={navigateToNotification}>
              <IonIcon icon={notifications}></IonIcon>
            </IonButton>
          </IonRow>
        </IonGrid>
        {/* Recherche */}
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonSearchbar
                placeholder="Poste recherché"
                onIonChange={handleSearch}
              ></IonSearchbar>
            </IonCol>
            <IonCol size="auto">
              <IonButton
                fill="clear"
                style={{ with: "80px" }}
                id="open-modal"
                expand="block"
              >
                <IonIcon icon={filter}></IonIcon>
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
        {/* Tips */}
        <IonGrid>
          <IonRow class="ion-padding" className={styles.rowconseils}>
            <IonText>
              <h3>
                <strong>Conseils</strong>
              </h3>
            </IonText>
            <IonButton fill="clear">Voir tous</IonButton>
          </IonRow>
        </IonGrid>

        <div className={styles.ionwrap}>
          <IonButton className={styles.imagecard}>
            <IonImg src={imageCut} className={styles.image}></IonImg>
          </IonButton>
        </div>
        <IonList class="ion-padding">
          <IonText>
            <h3>
              <strong>Jobs recommandés</strong>
            </h3>
          </IonText>
        </IonList>
        <IonRow className={styles.rowcategories}>
          <IonButton>Tout</IonButton>
          <IonButton fill="outline">Design</IonButton>
          <IonButton fill="outline">Marketing</IonButton>
          <IonButton fill="outline">Music</IonButton>
          <IonButton fill="outline">Engineer</IonButton>
          <IonButton fill="outline">Programming</IonButton>
          <IonButton fill="outline">Finance</IonButton>
          <IonButton fill="outline">Voir tout</IonButton>
        </IonRow>

        <IonList className={styles.contentListJobs}>
          {jobs.map((job) => (
            <IonCard key={job.id} button onClick={() => openModal(job)}>
              <IonGrid>
                <IonRow>
                  <IonCol>
                    <IonImg
                      src={job.imagePoste}
                      className={styles.logoJob}
                      alt={job.poste}
                    />
                  </IonCol>
                  <IonCol>
                    <IonText>
                      <h2>{job.poste}</h2>
                    </IonText>
                    <IonLabel>{job.lieu}</IonLabel>
                    <br />
                    <IonLabel>Publié le : {job.dateSaisie}</IonLabel>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCard>
          ))}
        </IonList>
      </IonContent>
      {selectedJob && (
        <IonModal isOpen={isModalOpen} onDidDismiss={() => closeModal()}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => setSelectedJob(null)}>
                  Cancel
                </IonButton>
              </IonButtons>
              <IonTitle>{selectedJob?.poste}</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            {selectedJob && (
              <div>
                <IonCard>
                  <IonImg
                    src={selectedJob.imagePoste}
                    className={styles.logoJob}
                    alt={selectedJob.poste}
                  />
                </IonCard>

                <IonList lines="none">
                  <IonItem>
                    <IonLabel>{selectedJob.lieu}</IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonLabel>Publié le : {selectedJob.dateSaisie}</IonLabel>
                  </IonItem>
                  {}
                  <IonItem></IonItem>
                  <IonItem>
                    <IonLabel>{selectedJob.descriptionPoste}</IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonLabel>{selectedJob.responsabilitePoste}</IonLabel>
                  </IonItem>
                </IonList>
              </div>
            )}
          </IonContent>
          <IonButton onClick={() => setSelectedJob(null)}>
            Postuler maintenant
          </IonButton>
        </IonModal>
      )}

      <IonModal
        ref={modal}
        trigger="open-modal"
        initialBreakpoint={0.5}
        breakpoints={[0, 0.75, 0.75, 0.75]}
      >
        <IonCard>
          <IonItemGroup>
            <IonItemDivider>
              <IonLabel>Type</IonLabel>
              <IonButton fill="clear">Voir tout</IonButton>
            </IonItemDivider>

            <IonGrid>
              <IonRow>
                <IonButton>Tout</IonButton>
                <IonButton>Design</IonButton>
                <IonButton>Marketing</IonButton>
                <IonButton>Music</IonButton>
                <IonButton>Engineer</IonButton>
                <IonButton>Programming</IonButton>
                <IonButton>Finance</IonButton>
              </IonRow>
            </IonGrid>
          </IonItemGroup>

          <IonItemGroup>
            <IonItemDivider>
              <IonLabel>Salaire</IonLabel>
            </IonItemDivider>

            <IonGrid>
              <IonRow>
                <IonButton>Tout</IonButton>
                <IonButton>0k à 200k XAF</IonButton>
                <IonButton>200k XAF - 400k XAF</IonButton>
                <IonButton>400k XAF - plus</IonButton>
              </IonRow>
            </IonGrid>
          </IonItemGroup>

          <IonItemGroup>
            <IonItemDivider>
              <IonLabel>Localisation</IonLabel>
              <IonButton fill="clear">Voir tout</IonButton>
            </IonItemDivider>

            <IonGrid>
              <IonRow>
                <IonButton>Tout</IonButton>
                <IonButton>Gabon</IonButton>
                <IonButton>France</IonButton>
                <IonButton>Canada</IonButton>
              </IonRow>
            </IonGrid>
          </IonItemGroup>
        </IonCard>
        <IonButton>Sauvegarder les modifications</IonButton>
      </IonModal>
    </IonPage>
  );
};

export default HomePage;
