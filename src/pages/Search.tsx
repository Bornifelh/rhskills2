import React, { useState, useEffect, useRef } from "react";
import {
  IonContent,
  IonPage,
  IonList,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonText,
  IonSearchbar,
  IonModal,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  IonImg,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonItemGroup,
  IonItemDivider,
  IonItem,
} from "@ionic/react";
import { filter, notifications, pin, wallet } from "ionicons/icons";
import styles from "./HomePage.module.css";
import imgApplica from "../images/img-main-page.png";

interface Job {
  id: number;
  poste: string;
  lieu: string;
  dateSaisie: string;
  imagePoste: string;
  descriptionPoste: string;
  responsabilitePoste: string;
}

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<Job[]>([]);
  const [searchResults, setSearchResults] = useState<Job[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalRef = useRef<HTMLIonModalElement>(null);
  const inputRef = useRef<HTMLIonInputElement>(null);

  useEffect(() => {
    // Appel de l'API PHP pour récupérer les emplois
    fetch("http://localhost/ionic projects/rh-skills/src/bdd/get_jobs.php")
      .then((response) => response.json())
      .then((data: Job[]) => setJobs(data))
      .catch((error) => console.error("Error fetching jobs:", error));
  }, []);

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

  // const handleSearchLocation = async (event: CustomEvent) => {
  //   const location = event.detail.value;
  //   setSearchTerm(location);

  //   // Envoyer une requête à l'API PHP avec le terme de recherche
  //   try {
  //     if (location) {
  //       const response = await fetch(
  //         `http://localhost/ionic%20projects/rh-skills/src/bdd/search_job.php?location=${location}`
  //       );
  //       if (!response.ok) {
  //         throw new Error("Il n'y a pas de résultats pour votre recherche");
  //       }
  //       const data = await response.json();
  //       setSearchResults(data);
  //     } else {
  //       setSearchResults([]);
  //     }
  //   } catch (error) {
  //     console.error("Error searching:", error);
  //     // Afficher un message d'erreur à l'utilisateur
  //   }
  // };

  function openModal(job: Job) {
    setSelectedJob(job);
    setIsModalOpen(true);
  }

  function closeModal() {
    setSelectedJob(null);
    setIsModalOpen(false);
  }

  const modal = useRef<HTMLIonModalElement>(null);

  return (
    <IonPage>
      <IonContent fullscreen>
        {/* Bienvenue */}
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonRow>
                <IonButton>
                  <IonIcon icon={wallet}></IonIcon>
                </IonButton>
                <IonText>
                  <h4>Soumissions</h4>
                </IonText>
              </IonRow>
            </IonCol>
            <IonButton>
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

        <IonList>
          {searchResults.map((result: Job) => (
            <IonCard key={result.id} onClick={() => openModal(result)}>
              <IonGrid>
                <IonRow>
                  <IonCol size="auto">
                    <IonImg
                      src={result.imagePoste}
                      alt={result.poste}
                      style={{ width: "110px", heigth: "50px" }}
                    />
                  </IonCol>
                  <IonCol style={{ width: "auto" }}>
                    <IonCardHeader>
                      <IonCardTitle>{result.poste}</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <IonText>{result.lieu}</IonText> <br />
                      <IonText>Publié le {result.dateSaisie}</IonText>
                    </IonCardContent>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCard>
          ))}
          <IonRow className={styles.rowcategories}>
            <IonButton>Tout</IonButton>
            <IonButton fill="outline">Accepté</IonButton>
            <IonButton fill="outline">Interview</IonButton>
            <IonButton fill="outline">Rejeté</IonButton>
          </IonRow>
        </IonList>
        <IonList>
          <IonCard>
            <IonGrid>
              <IonRow>
                <IonCol size="auto">
                  <IonImg
                    className={styles.imgapplications}
                    src={imgApplica}
                  ></IonImg>
                </IonCol>
                <IonCol>
                  <IonText>UI/UX Designer</IonText>
                  <br />
                  <IonLabel>Airtel</IonLabel>
                </IonCol>
              </IonRow>
            </IonGrid>
            <IonButton className={styles.btnitemapplications}>
              Pending
            </IonButton>
          </IonCard>

          <IonCard>
            <IonGrid>
              <IonRow>
                <IonCol size="auto">
                  <IonImg
                    className={styles.imgapplications}
                    src={imgApplica}
                  ></IonImg>
                </IonCol>
                <IonCol>
                  <IonText>UI/UX Designer</IonText>
                  <br />
                  <IonLabel>Yves Le Grand</IonLabel>
                </IonCol>
              </IonRow>
            </IonGrid>
            <IonButton fill="outline" className={styles.btnitemapplications}>
              Rejeté
            </IonButton>
          </IonCard>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Search;
