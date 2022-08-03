import firebaseApp, { storage } from './firebase'
import {getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    updateEmail,
    updatePassword } from 'firebase/auth'

import {getFirestore,doc,setDoc,collection,addDoc, getDoc, query, where, getDocs } from 'firebase/firestore'

import {
    ref,
    uploadBytes,
    getDownloadURL,
    listAll,
    list,
    getStorage,
    connectStorageEmulator
  } from "firebase/storage";

  import { DB } from "firebase/database"

  const db1 = getFirestore(firebaseApp);


import React, { useState } from 'react'
import { fileToBlob } from './helpers'
import { map } from 'lodash'
import { Alert } from 'react-native'
import { Platform } from 'react-native'

const auth = getAuth(firebaseApp)
const dbfirestore = getFirestore(firebaseApp);

export const getFacturas = async(collection1) => {
  const result = { statusResponse: true, error: null, facturas: [], startFacturas: null }
  try {      
     
      const q = query(collection(dbfirestore, "facturas"), where("createBy", "==", getCurrentUser().uid)); 
        
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        const factura = doc.data()
        factura.id = doc.id
        result.facturas.push(factura)
      });
     
  } catch (error) {
      result.statusResponse = false
      result.error = error    
  }
  return result     
}


export const getOficinas = async(limitRestaurants) => {
  const result = { statusResponse: true, error: null, oficinas: [], startRestaurant: null }
  try {      
      //const q = query(collection(db, "cities"), where("capital", "==", true));
            
      const q = query(collection(dbfirestore, "oficinas"));
      const querySnapshot = await getDocs(q);


      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        const oficina = doc.data()
        oficina.id = doc.id
        result.oficinas.push(oficina)
      });
     
  } catch (error) {
      result.statusResponse = false
      result.error = error
     
  }
  return result     
}

export const getCurrentUser = () => {

    return auth.currentUser
}

export const closeSession = () => {
    return signOut(auth)
}

export const isUserLogged = () => {
    let isLogged = false
    auth.onAuthStateChanged((user) => {
        user !== null && (isLogged = true)
    })
    return isLogged
}

export const registerUser = async(email, password, roll, idioma) => {
    const result = { statusResponse: true, error: null}
    try {
       const infoUsuario = await createUserWithEmailAndPassword(auth,email, password)

       console.log(infoUsuario.user.uid)

       const dbRef = doc(dbfirestore,`usuarios/${infoUsuario.user.uid}`);

       await setDoc(dbRef, {correo: email, rol: roll, idioma: idioma})
 

    } catch (error) {
        result.statusResponse = false
        result.error = "Este correo ya ha sido registrado."
    }
    return result
}

export const loginWithEmailAndPassword = async(email, password) => {
    const result = { statusResponse: true, error: null}
   
    await signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {   
    const user = userCredential.user;
     })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    result.statusResponse = false
    result.error = "Usuario o contraseña no válidos."
  });
    
    return result
}


export const uploadFile = async (image, path, name) => {

    const storageRef = ref(storage, `${path}/${name}`);
    const blob = await fileToBlob(image)
   // const bytes = new Uint8Array([0x48, 0x65, 0x6c, 0x6c, 0x6f, 0x2c, 0x20, 0x77, 0x6f, 0x72, 0x6c, 0x64, 0x21]);
    uploadBytes(storageRef, blob).then((snapshot) => {

        getDownloadURL(snapshot.ref).then((downloadURL) => {
            
          });
        
    });
  };


//image ruta de la imagen de donde viene
//path donde se guardara en firebase 
//nombre que tendra y el nombre que tomara

export const uploadImage = async(image, path, name) => {    
    const result = { statusResponse: false, error: null, url: null }   
    const storageRef = ref(storage, `${path}/${name}`);   
    const img = await fetch(image);
    const blob = await img.blob();   
    try {            
      const snapshot = await uploadBytes(storageRef, blob);
      const url = await getDownloadURL(snapshot.ref)    
      result.url = url;
      result.statusResponse = true 
    } 
    catch (error) {
           
         result.error = error
    }  

     return result
}



export const updateProfileM = async(displayName) => {
    const result = { statusResponse: true, error: null }


    updateProfile(auth.currentUser, {
      displayName: displayName, photoURL: auth.currentUser.photoURL
    }).then(() => {
      // ...
    }).catch((error) => {
      // ...
      result.statusResponse = false
       result.error = error

    });


    return result     
}

export const updatePasswordM = async(password) => {
  const result = { statusResponse: true, error: null }


  //const user = auth.currentUser;
  const newPassword = password;

  await updatePassword(auth.currentUser, newPassword).then(() => {
   
  }).catch((error) => {
    result.statusResponse = false
    result.error = error
  });

  return result     
}

export const updateProfileF = async(photoUrl1) => {
  const result = { statusResponse: true, error: null }

  const auth = getAuth();
  await updateProfile(auth.currentUser, {
    displayName: auth.currentUser.displayName, photoURL: photoUrl1
  }).then(() => {
    // Profile updated!
    // ...
  }).catch((error) => {
    // An error occurred
    // ...
    result.statusResponse = false
    result.error = error
  });




  return result     
}

export const updateEmailM = async(email) => {
    const result = { statusResponse: true, error: null }

    await updateEmail(auth.currentUser,email).then(() => {
 

      }).catch((error) => {
        
        // ...
        result.statusResponse = false
        result.error = error
      });
    return result     
}





export const addDocumentWithoutId = async(collection1, data) => {
  const result = { statusResponse: true, error: null }

  const dbRef = collection(db1,collection1);

  await addDoc(dbRef, data)
  .then((docRef) => { 
     
  })
  .catch(error => {
      result.statusResponse = false
      result.error = error        
  }) 

    return result    
}




// READ
export const getItems= async (idusuario)  => {
  const result = { statusResponse: true, error: null, oficinas : [], startOficinas: null }



    //const docRef = doc(dbfirestore, `oficinas/${getCurrentUser().idusuario}`);
    const docRef = doc(dbfirestore, "oficinas/");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {

      result.error = false 
      result.oficinas = docSnap.data()
    } else {
      // doc.data() will be undefined in this case
   
    }

    return result
}


export const getDocumentById = async(collection1, id) => {
  const result = { statusResponse: true, error: null, documento : null }

  const docRef = doc(db1, collection1, id);

  const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  result.documento = docSnap.data()
  result.documento.id = docSnap.id

  
} else {
  // doc.data() will be undefined in this case

  result.statusResponse = false
  result.error = "NO existe documento"

}



    return result    
}
