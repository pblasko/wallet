import { IonButton, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonPage, IonRow, IonTitle, IonToolbar, useIonLoading, useIonRouter } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { logInOutline, personCircleOutline, videocamOutline } from 'ionicons/icons';
import Amphora from '../assets/amphora.png';

const Login: React.FC = () => {
    const router = useIonRouter();
    const [present, dismiss] = useIonLoading();
    const doLogin = async(event: any) => {
        event.preventDefault();
        await present('Logging in...');
        setTimeout(async () => {
          dismiss();
          router.push('/app', 'forward');
        }, 2000);
    }
  return (
    <IonPage>
        <IonHeader>
            <IonToolbar color={'primary'}>
                <IonTitle>Blasko's wallet</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent scrollY={false} className='ion-padding'>
            <IonGrid fixed>
                <IonRow class='ion-justify-content-center'>
                <IonCol size='12' sizeMd='8' sizeLg='6' sizeXl='4'>
                    <div className='ion-text-center ion-padding'>
                        <img src={Amphora} alt='Amphora logo' width={'40%'} />
                    </div>
                </IonCol>
                </IonRow>
                <IonRow class='ion-justify-content-center'>
                <IonCol size='12' sizeMd='8' sizeLg='6' sizeXl='4'>
                    <IonCard>
                    <IonCardContent>
                        <form onSubmit={doLogin}>
                            <IonInput fill='outline' labelPlacement='floating' label='e-mail' type='email' placeholder='peter@posta.hu'></IonInput>
                            <IonInput className='ion-margin-top' fill='outline' labelPlacement='floating' label='password' type='password'></IonInput>
                            <IonButton type='submit' expand='block' className='ion-margin-top'>
                                Login
                                <IonIcon icon={logInOutline} slot="end" />
                            </IonButton>
                        </form>
                    </IonCardContent>
                    </IonCard>
                </IonCol>
                </IonRow>
            </IonGrid>
        </IonContent>
    </IonPage>
  );
};

export default Login;