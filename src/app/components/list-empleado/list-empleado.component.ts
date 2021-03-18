



import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator, MatPaginatorIntl} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadoService } from '../../services/empleado.service';
import { Respuesta } from '../../models/empleado';
import { Sweetalert2Service } from '../../services/sweetalert2.service';
import { MatDialog } from '@angular/material/dialog';
import { MensajeConfirmacionComponent } from '../../shared/mensaje-confirmacion/mensaje-confirmacion.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-list-empleado',
  templateUrl: './list-empleado.component.html',
  styleUrls: ['./list-empleado.component.css'],

})
export class ListEmpleadoComponent implements OnInit {

  listEmpleados: Empleado[];

  displayedColumns: string[] = ['nombreCompleto', 'correo', 'telefono', 'estadoCivil', 'fechaIngreso', 'sexo', 'acciones'];
  
  dataSource: MatTableDataSource<Empleado>;

  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  
  
  constructor(private _empleadosService: EmpleadoService,
    private _sweetAlert2Service: Sweetalert2Service,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private paginator_: MatPaginatorIntl) { 
    
    this.listEmpleados = [];
    this.dataSource = new MatTableDataSource<Empleado>();
    
    this.cargarEmpleados();
    this.paginator_.itemsPerPageLabel = 'Empleados por página';

  }
  
  ngOnInit(): void {
  }
  
  cargarEmpleados() {
    
    this._empleadosService.getEmpleados().subscribe((resp: Respuesta) => {
      this.listEmpleados = resp.empleados;
      this.dataSource.data = this.listEmpleados;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;              
    });

  }


  eliminarEmpleado(empleado: Empleado) {

    const dialogRef = this.dialog.open(MensajeConfirmacionComponent, {
      width: '350px',
      data: {mensaje: `Estás seguro de eliminar a ${empleado.nombreCompleto}?`}
    });

    dialogRef.afterClosed().subscribe(result => {

      if(result === 'aceptar') {
        this._empleadosService.eliminarEmpleado(empleado.uid)
          .subscribe(resp => {
  
            this.cargarEmpleados();
            this.snackBar.open('El empleado fue eliminado exitosamente',  '', 
            {
              duration: 3000
            });
  
          });

      }



    });



    // * ELIMINACIÓN de empleado haciendo uso de SweetAlert2 *

    // const resp = await this._sweetAlert2Service.mensajeConfirmacion(empleado.nombreCompleto);

    // if(resp) {
    //   this._empleadosService.eiminarEmpleado(empleado.uid)
    //     .subscribe(empleadoEliminado => {
  
    //       this._sweetAlert2Service.mostrarMensaje('Empleado eliminado', 'success');
    //       this.cargarEmpleados();
  
  
    //     });

    // } else {

    //   return;

    // }

    
    
  }

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;    
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}

