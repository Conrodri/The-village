// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyDokQgvLrLOkI12IUpD8JGNzvB8RSdFFbw",

  authDomain: "the-village-game.firebaseapp.com",

  projectId: "the-village-game",

  storageBucket: "the-village-game.appspot.com",

  messagingSenderId: "695442709377",

  appId: "1:695442709377:web:278bdab1a92a7a7b8fe680",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
