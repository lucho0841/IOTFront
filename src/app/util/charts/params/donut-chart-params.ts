import { ChartParams } from './chart-params';
export interface DonutChartParams extends ChartParams {
  title: string;
  axisXValue: string;
  axisYValue: string;
  unit: string;
}
