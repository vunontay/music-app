import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { FacebookAuthProvider } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
const firebaseConfig = {
    apiKey: 'AIzaSyCwyfCPbKrmTQ54any8duvgVAKsEesxqt4',
    authDomain: 'music-app-91669.firebaseapp.com',
    projectId: 'music-app-91669',
    storageBucket: 'music-app-91669.appspot.com',
    messagingSenderId: '746556483550',
    appId: '1:746556483550:web:ff8fd7dc6a7e07cefe9f4f',
    measurementId: 'G-RECX8W78R0',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new FacebookAuthProvider();

const providerGoogle = new GoogleAuthProvider();
export { auth, provider, providerGoogle };
