import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard-card1',
  templateUrl: './dashboard-card1.component.html',
  styleUrls: ['./dashboard-card1.component.scss']
})
export class DashboardCard1Component implements OnInit {

  public chart:any;

  constructor() { }

  ngOnInit(): void {
    this.createChart();
  }

  createChart(){
  
    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart
      data: {// values on X-Axis
        labels: ['2023-05-10', '2023-05-11', '2023-05-12','2023-05-13',
								 '2023-05-14', '2023-05-15', '2023-05-16','2023-05-17', ], 
	       datasets: [
          {
            label: "Mascotas",
            data: ['50','63', '40', '39', '55',
								 '31', '20', '47'],
            backgroundColor: 'blue'
          },
          {
            label: "Alimentadores",
            data: ['12', '20', '8', '5', '13',
									 '11', '18', '9'],
            backgroundColor: 'yellow'
          }  
        ]
      },
      options: {
        responsive: true,
        aspectRatio:2.5
      }
      
    });
  }

}
