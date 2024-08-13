import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB26hEuEZJ_D1jelpLbIjtrLBLeIGgGpfE",
  authDomain: "prine-naif-chair.firebaseapp.com",
  projectId: "prine-naif-chair",
  storageBucket: "prine-naif-chair.appspot.com",
  messagingSenderId: "283592202186",
  appId: "1:283592202186:web:452c290da89a0008632133",
  measurementId: "G-Q62EGNKWG7",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }
