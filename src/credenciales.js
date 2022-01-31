// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC73gGfI9znpg2JJKtlthYLr3zMW4SKfjE",
  authDomain: "tutorial-09-sdk-360c1.firebaseapp.com",
  projectId: "tutorial-09-sdk-360c1",
  storageBucket: "tutorial-09-sdk-360c1.appspot.com",
  messagingSenderId: "712097529390",
  appId: "1:712097529390:web:63a95bf923005d86a129bf"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
