import { Component, OnInit } from '@angular/core';
import {ChartDataSets, ChartType} from 'chart.js';
import { Color, Label } from 'ng2-charts';
import {AuthService} from '../_services/auth.service';
import {HttpParams} from '@angular/common/http';
import {UserService} from '../_services/user.service';
import {FormGroup, FormControl} from '@angular/forms';
import {Common} from '../common/Common';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  summaryData: any = [];
  slider = {triplen: {
      value: 3,
      highValue: 20,
      options: {
        floor: 0,
        ceil:   100
      }}, consumption: {
      value: 0,
      highValue: 3500,
      options: {
        floor: 0,
        ceil:   20000
      }}, outsideTemp: {
      value: 0,
      highValue: 25,
      options: {
        floor: -15,
        ceil:   45
      }}, drivingTime: {
      value: 0,
      highValue: 30,
      options: {
        floor: 0,
        ceil:   300
      }}
  };

  lineChartData: ChartDataSets[];
  lineChartLabels: Label;
  lineChartOptions = {
    hoverMode: 'index',
    ticks: {
      precision: 0
    },
    stacked: true,
    responsive: true,
    fill: true,
  };
  lineChartLegend = true;
  lineChartType: ChartType = 'line';
  lineChartPlugins = [];

  fieldnames: string[] = ['trips', 'day', 'month'];
  kindof: string[] = ['single Trips', 'group by day', 'group by week', 'group by month'];
  columnsdata: string[] = [];


  constructor(private auth: AuthService, private service: UserService) {}
  form: any =  new FormGroup({
    start : new FormControl(),
    end: new FormControl(),
    typeSummary: new FormControl('nothing selected!!!'),
    columns: new FormControl(''),
  });


  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];

  ngOnInit(): void {
    this.auth.check();
  }

loadData(): void{
    const params = this.buildParams();
    const type = this.form.controls.typeSummary.value;
    this.service.loadSummary(type, params).subscribe(
      (data) => {
        this.summaryData = data.summary;
        this.lineChartLabels = this.buildLabel(data.summary);
        this.onChange();
      }
    );
  }

onSubmit(): boolean{
    return false;
  }

onChange(): void{
  this.lineChartLabels = this.buildLabel(this.summaryData);
  this.lineChartData = [];
  let oneDateSet = {data: [], label: ''};
  if (this.form.controls.columns.value.length !== 0){
    this.form.controls.columns.value.forEach( (selected) => {
      this.summaryData.forEach( (dataRow) => {
        oneDateSet.data.push(dataRow[selected]);
        oneDateSet.label = selected;
      });
      this.lineChartData.push(oneDateSet);
      oneDateSet = {data: [], label: ''};
    });
  }else{
    alert('keine Spalte ausgewählt');
  }
  }

buildLabel(data: any[]): Label{
  const mode = this.form.controls.typeSummary.value;
  if (mode === 'day'){
    const labels = [];
    data.forEach(
      (it) => {
        labels.push(it.day + '.' + it.month + '.' + it.year);
      }
    );
    return labels;
  }else   if (mode === 'month'){
    const labels = [];
    data.forEach(
      (it) => {
        labels.push(it.month + '-' + it.year);
      }
    );
    return labels;
  }else if (mode === 'trips'){
    const labels = [];
    data.forEach(
      (it) => {
        labels.push(it.day + ' - ' + it.time_Begins);
      }
    );
    return labels;
  }
}

columnLoad(): void{
    const type = this.form.controls.typeSummary.value;
    this.service.loadColumns(type).subscribe((data) => {
      this.columnsdata = [];
      for (const elm of data.columns) {

        if (elm === 'id' || elm === 'trip_number' || elm === 'day' ||
          elm === 'time_Begins' || elm === 'time_End' || elm === 'km_start' ||
          elm === 'km_end' || elm === 'month' || elm === 'year') {
          continue;
        }
        this.columnsdata.push(elm);
      }
      });
    }

buildParams(output: string = 'json'): HttpParams{
    let params = new HttpParams().append('output', output);

    if ( this.form.controls.typeSummary.value === 'day' || this.form.controls.typeSummary.value === 'trips'){
      if (this.form.controls.start.value != null ){
        params = params.append('timeBegin',  (this.form.controls.start.value.getTime() / 1000).toString());
      }
      if (this.form.controls.end.value != null ){
        params = params.append('timeEnd', (this.form.controls.end.value.getTime() / 1000).toString());
      }
    }
    if (this.form.controls.typeSummary.value === 'trips'){
      // set a Filter if not max or min Value

      if (this.slider.triplen.value !== this.slider.triplen.options.floor){
         params = params.append('MinLength', String(this.slider.triplen.value));
      }
      if (this.slider.triplen.highValue  !== this.slider.triplen.options.ceil){
        params = params.append('MaxLength', String(this.slider.triplen.highValue));
      }
      if (this.slider.consumption.value  !== this.slider.consumption.options.floor){
        params = params.append('MinConsumption', String(this.slider.consumption.value));
      }
      if (this.slider.consumption.highValue  !== this.slider.consumption.options.ceil){
        params = params.append('MaxConsumption', String(this.slider.consumption.highValue));
      }
      if (this.slider.outsideTemp.value  !== this.slider.outsideTemp.options.floor){
        params = params.append('MinTempOutdoor', String(this.slider.outsideTemp.value));
      }
      if (this.slider.outsideTemp.highValue  !== this.slider.outsideTemp.options.ceil){
        params = params.append('MaxTempOutdoor', String(this.slider.outsideTemp.highValue));
      }
      if (this.slider.drivingTime.value  !== this.slider.drivingTime.options.floor){
        params = params.append('MinDriving', String(this.slider.drivingTime.value));
      }
      if (this.slider.drivingTime.highValue  !== this.slider.drivingTime.options.ceil){
        params = params.append('MaxDriving', String(this.slider.drivingTime.highValue));
      }
    }
    return params;
}
downlaodDatawithQuery(): void{
    const params = this.buildParams('csv');
    const type = this.form.controls.typeSummary.value;
    this.service.getTxtfromSummary(type, params).subscribe((response: any) => {
    Common.downloadFile(response, 'charts.csv');
  });
}

}

