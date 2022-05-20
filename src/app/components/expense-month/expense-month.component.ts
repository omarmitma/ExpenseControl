import { Component, OnInit } from '@angular/core';
import { DataMonth } from 'src/app/Modelo/DataMonth';
import { PresupuestoService } from 'src/app/Service/presupuesto.service';

@Component({
  selector: 'app-expense-month',
  templateUrl: './expense-month.component.html',
  styleUrls: ['./expense-month.component.scss']
})
export class ExpenseMonthComponent implements OnInit {

  dataMonth:DataMonth[] = [];

  total:number = 0.00;
  constructor(private servicePresupuesto:PresupuestoService) { }

  ngOnInit(): void {
    this.findDataByMonth();
  }

  //Obtener datos de cada mes
  findDataByMonth(){
    this.servicePresupuesto.Get_Data_Month().subscribe(data=>{
      this.dataMonth = data;
      this.TotalGastoMonth();
      console.log(data);
    });
  }

  //Total gastado
  TotalGastoMonth(){
    this.total = 0.00;

    for(let g of this.dataMonth){
      this.total += g.gasto;
    }
  }

}
