//import {async} from 'firebase/util';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword
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

  const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
  
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

  export const createUserDocumentFromAuth = async(
    userAuth,
    additionalInformation={}
     ) => {
    if(!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);

   // console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    //console.log(userSnapshot);
    //console.log(userSnapshot.exists());

  
    if (!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
  
      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
          ...additionalInformation,
        });
      } catch (error) {
        console.log('error creating the user', error.message);
      }
    }
  
    return userDocRef;
  };

  //below is  part of 98 video
  export const  createAuthUserWithEmailAndPassword= async (email,password) =>{

     if(!email || !password)return;

   return await createUserWithEmailAndPassword(auth,email,password)


  }