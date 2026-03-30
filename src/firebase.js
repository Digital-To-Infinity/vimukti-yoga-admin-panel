import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBNMQm59JMT1LSCANoHsNuP_yPc4AICQqg",
    authDomain: "vimukti-yoga.firebaseapp.com",
    projectId: "vimukti-yoga",
    storageBucket: "vimukti-yoga.firebasestorage.app",
    messagingSenderId: "7925783480",
    appId: "1:7925783480:web:20c501d5540ff909428d4d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);