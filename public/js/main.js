
function showAlert() {
    Swal.fire({
        title: 'Seguro quieres cerrar sesion?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Cerrar sesion',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
            window.location = "auth/logout";
        }
      })
}

//Intento de transicion de login


id="form_signUp"
id="form_signIn"

const signUp = document.getElementById('form_signUp');
const signIn = document.getElementById('form_signIn');
const btnRegistrar = document.getElementById('btnRegistrar');
const btnLogin = document.getElementById('btnLogin');

btnRegistrar.addEventListener('click', e => {
    e.preventDefault();
    signUp.classList.remove('d-none');
    signIn.classList.add('d-none');
    signUp.classList.add('d-block');
});

btnLogin.addEventListener('click', e => {
    e.preventDefault();
    signIn.classList.remove('d-none');
    signUp.classList.add('d-none');
    signIn.classList.add('d-block');
});