import { EndpointsService } from 'src/app/services/endpoints.service';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { SessaoService } from 'src/app/services/sessao.service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  barChartLabels: string[] = [];
  barChartData: ChartData<'bar'> | undefined;
  barChartType: ChartType = 'bar';
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.raw as number;
            return `R$${value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 }).split("R$").join("")}`;
          }
        }
      }
    },
    scales: {
      y: {
        ticks: {
          callback: function (value) {
            return `R$${value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 }).split("R$").join("")}`;
          }
        }
      }
    }
  };
  loading: boolean = false;

  dashboard_admin_data: any = null;
  dashboard_vendedor_data: any = null;
  empty: boolean = false;

  constructor(public sessao: SessaoService, private endpointService: EndpointsService) { }


  ngOnInit(): void {

    this.getDashboardAdmin();
  }

  async getDashboardAdmin() {
    this.loading = true;
    try {
      let data = await this.endpointService.get("/v1/admin/dashboard/admin");
      if (Object.keys(data).length > 0) {
        this.dashboard_admin_data = data;
      } else {
        this.empty = true;
      }
      if (data?.vendas_por_dia) {
        this.generateVendaBarchart(data.vendas_por_dia);
      }
    } catch (error) {
      console.log(error);
    }
    this.loading = false;
  }

  getTodayLabel(date: string) {
    if (date == new Date().toISOString().split('T')[0]) {
      return "Hoje";
    }
    return ''
  }


  generateVendaBarchart(data: any[]) {
    const last_days = data.map((_, i: any) => {
      return _.data.split("-").reverse().join('/').substring(0, 5);
    });
    const salesData = data.map((_, i: any) => {
      return _.total_venda
    })
    this.barChartLabels = last_days;
    this.barChartData = {
      labels: this.barChartLabels,
      datasets: [
        {
          data: salesData,
          label: 'Vendas',
          backgroundColor: '#0e245c'
        }
      ]
    };
  }
}
