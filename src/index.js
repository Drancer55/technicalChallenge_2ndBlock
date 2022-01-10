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
}
//SignUp
const signupForm = document.querySelector('#signUp-form')
const myModal = document.querySelector('#signUpModal')

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.querySelector('#signUp-email').value;
    const password = document.querySelector('#signUp-password').value;
    auth
        .createUserWithEmailAndPassword(email, password)
  .then(userCredential => {
    //clear the form
    signupForm.reset();
    //close the modal
    myModal.hide();
    //aviso de registro exitoso
    alert('Registro exitoso');
    
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
})

//LogOut
const logout = document.querySelector('#logOut')
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
        console.log('signOut')
    })
})

// //Post, ejemplos de elementos que se pueden monstrar despues de ser logueado
// const postList = document.querySelector('post');
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


//Autentificado
auth.onAuthStateChanged(user => {
    if (user) {
        console.log('Auth: signin');
        loginCheck(user); //Aparece la opción de salir al estar iniciado
    } else {
        console.log('Auth: signout');
        loginCheck(user); //Desaparece la opción de salir si está afuera
    }
})
