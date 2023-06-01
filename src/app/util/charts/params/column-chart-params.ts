import { ChartParams } from './chart-params';
import { Series } from './series';
export interface ColumnChartParams extends ChartParams {
  title: string;
  labelX: string;
  labelY: string;
  rotatedLabels: boolean;
  axisXValue: string;
  axisYValue: string;
  isColumn?: boolean;
  isBar?: boolean;
  isStacked?: boolean;
  showValueInside?: boolean;
  seriesList?: Series[];
}
