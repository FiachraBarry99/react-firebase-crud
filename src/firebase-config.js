import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: "544203639385",
    appId: "1:544203639385:web:cf8eb36d1ddda6009dff48",
    measurementId: "G-W32JENWTFZ"
  };


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
