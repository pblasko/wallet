import { IonButtons, IonCard, IonCardContent, IonChip, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonMenuButton, IonPage, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import { useState } from 'react';
import { walletOutline } from 'ionicons/icons';

const Home: React.FC = () => {
    const [accounts, setAccounts] = useState<any []>([]);
    const [loading, setLoading] = useState<boolean>(true);
    useIonViewWillEnter(() => {
        const fetchAccounts = async () => {
            const accounts = await getAccounts();
            setAccounts(accounts);
            setLoading(false);
          };
          fetchAccounts();
      });
    const getAccounts = async () => {
        const data = await fetch ('http://192.168.1.239:8000/');
        const accounts = await data.json();
        return accounts;
    }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={'primary'}>
          <IonButtons slot='start'>
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {accounts.map((account, index) => ( 
            <IonCard key={index}>
                <IonCardContent>
                    <IonItem lines='none'>
                        <IonIcon slot='start' icon={walletOutline} />
                        <IonLabel>
                            {account.name}
                        </IonLabel>
                        <IonChip slot='end' color={'tertiary'}>
                            {account.actualBalance}
                        </IonChip>
                    </IonItem>
                </IonCardContent>
            </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Home;
