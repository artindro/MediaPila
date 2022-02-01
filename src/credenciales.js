// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmM2mB3up-ImDIZUVJTqqCOjK3k7u6O-Q",
  authDomain: "mp-proyecto.firebaseapp.com",
  projectId: "mp-proyecto",
  storageBucket: "mp-proyecto.appspot.com",
  messagingSenderId: "722409599666",
  appId: "1:722409599666:web:3d4b887ea3c7144fcd4fab"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
