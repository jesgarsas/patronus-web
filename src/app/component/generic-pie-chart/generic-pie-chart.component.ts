import { Component, Input, OnInit } from '@angular/core';
import { ColorScheme } from './models/color-scheme';
import { DataChart } from './models/data-chart';

@Component({
  selector: 'app-generic-pie-chart',
  templateUrl: './generic-pie-chart.component.html',
  styleUrls: ['./generic-pie-chart.component.scss']
})
export class GenericPieChartComponent implements OnInit {

  @Input() title?: string = 'Gráfica del grupo';
  @Input() total?: number = 100;
  @Input() serie?: DataChart[] = [
    {
      "name": "Aprobados",
      "value": 60
    },
    {
      "name": "Suspendidos",
      "value": 35
    },
    {
      "name": "No realizado",
      "value": 5
    }
  ];
  @Input() totalLabel?: string = 'Total de alumnos';
  @Input() colorScheme: ColorScheme | any = {
    domain: ['#7FDD69', '#DE3C25', '#808080']
  };
  view: any = [200, 200];

  // options
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  

  constructor() {}

  ngOnInit(): void {
  }

  onSelect(data: any): void {
    //console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    //console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDesactivate(data: any): void {
    //console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  calculatePercentage(value?: number): string {
    return value ? (Math.round((value! / this.total! * 100.0 + Number.EPSILON) * 100) / 100).toString().replace('.', ',') : '0';
  }

  formatNumber(num: number): string {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  }
}
