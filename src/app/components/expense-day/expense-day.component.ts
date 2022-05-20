import { Component, Input, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Gasto } from 'src/app/Modelo/Gasto';
import { Presupuesto } from 'src/app/Modelo/Presupuesto';
import { GastoServiceService } from 'src/app/Service/gasto.service';
import { PresupuestoService } from 'src/app/Service/presupuesto.service';

@Component({
  selector: 'app-expense-day',
  templateUrl: './expense-day.component.html',
  styleUrls: ['./expense-day.component.scss']
})
export class ExpenseDayComponent implements OnInit {

  ModalAddGasto:boolean = false;

  filterDayIsToday:boolean = true;

  dateFilter:string;

  gastosByDay:Gasto[] = [];

  gastoTotalByDay:number = 0;

  dataMonthActually:Presupuesto[] =[];

  nombre:string = "";
  monto:number = 0.00;
 

  constructor(
    private serviceGasto:GastoServiceService,
    private servicePresupuesto:PresupuestoService,
    private app:AppComponent) { }

  ngOnInit(): void {
    //Dia de hoy
    var f = new Date();
    var mes = ("0" + (f.getMonth() +1)).substr(-2,2);
    var day = ("0" + (f.getDate())).substr(-2,2);
    this.dateFilter = f.getFullYear() + "-" + mes + "-" + day;
    this.filterGastos();
    this.findMonth(f.getMonth()+1);

  
  }
  //Abrir modal y cerrar
  openModalAddGasto(){
    if(this.ModalAddGasto) this.ModalAddGasto = false;
    else this.ModalAddGasto = true;
    this.clearInputGasto();
  }
  //Obtener todos los gastos de un dia
  filterGastos(){
    var f = new Date();
    var mes = ("0" + (f.getMonth() +1)).substr(-2,2);
    var day = ("0" + (f.getDate())).substr(-2,2);
    const hoy = f.getFullYear() + "-" + mes + "-" + day;

    if(this.dateFilter === hoy) this.filterDayIsToday = true;
    else this.filterDayIsToday = false;

    console.log(this.dateFilter);
    this.serviceGasto.filterByDay(this.dateFilter).subscribe(data=>{ 
      this.gastosByDay = data;
      this.getGastoTotal();
    });
    
  }

  //Obtener el total de gasto por dia
  getGastoTotal(){
    this.gastoTotalByDay = 0;
    for(let g of this.gastosByDay){
      this.gastoTotalByDay += g.gasto;
    }
  }

  //Obtener datos del presupuesto mensual
  findMonth(mes:number){
    this.servicePresupuesto.FindMonth(this.app.monthWrite(mes)).subscribe(data=> this.dataMonthActually = data);
  }

  //Agregar gasto al dia
  gasto:Gasto = new Gasto();
  addGasto(){
    
    var f = new Date();
    var mes = ("0" + (f.getMonth() +1)).substr(-2,2);
    var day = ("0" + (f.getDate())).substr(-2,2);
    const hoy = f.getFullYear() + "/" + mes + "/" + day;
    const dayWeew = new Date(hoy).getUTCDay();

    if(dayWeew === 1 || dayWeew === 3 || dayWeew === 5){
      if(this.nombre !== '' && this.monto > 1){
        this.gasto.idpresupuesto = this.dataMonthActually[0].id;
        this.gasto.nombre = this.nombre;
        
        this.gasto.fecha = f.getFullYear() + "/" + mes + "/" + day;
    
        this.gasto.gasto = this.monto;
        this.serviceGasto.addGasto(this.gasto).subscribe(
          data=> {
            this.filterGastos();
            this.servicePresupuesto.FindMonth(this.app.monthWrite(f.getMonth()+1)).subscribe(data=>{ 
              this.dataMonthActually = data;
              this.app.presupuesto = this.dataMonthActually[0].monto;
            });
            this.openModalAddGasto();
          }
        );
      }
      else alert ("Debe llenar los campos");
    }
    else alert("Solo se permite agregar gasto los dias LUNES - MIERCOLES - VIERNES");
    
  }

  clearInputGasto(){
    this.nombre = "";
    this.monto = 0.00;
  }
  
}
