import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataMonth } from '../Modelo/DataMonth';
import { Presupuesto } from '../Modelo/Presupuesto';

@Injectable({
  providedIn: 'root'
})
export class PresupuestoService {

  url = 'http://localhost:8080/Presupuesto/';

  constructor(private httpClient: HttpClient) { }

   //Listar Todas las cajas
  public Get_Data_Month(): Observable<DataMonth[]> {
    return this.httpClient.get<DataMonth[]>(this.url + 'DataMonth');
  }

  //Guardar presupuesto
  public addPresupuesto(presupuesto: Presupuesto): Observable<Object> {
    return this.httpClient.post(this.url + 'AddPresupuestoMensual', presupuesto);
  }

  //Agregar presupuesto
  public addMorePresupuesto(presupuesto: Presupuesto): Observable<Object> {
    return this.httpClient.put(this.url + 'AddMorePresupuesto', presupuesto);
  }

  //Obtener datos de un mes
  public FindMonth(mes:string): Observable<Presupuesto[]> {
    return this.httpClient.get<Presupuesto[]>(this.url + 'FindMonth?mes=' + mes);
  }
}
