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