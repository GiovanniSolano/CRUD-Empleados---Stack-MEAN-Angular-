import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2'


@Injectable({
  providedIn: 'root'
})
export class Sweetalert2Service {

  constructor() { }


  mostrarMensaje(titulo: string, icono: SweetAlertIcon) {

    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: icono,
      title: titulo
    })

  }

  mensajeConfirmacion(empleado: string): Promise<boolean> {

    return new Promise((resolve, reject) => {
      Swal.fire({
        title: `Estás seguro de borrar a ${empleado}`,
        text: "Los cambios son irreversibles!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, borrarlo!'
      }).then((result) => {
        if (result.isConfirmed) {
          resolve(true);
        } else {
          resolve(false);

        }
      })
    });  




  }

}
