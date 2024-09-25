import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/model/Account';
import { FormaPagoEnum } from 'src/app/model/FormaPagoEnum';
import { AccountService } from 'src/app/services/account.service';
import { WaiterService } from 'src/app/services/waiter.service';

@Component({
  selector: 'app-historial-pago',
  templateUrl: './historial-pago.component.html',
  styleUrls: ['./historial-pago.component.scss']
})
export class HistorialPagoComponent implements OnInit {
  pagos : Account[];
  /* [
    {
        "id": 1,
        "amount": 100.00,
        "date": "2024-08-01T00:00:00Z",
        "formaPago": 1
    },
    {
        "id": 2,
        "amount": 250.50,
        "date": "2024-08-02T00:00:00Z",
        "formaPago": 2
    },
    {
        "id": 3,
        "amount": 75.75,
        "date": "2024-08-03T00:00:00Z",
        "formaPago": 3
    },
    {
        "id": 4,
        "amount": 300.00,
        "date": "2024-08-04T00:00:00Z",
        "formaPago": 4
    }]*/
    filteredPayments: any[] = [];
    paymentStates: any[] = [
      { label: 'Todos', value: null },
      { label: 'Efectivo', value: FormaPagoEnum.Efectivo },
      { label: 'Tarjeta de Crédito', value: FormaPagoEnum.TarjetaCredito },
      { label: 'Tarjeta de Débito', value: FormaPagoEnum.TarjetaDebito },
      { label: 'Pago en Línea', value: FormaPagoEnum.MercadoPago }
    ];
    selectedPaymentState: number;
    endDate: Date;
    
    startDate: Date;
  waiters: string[];
selectedWaiter: any;
  constructor(private waiterService: WaiterService ,private accountService: AccountService) { }

  ngOnInit(): void {
    this.getWaiter()
  }
  loadPayments() {
    this.accountService.getAllAccounts(this.startDate, this.endDate).subscribe((orders: Account[]) => {
      this.pagos = orders;
      this.filteredPayments = this.pagos;
    });
  }
  changeDate(){
    if(this.startDate != null && this.endDate != null){
      this.loadPayments();
    }
  }
  getTotalAmount() {
    return this.filteredPayments.reduce((sum, payment) => sum + payment.amount, 0);
  }
  
  getFormaDePagoName(id: any): String {
    return FormaPagoEnum.getPaymentMethodName(id);
  }
  exportToCSV() {
    const headers = ['Nº', 'Monto', 'Fecha', 'Forma De Pago', 'Mozo', 'Mesa'];
    const rows = this.filteredPayments.map(payment => [
      payment.id,
      payment.amount,
      payment.date,
      this.getFormaDePagoName(payment.wayToPay),
      payment.tableWaiter.waiter.name,
      payment.tableWaiter.table.id
    ]);
  
    let csvContent = "data:text/csv;charset=utf-8," 
                    + headers.join(",") + "\n" 
                    + rows.map(e => e.join(",")).join("\n");
  
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "registros_pagos.csv");
    document.body.appendChild(link); // Required for FF
  
    link.click();
  }
  getWaiter(){
    this.waiterService.getAllWaiters().subscribe(value =>{
      this.waiters = value.map(item => item.name)
    } )

  }
  filterPayments(origin: string): void {
    if(origin == 'state'){
      if (this.selectedPaymentState) {
        this.filteredPayments = this.pagos.filter(payment => payment.wayToPay === this.selectedPaymentState);
      } 
    }
    if(origin == 'waiter'){
    if (this.selectedWaiter) {
      this.filteredPayments = this.pagos.filter(payment => payment.tableWaiter.waiter.name === this.selectedWaiter);
    } 
  }
    if(origin != 'waiter' && origin !='state'){
      this.filteredPayments = this.pagos;
    }
  
}
}
