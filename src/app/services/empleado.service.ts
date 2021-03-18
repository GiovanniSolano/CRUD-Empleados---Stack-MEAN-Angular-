import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Respuesta, Empleado } from '../models/empleado';


const url = environment.URL_SERVER;


@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  

  constructor(private http: HttpClient) {
   }

  getEmpleados() {

    return this.http.get<Respuesta>(`${url}`);

   }

   agregarEmpleado(empleado: Empleado){

    return this.http.post<Respuesta>(`${url}`, empleado);

   }
  eliminarEmpleado(uid: string) {

    return this.http.delete<Respuesta>(`${url}/${uid}`);


   }

   getEmpleado(uid: string) {

    return this.http.get(`${url}/${uid}`);

   }

   editarEmpleado(uid: string, empleado: Empleado) {

    return this.http.put(`${url}/${uid}`, empleado);

   }

}
