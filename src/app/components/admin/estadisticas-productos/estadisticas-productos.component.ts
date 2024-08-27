import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Account } from 'src/app/model/Account';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-estadisticas-productos',
  templateUrl: './estadisticas-productos.component.html',
  styleUrls: ['./estadisticas-productos.component.scss']
})
export class EstadisticasProductosComponent implements OnInit {
endDate: Date;
startDate: Date;
bills : Account[];
data: any;

chartOptions: any;

subscription: Subscription;
  indicators: any;

  constructor(private accountService:AccountService) { }

  ngOnInit(): void {
    this.loadAccounts();
    this.data = {
      labels: ['Efectivo','Tarjeta Credito', 'Tarjeta Debito','Mercado Pago'],
      datasets: [
          {
              data: [this.indicators.rankingWayToPayDtos[0].quantity, this.indicators.rankingWayToPayDtos[1].quantity, this.indicators.rankingWayToPayDtos[2].quantity, this.indicators.rankingWayToPayDtos[3].quantity],
              backgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56"
              ],
              hoverBackgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56"
              ]
          }
      ]
  };
  this.updateChartOptions();
  }
  loadAccounts(){
    this.accountService.getStatistics().subscribe(item =>{
      console.log(item);
      this.indicators = item.indicators;
      this.bills = item.rankingProducts;
})
  }

  changeDate(){
    if(this.startDate != null && this.endDate != null){
      this.loadAccounts();
    }
  }
  updateChartOptions() {
    this.chartOptions = this.getLightTheme();
}

getLightTheme() {
    return {
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        }
    }
}

}
