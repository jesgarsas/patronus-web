import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { EstSerieItem } from 'src/app/models/estadisticas/est-serie';
import { ColorScheme } from './models/color-scheme';

@Component({
  selector: 'app-generic-pie-chart',
  templateUrl: './generic-pie-chart.component.html',
  styleUrls: ['./generic-pie-chart.component.scss']
})
export class GenericPieChartComponent implements OnInit {

  @Input() title?: string = '';
  @Input() total?: number = 100;
  @Input() serie?: EstSerieItem[];
  @Input() totalLabel?: string = 'Total de alumnos';
  @Input() simple: boolean = true;
  @Input() colorScheme: ColorScheme | any = {
    domain: ['#7FDD69', '#DE3C25', '#808080']
  };
  @Input() home: boolean = false;
  view: any = [200, 200];

  // options
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  colorSchemeHome: ColorScheme | any = {
    domain: ['#7FDD69', '#DE3C25']
  };

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
    return num ? num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : '0';
  }
}
