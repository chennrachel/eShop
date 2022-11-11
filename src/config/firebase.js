// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyCTtur8malN6BCUlPJm5Ps37KGJEpjoB_k',
    authDomain: 'react-firestore-rachel.firebaseapp.com',
    projectId: 'react-firestore-rachel',
    storageBucket: 'react-firestore-rachel.appspot.com',
    messagingSenderId: '320379992863',
    appId: '1:320379992863:web:6a325746798b1ab1824e2a',
    measurementId: 'G-B26NJC60EZ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
