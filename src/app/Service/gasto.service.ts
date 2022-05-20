import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gasto } from '../Modelo/Gasto';

@Injectable({
  providedIn: 'root'
})
export class GastoServiceService {
  url = 'http://localhost:8080/Gastos/';

  constructor(private httpClient: HttpClient) {}

   //Listar Todas las cajas
  public filterByDay(fecha:string): Observable<Gasto[]> {
    return this.httpClient.get<Gasto[]>(this.url + 'FilterDay?fecha=' + fecha);
  }

  //Guardar gasto
  public addGasto(gasto: Gasto): Observable<Object> {
    return this.httpClient.post(this.url + 'AddGasto', gasto);
  }
}
