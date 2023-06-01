import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard-charts1',
  templateUrl: './dashboard-charts1.component.html',
  styleUrls: ['./dashboard-charts1.component.scss']
})
export class DashboardCharts1Component implements OnInit {

  public chart:any;
  constructor() { }

  ngOnInit(): void {
    this.createChart();
  }

  createChart() {

    this.chart = new Chart("LineChart", {
      type: 'line', //this denotes tha type of chart
      data: {// values on X-Axis
        labels: ['00:00', '03:00', '06:00', '09:00',
          '12:00', '15:00', '18:00', '21:00', '24:00',],
        datasets: [
          {
            label: "Horarios programados",
            data: ['50', '63', '40', '39', '55',
              '31', '20', '47', '26'],
            backgroundColor: 'orange'
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          }
        }
      }
    }
    )
  }
}
