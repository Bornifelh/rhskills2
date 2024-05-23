import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonPage,
  IonList,
  IonImg,
  IonLabel,
  IonItem,
  IonText,
  IonHeader,
  IonIcon,
  IonButton,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle,
  IonGrid,
  IonRow,
  IonCol,
  IonAvatar,
} from "@ionic/react";
import imguser from "../images/img-main-page.png";
import {
  addCircle,
  arrowBack,
  ellipsisHorizontalCircle,
  notifications,
  person,
  ribbon,
  settings,
  shareSocial,
  wallet,
} from "ionicons/icons";

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [userExperience, setUserExperience] = useState<any[]>([]);
  const [userEducation, setUserEducation] = useState<any[]>([]);

  useEffect(() => {
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

      fetch(
        `http://localhost/ionic%20projects/rh-skills/src/bdd/get_experiences.php?idUsers=${userId}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch");
          }
          return response.json();
        })
        .then((data) => {
          setUserExperience(data);
        })
        .catch((error) => {
          console.error("Error fetching experiences data: ", error);
        });

      fetch(
        `http://localhost/ionic%20projects/rh-skills/src/bdd/get_education.php?idUsersEducation=${userId}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch");
          }
          return response.json();
        })
        .then((data) => {
          setUserEducation(data);
        })
        .catch((error) => {
          console.error("Error fetching education data: ", error);
        });
    }
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonRow>
                <IonButton fill="clear">
                  <IonIcon icon={person}></IonIcon>
                </IonButton>
                <IonText>
                  <h4>Profile</h4>
                </IonText>
              </IonRow>
            </IonCol>
            <IonButton>
              <IonIcon icon={settings}></IonIcon>
            </IonButton>
          </IonRow>
        </IonGrid>
        <IonList>
          <IonHeader>
            <IonCard>
              <IonImg src={user?.imgUsers} alt="User profile" />
              <IonCardHeader>
                <IonCardTitle>
                  {user?.nomUsers} {user?.prenomUsers}
                </IonCardTitle>
                <IonCardSubtitle>{user?.titreUsers}</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
                <IonGrid>
                  <IonCol>
                    <IonLabel>
                      {user?.villeactuelUsers}, {user?.paysactuelUsers}
                    </IonLabel>
                  </IonCol>
                  <IonCol>
                    <IonLabel>{user?.email}</IonLabel>
                  </IonCol>
                </IonGrid>
              </IonCardContent>
            </IonCard>
          </IonHeader>
        </IonList>
        {/* Experience professionnels */}
        <IonList>
          <IonItem>
            <IonLabel>
              <h2>Experience professionnel</h2>
            </IonLabel>
            <IonButtons slot="end">
              <IonButton /*onClick="{addExperience}"*/>
                <IonIcon icon={addCircle}></IonIcon>
              </IonButton>
              <IonButton /*onClick="{showOptions}"*/>
                <IonIcon icon={ellipsisHorizontalCircle}></IonIcon>
              </IonButton>
            </IonButtons>
          </IonItem>

          {userExperience.map((experience, index) => (
            <IonCard key={index}>
              <IonCardHeader>
                <IonCardTitle>{experience?.posteExperiences}</IonCardTitle>
                <IonCardSubtitle>
                  {experience?.entrepriseExperiences} -{" "}
                  {experience?.typeContrat}
                </IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
                <IonText>
                  <strong>
                    {experience?.periodeDebut} à {experience?.periodeFin},{" "}
                    {experience?.paysExperiences}
                  </strong>
                </IonText>
                <br />
                <IonText>
                  <p>{experience?.tachesExperiences}</p>
                </IonText>
              </IonCardContent>
            </IonCard>
          ))}
        </IonList>

        {/* Education */}
        <IonList>
          <IonItem>
            <IonLabel>Education</IonLabel>
            <IonButtons>
              <IonButton>
                <IonIcon icon={addCircle}></IonIcon>
              </IonButton>
              <IonButton>
                <IonIcon icon={ellipsisHorizontalCircle}></IonIcon>
              </IonButton>
            </IonButtons>
          </IonItem>

          {userEducation.map((education, index) => (
            <IonCard key={index}>
              <IonCardHeader>
                <IonCardTitle>{education?.titreEducation}</IonCardTitle>
                <IonCardSubtitle>
                  {education?.diplomeEducation} |{" "}
                  {education?.etablissementEducation}
                </IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
                <IonLabel>
                  {education?.debutEducation} - {education?.finEducation}
                </IonLabel>
                <br />
                <IonLabel>{education?.detailsEducation}</IonLabel>
                <br />
                <IonLabel>
                  {education?.villeEducation} - {education?.paysEducation}
                </IonLabel>
              </IonCardContent>
            </IonCard>
          ))}
        </IonList>

        {/* PREMIUM ACTIVATION */}
        <IonList>
          <IonIcon icon={ribbon}></IonIcon>
          <IonLabel>Informations privées</IonLabel>
        </IonList>
        <IonCard>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonList></IonList>
                </IonCol>
                <IonCol>2</IonCol>
                <IonCol>3</IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
