// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCbrIHWLQWpgcLpwcjnuY1GyDqb97oeLSg",
    authDomain: "video-dbdc2.firebaseapp.com",
    projectId: "video-dbdc2",
    storageBucket: "video-dbdc2.appspot.com",
    messagingSenderId: "787956078257",
    appId: "1:787956078257:web:7c429f1ae5bf84adc9b490"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;