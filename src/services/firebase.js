import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCmM4w7PJmsw57sBlOPeic7oGGSnnyEhDM",
    authDomain: "social-shadow.firebaseapp.com",
    projectId: "social-shadow",
    storageBucket: "social-shadow.appspot.com",
    messagingSenderId: "825309680901",
    appId: "1:825309680901:web:b8cfa10998307a63bc936c"
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

