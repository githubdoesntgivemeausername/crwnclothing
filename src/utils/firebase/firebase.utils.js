import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDr23Ek4gbJ45wKMwy9oIqEqiFHnY183mg",
    authDomain: "crwn-clothing-db-e730b.firebaseapp.com",
    projectId: "crwn-clothing-db-e730b",
    storageBucket: "crwn-clothing-db-e730b.appspot.com",
    messagingSenderId: "153884956086",
    appId: "1:153884956086:web:25b6c1d471c0d3662d5d17"
  };

  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  
  provider.setCustomParameters({
    prompt: 'select_account'
  });
  
  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
  
  export const db = getFirestore();
  
  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    //console.log(userDocRef);
    const userSnapshot = await getDoc(userDocRef);
   // console.log(userSnapshot);
   // console.log(userSnapshot.exists());
  
    if (!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
  
      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
        });
      } catch (error) {
        console.log('error creating the user', error.message);
      }
    }
  
    return userDocRef;
  };