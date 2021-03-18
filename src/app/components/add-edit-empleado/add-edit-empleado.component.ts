import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleadoService } from '../../services/empleado.service';
import { Empleado } from '../../models/empleado';

@Component({
  selector: 'app-add-edit-empleado',
  templateUrl: './add-edit-empleado.component.html',
  styleUrls: ['./add-edit-empleado.component.css'],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'primary' },
}]
})
export class AddEditEmpleadoComponent implements OnInit {

  estadosCiviles: any[] = ['Soltero', 'Casado', 'Divorciado', 'Viudo'];
  myForm: FormGroup;
  idEmpleado: string;
  accion = 'Agregar';

  constructor(private fb: FormBuilder,
              private _empleadoService: EmpleadoService,
              private router: Router,
              private snackBar: MatSnackBar,
              private aRoute: ActivatedRoute) { 

    this.myForm = this.fb.group({
      nombreCompleto: ['', [Validators.required, Validators.minLength(3)]],
      correo: ['', [Validators.required, Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)]],
      fechaIngreso: ['', Validators.required],
      telefono: ['' , [Validators.required, Validators.pattern(/^((\\+91-?)|0)?[0-9]{10}$/)]],
      estadoCivil: ['', Validators.required],
      sexo: ['', Validators.required]
    });


    this.idEmpleado = this.aRoute.snapshot.params['id'];

  }

  ngOnInit(): void {

    if(this.idEmpleado !== undefined) {
      this.accion = 'Editar';
      this.esEditar();
    }
    
  }

  agregarEmpleado() {

    if(this.myForm.invalid) {

      Object.values(this.myForm.controls).forEach(form => {
  
        form.markAsTouched();
  
      });

      this.snackBar.open('Ingrese todos los campos correctamente!',  '', 
            {
              duration: 3000
            });
        
      return;
    }

    if(this.idEmpleado !== undefined) {

      this._empleadoService.editarEmpleado(this.idEmpleado, this.myForm.value)
        .subscribe(empleadoBD => {

          this.router.navigate(['/']);
            
          this.snackBar.open('Empleado editado correctamente!',  '', 
              {
                duration: 3000
              });
          
          

        }, (error) => {
          

          this.snackBar.open(`${error.error.msg}`,  '', 
              {
                duration: 3000
              });

        });

    } else {


      this._empleadoService.agregarEmpleado(this.myForm.value)
        .subscribe(empleadoBD => {
          this.myForm.reset();
          this.router.navigate(['/']);
  
          this.snackBar.open('Empleado agregado correctamente!',  '', 
              {
                duration: 3000
              });
          
  
        }, (error) => {

          let msg = error.error.msg;
          if(!error.ok) {


            msg = 'Error en el servidor, hable con el administrador';

          }
          
  
          this.snackBar.open(`${msg}`,  '', 
              {
                duration: 3000
              });
          
          
  
        });

    }



      

  }

  esEditar() {


    this._empleadoService.getEmpleado(this.idEmpleado)
      .subscribe(empleadoBD => {        
        const empleado: Empleado = empleadoBD['empleado'];

        this.myForm.patchValue({
          nombreCompleto: empleado.nombreCompleto,
          correo: empleado.correo,
          fechaIngreso: empleado.fechaIngreso,
          telefono: empleado.telefono,
          estadoCivil: empleado.estadoCivil,
          sexo: empleado.sexo,
        });
        

      }, (error) => {

        let msg = error.error.msg;
        if(msg === undefined) {

          msg = error.error.errores.id.msg;

        }
        

        this.router.navigate(['/']);

        this.snackBar.open(`${msg}`,  '', 
              {
                duration: 3000
              });


      });

  }


  get nombreRequerido(): boolean {
    return this.myForm.get('nombreCompleto').hasError('required') && this.myForm.get('nombreCompleto').touched;
  }
  get nombreValido(): boolean {
    return this.myForm.get('nombreCompleto').hasError('minlength') && this.myForm.get('nombreCompleto').touched;
  }
  get correoRequerido(): boolean {
    return this.myForm.get('correo').hasError('required') && this.myForm.get('correo').touched;
  }
  get correoValido(): boolean {
    return this.myForm.get('correo').hasError('pattern') && this.myForm.get('correo').touched;
  }
  get fechaRequerida(): boolean {
    return this.myForm.get('fechaIngreso').hasError('required') && this.myForm.get('fechaIngreso').touched;
  }
  get telefonoRequerido(): boolean {
    return this.myForm.get('telefono').hasError('required') && this.myForm.get('telefono').touched;
  }
  get telefonoValido(): boolean {
    return this.myForm.get('telefono').hasError('pattern') && this.myForm.get('telefono').touched;
  }
  get estadoCRequerido(): boolean {
    return this.myForm.get('estadoCivil').hasError('required') && this.myForm.get('estadoCivil').touched;
  }
  get sexoRequerido(): boolean {
    return this.myForm.get('sexo').hasError('required') && this.myForm.get('sexo').touched;
  }

}
