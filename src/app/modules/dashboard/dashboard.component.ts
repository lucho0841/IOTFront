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
    this.refresxh();
  }

  refresxh(): void {
    this.columnChart.buildChart();
    this.donutChart.buildChart();
    this.columnGroupChart.buildChart();
  }

  buildColumnData(): { day: string; portion: number }[] {
    return [
      {
        day: 'Lunes',
        portion: this.getPortionByDay()
      },
      {
        day: 'Martes',
        portion: this.getPortionByDay()
      },
      {
        day: 'Miercoles',
        portion: this.getPortionByDay()
      },
      {
        day: 'Jueves',
        portion: this.getPortionByDay()
      },
      {
        day: 'Viernes',
        portion: this.getPortionByDay()
      },
      {
        day: 'Sabado',
        portion: this.getPortionByDay()
      },
      {
        day: 'Domingo',
        portion: this.getPortionByDay()
      }
    ];
  }

  buildDonutData(): { schedule: string; portion: number }[] {
    return [
      {
        schedule: 'Mañana',
        portion: this.getPortionBySchedule()
      },
      {
        schedule: 'Tarde',
        portion: this.getPortionBySchedule()
      },
      {
        schedule: 'Noche',
        portion: this.getPortionBySchedule()
      }
    ];
  }

  buildColumnGroupData(): { overweight: number; underweight: number; normal: number; month: string }[] {
    return [
      {
        month: 'Ene',
        overweight: this.getPetNumberByWeight(),
        normal: this.getPetNumberByWeight(),
        underweight: this.getPetNumberByWeight()
      },
      {
        month: 'Feb',
        overweight: this.getPetNumberByWeight(),
        normal: this.getPetNumberByWeight(),
        underweight: this.getPetNumberByWeight()
      },
      {
        month: 'Mar',
        overweight: this.getPetNumberByWeight(),
        normal: this.getPetNumberByWeight(),
        underweight: this.getPetNumberByWeight()
      },
      {
        month: 'Abr',
        overweight: this.getPetNumberByWeight(),
        normal: this.getPetNumberByWeight(),
        underweight: this.getPetNumberByWeight()
      },
      {
        month: 'May',
        overweight: this.getPetNumberByWeight(),
        normal: this.getPetNumberByWeight(),
        underweight: this.getPetNumberByWeight()
      },
      {
        month: 'Jun',
        overweight: this.getPetNumberByWeight(),
        normal: this.getPetNumberByWeight(),
        underweight: this.getPetNumberByWeight()
      },
      {
        month: 'Jul',
        overweight: this.getPetNumberByWeight(),
        normal: this.getPetNumberByWeight(),
        underweight: this.getPetNumberByWeight()
      },
      {
        month: 'Ago',
        overweight: this.getPetNumberByWeight(),
        normal: this.getPetNumberByWeight(),
        underweight: this.getPetNumberByWeight()
      },
      {
        month: 'Sep',
        overweight: this.getPetNumberByWeight(),
        normal: this.getPetNumberByWeight(),
        underweight: this.getPetNumberByWeight()
      },
      {
        month: 'Oct',
        overweight: this.getPetNumberByWeight(),
        normal: this.getPetNumberByWeight(),
        underweight: this.getPetNumberByWeight()
      },
      {
        month: 'Nov',
        overweight: this.getPetNumberByWeight(),
        normal: this.getPetNumberByWeight(),
        underweight: this.getPetNumberByWeight()
      },
      {
        month: 'Dic',
        overweight: this.getPetNumberByWeight(),
        normal: this.getPetNumberByWeight(),
        underweight: this.getPetNumberByWeight()
      }
    ];
  }

  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getPortionByDay(): number {
    return this.getRandomInt(120, 1000);
  }

  getPortionBySchedule(): number {
    return this.getRandomInt(50, 330);
  }

  getPetNumberByWeight(): number {
    return this.getRandomInt(0, 30);
  }

}
