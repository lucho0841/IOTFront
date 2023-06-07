import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { IChart } from "./i-chart";
import { ColumnChartParams } from './params/column-chart-params';
import { IXYAxis } from "@amcharts/amcharts5/.internal/charts/xy/series/XYSeries";
import { Series } from "./params/series";

export class ColumnChart implements IChart {
    private chartObject: am5.Root | null | undefined;
    private seriesList!: am5xy.ColumnSeries[];
    private params: ColumnChartParams;

    constructor(params: ColumnChartParams) {
        this.params = params;
    }

    buildChart(): void {
        if (this.elementExistById()) {
            if (this.chartObject) {
                this.chartObject.dispose();
            }

            const root = am5.Root.new(this.params.id);
            root._logo?.dispose();

            root.setThemes([
                am5themes_Animated.new(root)
            ]);

            let chart = root.container.children.push(am5xy.XYChart.new(root, {
                panX: true,
                panY: true,
                wheelX: "panX",
                wheelY: "zoomX",
                pinchZoomX: true,
                height: am5.percent(95),
            }));

            let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
            cursor.lineY.set("visible", false);

            let xRenderer = this.buildXRenderer({ root, rotatedLabels: this.params.rotatedLabels });
            let xAxis = this.buildXAxis({ root, chart, xRenderer, categoryField: this.params.axisXValue, data: this.params.data });
            let yAxis = this.buildYAxis({ chart, root });
            let legend = this.buildLegend({ chart, root });

            if (this.params.seriesList) {
                this.seriesList = this.buildSeriesList({
                    seriesList: this.params.seriesList,
                    root,
                    chart,
                    categoryXField: this.params.axisXValue,
                    xAxis,
                    yAxis,
                    legend,
                    data: this.params.data
                });
            } else {
                this.seriesList = [this.buildSeries({
                    root,
                    chart,
                    name: 'Series 1',
                    valueYField: this.params.axisYValue,
                    categoryXField: this.params.axisXValue,
                    xAxis,
                    yAxis,
                    legend,
                    data: this.params.data
                })];
            }

            chart.children.unshift(
                am5.Label.new(root, {
                    text: this.params.title,
                    fontSize: 25,
                    fontWeight: '500',
                    textAlign: 'center',
                    x: am5.percent(50),
                    centerX: am5.percent(50),
                })
            );

            chart.children.unshift(
                am5.Label.new(root, {
                    text: this.params.labelX,
                    fontSize: 20,
                    fontWeight: '500',
                    x: am5.percent(50),
                    y: am5.percent(95),
                })
            );

            chart.children.unshift(
                am5.Label.new(root, {
                    text: this.params.labelY,
                    fontSize: 20,
                    fontWeight: '500',
                    x: -10,
                    y: am5.percent(50),
                    rotation: -90,
                    marginRight: 50,
                })
            );

            chart.appear(1000, 100).then();

            this.chartObject = root;
        }
    }

    getSelectedColumnValue($func: (this: unknown, event: am5.ISpritePointerEvent & { type: "click"; target: am5.RoundedRectangle; }) => void): void {
        this.seriesList?.forEach(series => series.columns.template.events.on('click', $func));
    }

    setParams(params: ColumnChartParams): void {
        this.params = params;
    }

    getParams(): ColumnChartParams {
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

    private buildXRenderer(value: {
        root: am5.Root,
        rotatedLabels: boolean
    }): am5xy.AxisRendererX {
        let xRenderer = am5xy.AxisRendererX.new(value.root, { minGridDistance: 30 });
        xRenderer.labels.template.setAll({
            rotation: value.rotatedLabels ? -90 : 0,
            centerY: am5.p50,
            centerX: am5.p50,
            paddingRight: 15,
        });

        xRenderer.grid.template.setAll({
            location: 1
        });

        return xRenderer;
    }

    private buildXAxis(value: {
        chart: am5xy.XYChart,
        root: am5.Root,
        xRenderer: am5xy.AxisRendererX,
        categoryField: string,
        data: any[]
    }): IXYAxis {
        let xAxis = value.chart.xAxes.push(am5xy.CategoryAxis.new(value.root, {
            maxDeviation: 0.3,
            categoryField: value.categoryField,
            renderer: value.xRenderer,
            tooltip: am5.Tooltip.new(value.root, {})
        }));

        xAxis.get("renderer").labels.template.setAll({
            oversizedBehavior: "truncate",
            textAlign: "center",
            maxHeight: 200,
        });

        xAxis.data.setAll(value.data);

        return xAxis;
    }

    private buildYAxis(value: {
        chart: am5xy.XYChart,
        root: am5.Root
    }): IXYAxis {
        return value.chart.yAxes.push(am5xy.ValueAxis.new(value.root, {
            maxDeviation: 0.3,
            renderer: am5xy.AxisRendererY.new(value.root, {
                strokeOpacity: 0.1
            })
        }));
    }

    private buildLegend(value: {
        chart: am5xy.XYChart,
        root: am5.Root
    }): am5.Legend {
        return value.chart.children.push(
            am5.Legend.new(value.root, {
                centerX: am5.p50,
                x: am5.p50,
                y: am5.percent(103)
            })
        );
    }

    private buildSeries(value: {
        name: string,
        chart: am5xy.XYChart,
        root: am5.Root,
        xAxis: IXYAxis,
        yAxis: IXYAxis,
        valueYField: string,
        categoryXField: string,
        data: any[],
        legend: am5.Legend,
        isMultiSeries?: boolean
    }): am5xy.ColumnSeries {
        let series = value.chart.series.push(am5xy.ColumnSeries.new(value.root, {
            name: value.name,
            xAxis: value.xAxis,
            yAxis: value.yAxis,
            valueYField: value.valueYField,
            sequencedInterpolation: true,
            categoryXField: value.categoryXField,
            tooltip: am5.Tooltip.new(value.root, {
                labelText: value.isMultiSeries ? "{name}: {valueY}" : "{valueY}"
            })
        }));

        series.bullets.push(function (root) {
            return am5.Bullet.new(root, {
                locationX: 0.5,
                locationY: 0.5,
                sprite: am5.Label.new(root, {
                    text: '{valueY}',
                    centerX: am5.percent(50),
                    centerY: am5.percent(50),
                    populateText: true,
                    rotation: -90,
                }),
            });
        });

        series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5, strokeOpacity: 0 });

        series.columns.template.adapters.add("fill", function (fill, target) {
            return value.isMultiSeries ? fill : value.chart.get("colors")?.getIndex(series.columns.indexOf(target));
        });

        series.columns.template.adapters.add("stroke", function (stroke, target) {
            return value.chart.get("colors")?.getIndex(series.columns.indexOf(target));
        });

        if (value.isMultiSeries) {
            value.legend.data.push(series);
        }

        series.data.setAll(value.data);
        series.appear(1000).then();

        return series;
    }

    private buildSeriesList(value: {
        seriesList: Series[],
        chart: am5xy.XYChart,
        root: am5.Root,
        xAxis: IXYAxis,
        yAxis: IXYAxis,
        categoryXField: string,
        legend: am5.Legend,
        data: any[]
    }): am5xy.ColumnSeries[] {
        return value.seriesList.map(series => this.buildSeries({ ...value, name: series.name, valueYField: series.valueYField, isMultiSeries: true }));
    }
}
