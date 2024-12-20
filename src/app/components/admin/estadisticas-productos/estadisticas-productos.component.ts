import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Subscription } from 'rxjs';
import { Account } from 'src/app/model/Account';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-estadisticas-productos',
  templateUrl: './estadisticas-productos.component.html',
  styleUrls: ['./estadisticas-productos.component.scss'],
})
export class EstadisticasProductosComponent implements OnInit {
  endDate: any;
  startDate: any;
  calendarEndDate: Date;
  calendarStartDate: Date;
  bills: Account[];
  data: any;

  chartOptions: any;

  subscription: Subscription;
  indicators: any;
  rankingWaiterDtos: any;
  rankingTables: any;
  es: {
    firstDayOfWeek: number; dayNames: string[]; dayNamesShort: string[]; dayNamesMin: string[]; monthNames: string[]; monthNamesShort: string[]; today: string; clear: string; dateFormat: string; // formato dd/mm/aaaa
    weekHeader: string;
  };

  constructor(private datePipe: DatePipe,private accountService: AccountService) {}

  ngOnInit(): void {
    this.es = {
      firstDayOfWeek: 1,
      dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
      dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
      dayNamesMin: ["D", "L", "M", "M", "J", "V", "S"],
      monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
      monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
      today: 'Hoy',
      clear: 'Limpiar',
      dateFormat: 'dd/mm/yy',  // formato dd/mm/aaaa
      weekHeader: 'Sm'
    };
    this.loadAccounts();
  }
  exportAsPDF() {
    const content = document.getElementById('contentToExport');

    if (content) {
      html2canvas(content).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');  // Crea un nuevo documento PDF en modo vertical (p)

        const imgWidth = 208;
        const pageHeight = 295;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;

        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save('pantalla-exportada.pdf');  // Descarga el archivo PDF
      });
    }
  }

  loadAccounts() {
    this.accountService.getStatistics(this.startDate ,this.endDate ).subscribe((item) => {
      console.log(item)
      this.indicators = item.indicators;
      this.bills = item.rankingProducts;
      this.rankingTables = item.rankingTables;
      this.rankingWaiterDtos = item.rankingWaiterDtos;
      this.data = {
        labels: [
          'Efectivo',
          'Tarjeta Credito',
          'Tarjeta Debito',
          'Mercado Pago',
        ],
        datasets: [
          {
            data: [this.indicators.rankingWayToPayDtos[0].amount, this.indicators.rankingWayToPayDtos[1].amount, this.indicators.rankingWayToPayDtos[2].amount, this.indicators.rankingWayToPayDtos[3].amount],
            //data: [300, 50, 100, 50],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#644AB5'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#644AB5'],
          },
        ],
      };
      this.updateChartOptions();
    });
  }

  changeDate() {
    if (this.calendarStartDate != null && this.calendarEndDate != null) {
      const fecha = new Date(this.calendarStartDate);
      this.startDate = this.datePipe.transform(fecha, 'M/d/yyyy HH:mm:ss') ?? '';
      const fecha2 = new Date(this.calendarEndDate);
      this.endDate = this.datePipe.transform(fecha2, 'M/d/yyyy HH:mm:ss') ?? '';
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
            color: '#495057',
          },
        },
      },
    };
  }
}
