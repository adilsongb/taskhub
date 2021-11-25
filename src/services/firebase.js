import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAe9W6S76vYnrKjR5sZ1KyPQFkEbRGCAuE",
  authDomain: "taskhub-organization.firebaseapp.com",
  projectId: "taskhub-organization",
  storageBucket: "taskhub-organization.appspot.com",
  messagingSenderId: "553972580673",
  appId: "1:553972580673:web:7161561e187bc0db3721c0",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const dataBase = getFirestore();
export const provider = new GoogleAuthProvider();
