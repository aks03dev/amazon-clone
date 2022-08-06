// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyC8Y4Za1aJ3wMWaPc2vygQjExZ7iaARV1E",
  authDomain: "e-commerce-efa0c.firebaseapp.com",
  projectId: "e-commerce-efa0c",
  storageBucket: "e-commerce-efa0c.appspot.com",
  messagingSenderId: "846605508418",
  appId: "1:846605508418:web:68a9e817a3fb695e40f2db",
  measurementId: "G-RJ8Z8K3DEP",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
export default db;
