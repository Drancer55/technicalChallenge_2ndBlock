//Login Check aparecer y desaparecer los enlaces de LogIn
//const loggedOutLinks = document.querySelectorAll('.logged-out')
const loggedInLinks = document.querySelectorAll('.logged-in')
const loginCheck = user => {
    if (user) {
        loggedInLinks.forEach(link => link.style.display = 'block');
        //loggedOutLinks.forEach(link => link.style.display = 'none');
    } else { 
        loggedInLinks.forEach(link => link.style.display = 'none');
        // loggedOutLinks.forEach(link => link.style.display = 'block');
    }
};
//SignUp
const signupForm = document.querySelector('#signUp-form');
const myModal = document.querySelector('#signUpModal');

signupForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.querySelector('#signUp-email').value;
    const password = document.querySelector('#signUp-password').value;
    auth
        .createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
    //clear the form
    signupForm.reset();
    //close the modal
    //myModal.hide();
    //aviso de registro exitoso
    alert('Registro exitoso, bienvenido');
    });
});

//SignIn
const signinForm = document.querySelector('#logIn-Form');
signinForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.querySelector('#logIn-email').value;
    const password = document.querySelector('#logIn-password').value;
    //console.log(email, password);
    auth
        .signInWithEmailAndPassword(email, password)
  .then(userCredential => {
    //clear the form
    signinForm.reset();
    //aviso de registro exitoso
    alert('Bienvenido');
    });
});

//LogIn with Google
const googleButton = document.querySelector('#googleLogIn')
googleButton.addEventListener('click', e => {
    console.log('click Google');
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
    .then(result => {
        console.log(('google signIn'));
    })
    .catch(err => {
        console.log(err);
    })
});

// LogIn with Facebook
const facebookButton = document.querySelector('#facebookLogIn')
facebookButton.addEventListener('click', e => {
    e.preventDefault(); 
    console.log('Facebook logIn');
    const provider = new firebase.auth.FacebookAuthProvider();
    auth.signInWithPopup(provider)
    .then(result => {
        console.log(result);
        console.log('Facebook SignIn');
    })
    .catch(err => {
        console.log(err);
    })
});

//LogOut
const logout = document.querySelector('#logOut')
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
        console.log('signOut')
    })
});

// //Post, ejemplos de elementos que se pueden monstrar despues de ser logueado
// const postList = document.querySelector('.post');
// const setupPosts = data => { //data desde firestore
//     if (data.lenght) { //si contiene datos se itera
//         let html = ``; //preparando para imprimir en html
//         data.forEach(doc => {  //iteración para traer datos de Firestore
            // const post = doc.data()
            // console.log(post);
//             //se itera para agregar elementos al HTML / class para acciones del contenido
//             const li = `
//             <li class="list-group-item list-group-item-action">
//                 <h5>${post.title}</h5>
//                 <p>${post.description}</p>
//             </li>`;
//             html += li;
//         })
//         postList.innerHTML = html; //impresión final
//     } else{ //a menos que no tenga datos pasa lo siguiente...
//         postList.innerHTML = `<p class="text-center" >Ingresa para ver publicaciones</p>`
//     }
// }

//Iterar datos de JSON para el formulario
import {registroProposito} from "./data.js"
registroProposito();

//Autentificado
auth.onAuthStateChanged(user => {
    if (user) {
        console.log('Auth: signin');
        loginCheck(user); //Aparece la opción de salir al estar iniciado
        document.getElementById('pantalla2').hidden = false;
        document.getElementById('pantalla1').hidden = true;
    } else {
        console.log('Auth: signout');
        loginCheck(user); //Desaparece la opción de salir si está afuera
        document.getElementById('pantalla2').hidden = true;
        document.getElementById('pantalla1').hidden = false;
    }
})

//Conexión con Firestore(base de datos)
const db = firebase.firestore();
console.log('database: ', db);
//Determinando datos que se suben a la nube
const taskForm = document.getElementById('task-form');
const taskContainer = document.getElementById('task-container');

let editStatus = false;
let id = '';
const guardarProposito = (tema, titulo, descripcion, mes) => 
    db.collection('propositoNuevo').doc().set({
        tema,
        titulo,
        descripcion,
        mes
    });

//Extrayendo datos de la nube
const getData = () => db.collection('propositoNuevo').get();
    console.log('collection: ', getData());
const editGetData = (id) => db.collection('propositoNuevo').doc(id).get();

const onGetData = (callback) => db.collection('propositoNuevo').onSnapshot(callback)

const deleteData = id => db.collection('propositoNuevo').doc(id).delete();

const upDate = (id, upDateTask) => db.collection('propositoNuevo').doc(id).upDate(upDate);

//Al haber cargado el objeto window se trae los datos desde Firebase
window.addEventListener('DOMContentLoaded', async (e) => {
    console.log(e);
//Se preparan las cards con los datos
    onGetData((querySnapshot) => {
        taskContainer.innerHTML = '';
        querySnapshot.forEach(doc => {
            console.log(doc.data());
//Constante propósito para traerse cada tarjeta creada
            const proposito = doc.data();
            proposito.id = doc.id;
            console.log(proposito);
//Se pintan las cards con los datos
            taskContainer.innerHTML += `
            <div class="card card-body mt-2 border-primary">
                <h3>${proposito.tema}</h3>
                <h4>${proposito.titulo}</h4>
                <p>${proposito.descripcion}</p><br>
                <br>Objetivo para: ${proposito.mes}<br>
                <div>
                    <button class="btn btn-primary btn-delete" data-id="${proposito.id}">Borrar</button>
                    <button class="btn btn-primary btn-edit" data-id="${proposito.id}">Editar</button>
                </div>
                </div>`
//Creación de los botones de borrar y editar desde el UI
                const btnDelete = document.querySelectorAll('.btn-delete')
                //log(btnDelete)
                btnDelete.forEach(btn => {
                    btn.addEventListener('click', async (e) => {
                        console.log('clickeado');
                        console.log(e.target.dataset.id);
                        await deleteData(e.target.dataset.id)
                    })
                })
                const btnEdit = document.querySelectorAll('.btn-edit')
                btnEdit.forEach(btn => {
                    console.log('editando');
                    console.log(e.target.dataset.id);
                    btn.addEventListener('click', async (e) => {
                        const doc = await editGetData(e.target.dataset.id);
                        console.log(doc.data);
                        const task = doc.data();

                        editStatus = true; 
                        id = doc.id;

                        taskForm['tema'].value = task.tema;
                        taskForm['title'].value = task.title;
                        taskForm['description'].value = task.description;
                        taskForm['mes'].value = task.mount;
                        taskForm['btn-task-form'].innerText = 'Actualizar';
                    })
                })
            });
        })
    });

taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const tema = taskForm['tema'];
    const titulo = taskForm['title'];
    const descripcion = taskForm['description'];
    const mes = taskForm['mes'];

    if (!editStatus) {
        await guardarProposito(tema.value, titulo.value, descripcion.value, mes.value)
    } else {
        await upDate(id, {
            tema: tema.value,
            titulo: title.value,
            descripcion: descripcion.value,
            mes: mes.value
        })
        editStatus = false;
        id = '';
        taskForm['btn-task-form'].innerText = 'Guardar';

    }

    await getData();
    taskForm.reset();
    tema.focus();
    //console.log(tema, titulo, descripcion, mes);
    // console.log("click en submit");
});

