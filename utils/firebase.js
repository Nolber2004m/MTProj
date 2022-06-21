import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAU2NVDFstRBuMOa3bwGozewwxA-F5SLzw",
    authDomain: "mtproject-e5917.firebaseapp.com",
    projectId: "mtproject-e5917",
    storageBucket: "mtproject-e5917.appspot.com",
    messagingSenderId: "499185308283",
    appId: "1:499185308283:web:5ec6fb3dac9e32eabf48de"
  };
    
export const firebaseapp1 = firebase.initializeApp(firebaseConfig)

export const firebaseApp = firebase.initializeApp(firebaseConfig)