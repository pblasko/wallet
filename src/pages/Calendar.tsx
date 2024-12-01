import {IonButtons, IonContent, IonDatetime, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonCard, IonCardContent, IonButton, useIonToast} from '@ionic/react';
import React, { useState } from 'react';
  
  const Calendar: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<string | undefined>(undefined);
    const [presentToast] = useIonToast();
    const [loading, setLoading] = useState<boolean>(false);
  
    const handleDateChange = (event: CustomEvent) => {
      setSelectedDate(event.detail.value);
    };
  
    const handleSendDate = () => {
      if (selectedDate) {
        setLoading(true);
        setNewDate();
        presentToast({
          message: `Dátum elküldve: ${selectedDate}`,
          duration: 2000,
          color: 'success',
        });
      } else {
        presentToast({
          message: 'Kérlek, válassz dátumot!',
          duration: 2000,
          color: 'warning',
        });
      }
    };

    const setNewDate = async () => {
        fetch('http://192.168.1.239:8000/setNewDate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ date: selectedDate || new Date().toISOString() }),
          })
          .then((response) => response.text())
          .then((data) => {
            setLoading(false);
            presentToast({
                message: `Dátum elküldve: ${data}`,
                duration: 2000,
                color: 'success',
            });
          })
          .catch((error) => {
            setLoading(false);
            console.error("Error saving date:", error);
            presentToast({
                message: "Hiba történt a dátum mentése során.",
                duration: 2000,
                color: "danger",
            });
          });
    }
  
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar color={'primary'}>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Calendar</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
            }}
          >
            <IonCard
                style={{
                    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
                }}
            >
              <IonCardContent className="ion-text-center">
                <IonDatetime
                  presentation="month-year"
                  onIonChange={handleDateChange}
                />
                <IonButton
                  expand="block"
                  color="primary"
                  onClick={handleSendDate}
                  className="ion-margin-top"
                  disabled={loading}
                >
                  {loading ? "Küldés..." : "Dátum küldése"}
                </IonButton>
              </IonCardContent>
            </IonCard>
          </div>
        </IonContent>
      </IonPage>
    );
  };
  
  export default Calendar;
