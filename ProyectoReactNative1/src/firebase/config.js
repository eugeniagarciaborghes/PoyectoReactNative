import app from 'firebase/app'
import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyBh5XzVVnaCICuBGLxTw7PTUOd9W9HI7O4",
  authDomain: "proyectoreactnative-29866.firebaseapp.com",
  projectId: "proyectoreactnative-29866",
  storageBucket: "proyectoreactnative-29866.appspot.com",
  messagingSenderId: "762526211596",
  appId: "1:762526211596:web:dc20b92d54fd7ed5dbd829"
};

app.initializeApp(firebaseConfig)

export const auth = firebase.auth();
export const storage= app.storage();
export const db = app.firestore();