import { Component, OnInit } from '@angular/core';
import { FormaPagoEnum } from 'src/app/model/FormaPagoEnum';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-historial-pago',
  templateUrl: './historial-pago.component.html',
  styleUrls: ['./historial-pago.component.scss']
})
export class HistorialPagoComponent implements OnInit {
  pagos = [
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
    }]
    filteredPayments: any[] = [];
    paymentStates: any[] = [
      { label: 'Todos', value: null },
      { label: 'Efectivo', value: FormaPagoEnum.Efectivo },
      { label: 'Tarjeta de Crédito', value: FormaPagoEnum.TarjetaCredito },
      { label: 'Tarjeta de Débito', value: FormaPagoEnum.TarjetaDebito },
      { label: 'Pago en Línea', value: FormaPagoEnum.MercadoPago }
    ];
    selectedPaymentState: number;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.filteredPayments = this.pagos;
  }
  loadPayments() {
   /* this.accountService.getAllPayments().subscribe((orders: Payment[]) => {
      this.pagos = orders;
    });*/
  }

  getFormaDePagoName(id: any): String {
    return FormaPagoEnum.getPaymentMethodName(id);
  }

  filterPayments(): void {
    if (this.selectedPaymentState) {
      this.filteredPayments = this.pagos.filter(payment => payment.formaPago === this.selectedPaymentState);
    } else {
      this.filteredPayments = this.pagos;
    }
  }
}
