import { ChartParams } from "./params/chart-params";

export interface IChart {
    buildChart(): void;
    deleteChart(): void;
    setParams(chartParams: ChartParams): void;
    getParams(): ChartParams;
}
