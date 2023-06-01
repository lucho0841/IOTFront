import {Component, OnInit} from '@angular/core';
import {ColumnChart} from "../../util/charts/column-chart";
import {DonutChart} from "../../util/charts/donut-chart";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  readonly chartId: string = 'column-chart';
  readonly donutChartId: string = 'donut-chart';
  readonly columnGroupChartId: string = 'column-group-chart';
  columnChart!: ColumnChart;
  donutChart!: DonutChart;
  columnGroupChart!: ColumnChart;

  constructor() {
    this.columnChart = new ColumnChart({
      id: this.chartId,
      title: 'Alimento consumido por dia',
      axisXValue: 'day',
      axisYValue: 'portion',
      rotatedLabels: false,
      labelX: 'Dias',
      labelY: 'g de alimento',
      data: this.buildColumnData(),
    });
    this.donutChart = new DonutChart({
      id: this.donutChartId,
      title: 'Distribucion porciones diarias',
      axisXValue: 'schedule',
      axisYValue: 'portion',
      unit: 'g',
      data: this.buildDonutData(),
    });
    this.columnGroupChart = new ColumnChart({
      id: this.columnGroupChartId,
      title: '# de mascotas segun su peso por mes',
      axisXValue: 'month',
      axisYValue: '',
      rotatedLabels: false,
      labelX: 'Dias',
      labelY: '# Mascotas',
      data: this.buildColumnGroupData(),
      seriesList: [
        {
          name: 'Sobrepeso',
          valueYField: 'overweight'
        },
        {
          name: 'Normal',
          valueYField: 'normal'
        },
        {
          name: 'Peso bajo',
          valueYField: 'underweight'
        }
      ]
    });
  }

  ngOnInit(): void {
    this.columnChart.buildChart();
    this.donutChart.buildChart();
    this.columnGroupChart.buildChart();
  }

  buildColumnData(): { day: string; portion: number }[] {
    return [
      {
        day: 'Lunes',
        portion: 300
      },
      {
        day: 'Martes',
        portion: 400
      },
      {
        day: 'Miercoles',
        portion: 250
      },
      {
        day: 'Jueves',
        portion: 350
      },
      {
        day: 'Viernes',
        portion: 300
      },
      {
        day: 'Sabado',
        portion: 280
      },
      {
        day: 'Domingo',
        portion: 340
      }
    ];
  }

  buildDonutData(): { schedule: string; portion: number }[] {
    return [
      {
        schedule: 'Mañana',
        portion: 100
      },
      {
        schedule: 'Tarde',
        portion: 150
      },
      {
        schedule: 'Noche',
        portion: 100
      }
    ];
  }

  buildColumnGroupData(): { overweight: number; underweight: number; normal: number; month: string }[] {
    return [
      {
        month: 'Ene',
        overweight: 4,
        normal: 13,
        underweight: 2
      },
      {
        month: 'Feb',
        overweight: 5,
        normal: 11,
        underweight: 1
      },
      {
        month: 'Mar',
        overweight: 3,
        normal: 10,
        underweight: 0
      },
      {
        month: 'Abr',
        overweight: 1,
        normal: 20,
        underweight: 5
      },
      {
        month: 'May',
        overweight: 6,
        normal: 23,
        underweight: 2
      },
      {
        month: 'Jun',
        overweight: 8,
        normal: 11,
        underweight: 8
      },
      {
        month: 'Jul',
        overweight: 0,
        normal: 23,
        underweight: 4
      },
      {
        month: 'Ago',
        overweight: 3,
        normal: 17,
        underweight: 1
      },
      {
        month: 'Sep',
        overweight: 5,
        normal: 19,
        underweight: 5
      },
      {
        month: 'Oct',
        overweight: 6,
        normal: 14,
        underweight: 7
      },
      {
        month: 'Nov',
        overweight: 1,
        normal: 24,
        underweight: 1
      },
      {
        month: 'Dic',
        overweight: 8,
        normal: 15,
        underweight: 2
      }
    ];
  }

}
