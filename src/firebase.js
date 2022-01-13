// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, onSnapshot, doc, getDoc, updateDoc} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyCIkUHpAH0q4-8EUEFzo4xSBa2SYza-9go",
authDomain: "fb-fillfull.firebaseapp.com",
projectId: "fb-fillfull",
storageBucket: "fb-fillfull.appspot.com",
messagingSenderId: "476859873440",
appId: "1:476859873440:web:94481261d81152b2c9b1c5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//Base de datos
const db = getFirestore();
//Datos obtenidos del formulario
export const saveTask = (tema, titulo, descripcion, mes) => { 
//Se incluye en '' el nombre de la colección de FireBase y su contenido
    addDoc(collection(db, 'PropositoNuevo'), {tema, titulo, descripcion, mes})
    console.log(tema, titulo, descripcion, mes);
}
//Obtención de los datos desde Firebase
export const getTasks = () => 
    //console.log('obtener propositos');
    getDocs(collection(db, 'PropositoNuevo'))
//Se actualiza cada que se sube un dato nuevo
export const onGetFullfill = (callback) => onSnapshot(collection(db, 'PropositoNuevo'), callback)
//Borra el popósito descrito desde la UI
export const deleteProposito = (id) => deleteDoc(doc(db, 'PropositoNuevo', id));
//Para buscar tareas
export const getTask = (id) => getDoc(doc(db, 'PropositoNuevo', id))
//Acualizar los datos
export const upDateBase = (id, newFields) => updateDoc(doc(db, 'PropositoNuevo', id), newFields)