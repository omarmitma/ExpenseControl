import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseDayComponent } from './components/expense-day/expense-day.component';
import { ExpenseMonthComponent } from './components/expense-month/expense-month.component';

const routes: Routes = [
  {path:'', component:ExpenseDayComponent},
  {path:'month', component:ExpenseMonthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
