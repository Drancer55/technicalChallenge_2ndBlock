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

//LogOut
const logout = document.querySelector('#logOut')
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
        console.log('signOut')
    })
})

//Autentificado
auth.onAuthStateChanged(user => {
    if (user) {
        console.log('Auth: signin');
    } else {
        console.log('Auth: signout');
    }
})
