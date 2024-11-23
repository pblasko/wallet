import { IonAlert, IonButton, IonButtons, IonCard, IonCardContent, IonChip, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonMenuButton, IonModal, IonPage, IonSegment, IonSegmentButton, IonSelect, IonSelectOption, IonText, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import { addOutline } from 'ionicons/icons';
import { useEffect, useRef, useState } from 'react';
import './Home.css';

const Item: React.FC = () => {
  const [items, setItems] = useState<any []>([]);
  const [accounts, setAccounts] = useState<any []>([]);
  const [categories, setCategories] = useState<any []>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const cardModal = useRef<HTMLIonModalElement>(null);
  const [showAlert, setShowAlert] = useState(false);
  useIonViewWillEnter(() => {
    loadAllItems();
  });
  const loadAllItems = () => {
    const fetchItems = async () => {
      const allActualData = await getData();
      setAccounts(allActualData.accounts);
      setCategories(allActualData.categories);
      setItems(allActualData.items);
      resetFields();
      setLoading(false);
    };
    fetchItems();
  }
  const getData = async () => {
      const data = await fetch ('http://192.168.1.239:8000/items');
      const allData = await data.json();
      return allData;
  }
  const [inputId, setInputId] = useState<number | null>(null);
  const [inputDate, setInputDate] = useState<string>('');
  const [inputAccount, setInputAccount] = useState<string>('');
  const [inputPlace, setInputPlace] = useState<string>('');
  const [inputCity, setInputCity] = useState<string>('');
  const [inputCategory, setInputCategory] = useState<string>('');
  const [inputNumber, setInputNumber] = useState<number | null>(null);
  const [inputComment, setInputComment] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const modal = useRef<HTMLIonModalElement>(null);
  const doSetting = () => {
    setLoading(true);
    const id = inputId;
    const date = inputDate;
    const accountId = inputAccount;
    const place = inputPlace;
    const city = inputCity;
    const categoryId = inputCategory;
    const number = inputNumber;
    const comment = inputComment;

    if (!date || !accountId || !place || !city || !categoryId || !number) {
      console.log("All fields are required!");
      return;
    }

    const newItem = {
      id,
      date,
      accountId,
      place,
      city,
      categoryId,
      number,
      comment,
    };

    fetch('http://192.168.1.239:8000/settingItem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem),
    })
    .then((response) => response.text())
    .then((data) => {
      setLoading(false);
      modal.current?.dismiss();
      loadAllItems();
    })
    .catch((error) => {
      setLoading(false);
      console.error("Error saving item:", error);
    });
  }
  const doDelete = () => {
    setLoading(true);
    const id = inputId;
    const date = inputDate;
    const accountId = inputAccount;
    const place = inputPlace;
    const city = inputCity;
    const categoryId = inputCategory;
    const number = inputNumber;
    const comment = inputComment;

    const newItem = {
      id,
      date,
      accountId,
      place,
      city,
      categoryId,
      number,
      comment,
    };

    fetch('http://192.168.1.239:8000/deleteItem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem),
    })
    .then((response) => response.text())
    .then((data) => {
      setLoading(false);
      modal.current?.dismiss();
      loadAllItems();
    })
    .catch((error) => {
      setLoading(false);
      console.error("Error saving item:", error);
    });
  }
  const doSave = () => {
    setLoading(true);
    const id = inputId;
    const date = inputDate;
    const accountId = inputAccount;
    const place = inputPlace;
    const city = inputCity;
    const categoryId = inputCategory;
    const number = inputNumber;
    const comment = inputComment;

    if (!date || !accountId || !place || !city || !categoryId || !number) {
      console.log("All fields are required!");
      return;
    }

    const newItem = {
      id,
      date,
      accountId,
      place,
      city,
      categoryId,
      number,
      comment,
    };

    fetch('http://192.168.1.239:8000/newItem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem),
    })
    .then((response) => response.text())
    .then((data) => {
      setLoading(false);
      cardModal.current?.dismiss();
      loadAllItems();
    })
    .catch((error) => {
      setLoading(false);
      console.error("Error saving item:", error);
    });
  };
  const resetFields = () => {
    setInputId(null);
    setInputDate('');
    setInputAccount('');
    setInputPlace('');
    setInputCity('');
    setInputCategory('');
    setInputNumber(null);
    setInputComment('');
  };
  useEffect(() => {
    if (selectedItem) {
      setInputId(selectedItem.id || null);
      setInputDate(selectedItem.actualDate || '');
      setInputAccount(selectedItem.account?.id || '');
      setInputPlace(selectedItem.place || '');
      setInputCity(selectedItem.city || '');
      setInputCategory(selectedItem.category?.id || '');
      setInputNumber(selectedItem.charging > 0 ? selectedItem.charging : selectedItem.crediting);
      setInputComment(selectedItem.comment || '');
    }
  }, [selectedItem]);
  const doCloseModal = () => {
    modal.current?.dismiss();
    resetFields();
  }
  const doCloseCardModal = () => {
    cardModal.current?.dismiss();
    resetFields();
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={'primary'}>
          <IonButtons slot='start'>
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Actual items</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {items.map((item, index) => ( 
            <IonCard key={index} onClick={() => setSelectedItem(item)}>
                <IonCardContent>
                    <IonItem lines='none'>
                        <IonChip slot='start' color={'tertiary'}>
                            {item.account.id}
                        </IonChip>
                        <IonLabel>
                            <IonText>
                              <h3 className="custom-title">{item.place}</h3>
                              <p>{item.category.name}</p>
                              <p>{item.actualDate}</p>
                            </IonText>
                        </IonLabel>
                        <IonLabel slot='end'>
                            {item.crediting > 0.00 ? item.crediting : item.charging}
                        </IonLabel>
                    </IonItem>
                </IonCardContent>
            </IonCard>
        ))}
        <IonModal 
          ref={modal} 
          isOpen={Boolean(selectedItem)}
          onIonModalDidDismiss={() => setSelectedItem(null)}
        >
          <IonHeader>
            <IonToolbar color={'success'}>
              <IonButtons slot='start'>
                <IonButton onClick={() => doCloseModal()}>Close</IonButton>
              </IonButtons>
              <IonTitle>Setting item</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className='ion-padding'>
            <IonItem className='ion-padding-bottom'>
              <IonInput color={'success'} value={inputDate} onIonChange={(e) => setInputDate(e.detail.value!)} labelPlacement="stacked" label="Enter date of item" placeholder="Date of item" type='date' />
            </IonItem>
            <IonItem className='ion-padding-bottom'>
              <IonSelect className="custom-select" value={inputAccount} onIonChange={(e) => setInputAccount(e.detail.value!)} color={'success'} labelPlacement="stacked" label="Enter account of item" placeholder="Account of item">
                {accounts.map((account, index) => (
                  <IonSelectOption key={index} value={account.id}>
                    {account.name}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
            <IonItem className='ion-padding-bottom'>
              <IonInput color={'success'} value={inputPlace} onIonChange={(e) => setInputPlace(e.detail.value!)} labelPlacement="stacked" label="Enter name of place" placeholder="Place of itme" />
            </IonItem>
            <IonItem className='ion-padding-bottom'>
              <IonInput color={'success'} value={inputCity} onIonChange={(e) => setInputCity(e.detail.value!)} labelPlacement="stacked" label="Enter name of city" placeholder="City of item" />
            </IonItem>
            <IonItem className='ion-padding-bottom'>
              <IonSelect value={inputCategory} onIonChange={(e) => setInputCategory(e.detail.value!)} color={'success'} labelPlacement="stacked" label="Enter your category" placeholder="Category of item">
                {categories.map((category, index) => (
                  <IonSelectOption key={index} value={category.id}>
                    {category.name}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
            <IonItem className='ion-padding-bottom'>
              <IonInput color={'success'} value={inputNumber !== null ? inputNumber.toString() : ''} onIonChange={(e) => setInputNumber(e.detail.value ? Number(e.detail.value) : null)} labelPlacement="stacked" label="Enter number of item" placeholder="Number of item" type='number' />
            </IonItem>
            <IonItem className='ion-padding-bottom'>
              <IonInput color={'success'} value={inputComment} onIonChange={(e) => setInputComment(e.detail.value!)} labelPlacement="stacked" label="Enter comment of item" placeholder="Comment of item" />
            </IonItem>
              <IonButton className='ion-padding-bottom' expand="block" color="primary" onClick={doSetting}>Setting</IonButton>
              <IonButton expand="block" color="danger" onClick={() => setShowAlert(true)}>Delete</IonButton>
          </IonContent>
        </IonModal>
        <IonModal ref={cardModal} trigger='card-modal' onDidDismiss={resetFields}>
          <IonHeader>
            <IonToolbar color={'success'}>
              <IonButtons slot='start'>
                <IonButton onClick={() => doCloseCardModal()}>Close</IonButton>
              </IonButtons>
              <IonTitle>Add new item</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className='ion-padding'>
            <IonItem className='ion-padding-bottom'>
              <IonInput color={'success'} value={inputDate} onIonChange={(e) => setInputDate(e.detail.value!)} labelPlacement="stacked" label="Enter date of item" placeholder="Date of item" type='date' />
            </IonItem>
            <IonItem className='ion-padding-bottom'>
              <IonSelect className="custom-select" value={inputAccount} onIonChange={(e) => setInputAccount(e.detail.value!)} color={'success'} labelPlacement="stacked" label="Enter account of item" placeholder="Account of item">
                {accounts.map((account, index) => (
                  <IonSelectOption key={index} value={account.id}>
                    {account.name}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
            <IonItem className='ion-padding-bottom'>
              <IonInput color={'success'} value={inputPlace} onIonChange={(e) => setInputPlace(e.detail.value!)} labelPlacement="stacked" label="Enter name of place" placeholder="Place of itme" />
            </IonItem>
            <IonItem className='ion-padding-bottom'>
              <IonInput color={'success'} value={inputCity} onIonChange={(e) => setInputCity(e.detail.value!)} labelPlacement="stacked" label="Enter name of city" placeholder="City of item" />
            </IonItem>
            <IonItem className='ion-padding-bottom'>
              <IonSelect value={inputCategory} onIonChange={(e) => setInputCategory(e.detail.value!)} color={'success'} labelPlacement="stacked" label="Enter your category" placeholder="Category of item">
                {categories.map((category, index) => (
                  <IonSelectOption key={index} value={category.id}>
                    {category.name}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
            <IonItem className='ion-padding-bottom'>
              <IonInput color={'success'} value={inputNumber !== null ? inputNumber.toString() : ''} onIonChange={(e) => setInputNumber(e.detail.value ? Number(e.detail.value) : null)} labelPlacement="stacked" label="Enter number of item" placeholder="Number of item" type='number' />
            </IonItem>
            <IonItem className='ion-padding-bottom'>
              <IonInput color={'success'} value={inputComment} onIonChange={(e) => setInputComment(e.detail.value!)} labelPlacement="stacked" label="Enter comment of item" placeholder="Comment of item" />
            </IonItem>
            <IonButton expand="block" color="primary" onClick={doSave}>
              Save
            </IonButton>
          </IonContent>
        </IonModal>
        <IonAlert
        header="Do you want to delete this item?"
        isOpen={showAlert}
        buttons={[
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Alert canceled');
            },
          },
          {
            text: 'OK',
            role: 'confirm',
            handler: () => {
              doDelete();
            },
          },
        ]}
        onDidDismiss={() => setShowAlert(false)}
      >
      </IonAlert>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton id='card-modal'> 
            <IonIcon icon={addOutline} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Item;