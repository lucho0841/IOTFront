import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import {IChart} from './i-chart';
import {DonutChartParams} from './params/donut-chart-params';

export class DonutChart implements IChart {
  private chartObject: am5.Root | null | undefined;
  private series!: am5percent.PieSeries;
  private params: DonutChartParams;

  constructor(params: DonutChartParams) {
    this.params = params;
  }

  buildChart(): void {
    if (this.elementExistById()) {
      if (this.chartObject) {
        this.chartObject.dispose();
      }

      const root = am5.Root.new(this.params.id);

      root._logo?.dispose();
      root.setThemes([am5themes_Animated.new(root)]);

      let chart = root.container.children.push(
        am5percent.PieChart.new(root, {
          layout: root.verticalLayout,
          innerRadius: am5.percent(50)
        })
      );

      let series: am5percent.PieSeries = chart.series.push(
        am5percent.PieSeries.new(root, {
          valueField: this.params.axisYValue,
          categoryField: this.params.axisXValue,
          alignLabels: false,
          tooltip: am5.Tooltip.new(root, {
            labelText: `{category}: {value} ${this.params.unit}`,
          }),
        })
      );

      series.labels.template.setAll({
        textType: "adjusted",
        inside: true,
        text: '',
        centerX: 0,
        centerY: 0
      });

      series.data.setAll(this.params.data);

      series.bullets.push(function (root) {
        return am5.Bullet.new(root, {
          sprite: am5.Label.new(root, {
            text: '{valuePercentTotal.formatNumber("0.00")}%',
            centerX: am5.percent(50),
            centerY: am5.percent(50),
            populateText: true,
          }),
        });
      });

      let legend = chart.children.push(am5.Legend.new(root, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        marginTop: 15,
        marginBottom: 15,
      }));

      chart.children.unshift(
        am5.Label.new(root, {
          text: this.params.title,
          fontSize: 25,
          fontWeight: '500',
          textAlign: 'center',
          x: am5.percent(50),
          y: am5.percent(0),
          centerX: am5.percent(50),
        })
      );

      legend.data.setAll(series.dataItems);
      series.appear(1000, 100).then();

      this.series = series;
      this.chartObject = root;
    }
  }

  setParams(chartParams: DonutChartParams): void {
    this.params = chartParams;
  }

  getParams(): DonutChartParams {
    return this.params;
  }

  deleteChart(): void {
    if (this.chartObject) {
      this.chartObject.dispose();
      this.chartObject = null;
    }
  }

  private elementExistById(): boolean {
    return document.getElementById(this.params.id) !== null;
  }
}
