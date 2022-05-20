import { Component, OnInit } from '@angular/core';
import { Presupuesto } from './Modelo/Presupuesto';
import { GastoServiceService } from './Service/gasto.service';
import { PresupuestoService } from './Service/presupuesto.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  iconCancel:string = '';
  modalAddPresupuesto:boolean = false;

  dataMonthActually:Presupuesto[] = [];

  presupuesto:number = 0.00;

  montoAddPresupuesto:number = 0.00;

  constructor(private servicePresupuesto:PresupuestoService) { }

  ngOnInit(): void {
    var f = new Date();
    this.findMonth(f.getMonth()+1);
  }

  changeIcon(){
    if(this.iconCancel === 'cancel') this.iconCancel = 'bar';
    else this.iconCancel = 'cancel';
  }
  openModalAddPresupuesto(){
    if(this.modalAddPresupuesto) this.modalAddPresupuesto = false;
    else this.modalAddPresupuesto = true;
  }

  //Obtener datos del presupuesto mensual
  findMonth(mes:number){
    this.servicePresupuesto.FindMonth(this.monthWrite(mes)).subscribe(data=>{ 
      this.dataMonthActually = data;
      this.presupuesto = data[0].monto;
    });
  }

  presupuestoMore:Presupuesto = new Presupuesto();
  //Agregar mas presupuesto
  AddMorePre(){
    if(this.montoAddPresupuesto > 0){

      this.presupuestoMore.id = this.dataMonthActually[0].id;
      this.presupuestoMore.monto = this.montoAddPresupuesto;
       
      this.servicePresupuesto.addMorePresupuesto(this.presupuestoMore).subscribe(data=>{
        var f = new Date();
        this.findMonth(f.getMonth()+1);
        this.openModalAddPresupuesto();
        alert("Monto S/. " + this.presupuestoMore.monto + " agregado");
      });
    }else{
      console.log("No puede agregar 0")
    }
  }

  //Mes escrito
  monthWrite(mes:number){
    switch(mes){
      case 1:
        return "January";
      case 2:
        return "February";
      case 3:
        return "March";
      case 4:
        return "April";
      case 5:
        return "May";
      case 6:
        return "June";
      case 7:
        return "July";
      case 8:
        return "August";
      case 9:
        return "September";
      case 10:
        return "October";
      case 11:
        return "November";
      case 12:
        return "December";
      default:
        return "";
    }
  }
}
