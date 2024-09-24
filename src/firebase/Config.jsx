import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDHmibgqLOcefRCm8eL1et2ft8MzWXffl8",
  authDomain: "olx-clone-3ba96.firebaseapp.com",
  projectId: "olx-clone-3ba96",
  storageBucket: "olx-clone-3ba96.appspot.com",
  messagingSenderId: "554910559684",
  appId: "1:554910559684:web:2be7138c4839b11a980891",
  measurementId: "G-QPR9RBTY8B"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);
