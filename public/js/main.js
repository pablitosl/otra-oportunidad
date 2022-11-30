
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
