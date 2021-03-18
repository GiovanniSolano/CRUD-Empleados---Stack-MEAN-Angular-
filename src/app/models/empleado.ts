export interface Respuesta {
    ok: boolean;
    empleados: Empleado[];
  }
  
export interface Empleado {
    uid: string;
    nombreCompleto: string;
    correo: string;
    estadoCivil: string;
    fechaIngreso: string;
    sexo: string;
    telefono: string;
  }