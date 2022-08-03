// Importamos la función para inicializar la aplicación de Firebase
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Añade aquí tus credenciales
const firebaseConfig = {
  apiKey: "AIzaSyAU2NVDFstRBuMOa3bwGozewwxA-F5SLzw",
  authDomain: "mtproject-e5917.firebaseapp.com",
  projectId: "mtproject-e5917",
  storageBucket: "mtproject-e5917.appspot.com",
  messagingSenderId: "499185308283",
  appId: "1:499185308283:web:5ec6fb3dac9e32eabf48de"
};

// Inicializamos la aplicación y la guardamos en firebaseApp
const firebaseApp = initializeApp(firebaseConfig);
// Exportamos firebaseApp para poder utilizarla en cualquier lugar de la aplicación
export default firebaseApp;

export const storage = getStorage(firebaseApp);

// Si descomentas la siguiente línea, cuando mientras que el usuario no se desloguee expresamente o cierre el navegador, permanecerá logueado y podremos acceder a su id desde cualquier página
//setPersistence(auth, browserLocalPersistence);






