import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from '../common/global-constants';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import {AuthService} from '../_services/auth.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  constructor(private auth: AuthService) {}
  form: any = {
    begin: null,
    end: null,
    typec: null,
    kindof: null,
    columns: null,
    maxlen: null,
    minlen: null
  };

  lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  ];
  lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  lineChartOptions: { responsive: boolean } = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];

  fieldnames: string[] = ['test', 'test2', 'test3'];
  kindof: string[] = ['single Trips', 'group by day', 'group by week', 'group by month'];
  columnsdata: string[] = ['spalte1', 'spalte2', 'spalte3', 'spalte4'];

  ngOnInit(): void {
    this.auth.check();
  }

  onSubmit(): boolean {
    return false;
  }
}
