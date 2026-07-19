import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCp4X0LioPUHswO9CBX2ck1tiWf1PFI3-I",
  authDomain: "sirrivtech.firebaseapp.com",
  projectId: "sirrivtech",
  storageBucket: "sirrivtech.firebasestorage.app",
  messagingSenderId: "319341764675",
  appId: "1:319341764675:web:2d2d6844006917f113f4f6",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);