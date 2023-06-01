import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard-charts2',
  templateUrl: './dashboard-charts2.component.html',
  styleUrls: ['./dashboard-charts2.component.scss']
})
export class DashboardCharts2Component implements OnInit {

  public chart: any;
  constructor() { }

  ngOnInit(): void {
    this.createChart();
  }

  createChart() {
    this.chart = new Chart("doughnutChart", {
      type: 'doughnut', //this denotes tha type of chart
      data: {
        labels: ['Alimentador#1', 'Alimentador#2', 'Alimentador#3', 'Alimentador#4'],
        datasets: [{
          label: 'Peso en gramos (Gr)',
          data: [15, 27, 8, 23],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(37, 232, 111)',
          ],
        }]
      }, 
      options:{
        responsive: true
      }
    }
    )
  }

}
