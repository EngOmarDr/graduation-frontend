import { Component, OnInit } from '@angular/core';
import { StatisticsService } from './service/statistics.service';
import { StatisticsDashboardResponse } from './model/product.model';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexPlotOptions,
  ApexTitleSubtitle,
  ApexStroke,
  ApexFill,
  ApexLegend,
  ApexNonAxisChartSeries,
  ApexResponsive
} from "ng-apexcharts";

export type ApexPieChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  colors: string[];
  legend: ApexLegend;
  responsive: ApexResponsive[];
};

export type ChartOptions = {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  title: ApexTitleSubtitle;
  stroke: ApexStroke;
  fill: ApexFill;
  legend: ApexLegend;
  responsive: ApexResponsive[];
};

@Component({
  selector: 'app-dashboard-component',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './dashboard-component.component.html',
  styleUrls: ['./dashboard-component.component.css'],
})
export class DashboardComponentComponent implements OnInit {

  dashboardData!: StatisticsDashboardResponse;
  loading = true;
  error: string | null = null;

  generalIndicatorItems: any[] = [];
  financialItems: any[] = [];

  branchChartOptions: ChartOptions = {
  series: [],
  chart: { type: 'bar', height: 350 },
  xaxis: { categories: [] },
  dataLabels: { enabled: false },
  plotOptions: { bar: { borderRadius: 6, horizontal: false } },
  title: { text: '' },
  stroke: { show: true, width: 2, curve: 'straight' },
  fill: { opacity: 1 },
  legend: { show: true, position: 'top' },
  responsive: []
};

  productChartOptions: ChartOptions = {
  series: [],
  chart: { type: 'bar', height: 350 },
  xaxis: { categories: [] },
  dataLabels: { enabled: false },
  plotOptions: { bar: { borderRadius: 6, horizontal: false } },
  title: { text: '' },
  stroke: { show: true, width: 2, curve: 'straight' },
  fill: { opacity: 1 },
  legend: { show: true, position: 'top' },
  responsive: []
};

  timeChartOptions: ChartOptions = {
  series: [],
  chart: { type: 'line', height: 350 },
  xaxis: { categories: [] },
  dataLabels: { enabled: false },
  plotOptions: {},
  title: { text: '' },
  stroke: { curve: 'smooth', width: 2 },
  fill: { opacity: 0.5 },
  legend: { show: true, position: 'top' },
  responsive: []
};
  stockChartOptions: ApexPieChartOptions = {
  series: [],
  chart: { type: 'pie', height: 350 },
  labels: ['LOW', 'SUFFICIENT', 'HIGH'], // دائماً مصفوفة صالحة
  colors: ['#EF4444','#10B981','#3B82F6'], // دائماً مصفوفة صالحة
  legend: { show: true, position: 'bottom' }, // دائماً كائن صالح
  responsive: []
};


  constructor(private statisticsService: StatisticsService) {}

  ngOnInit(): void {
    const start = '2025-06-07T15:00:00';
    const end = '2025-07-07T15:00:00';

    this.statisticsService.getStatistics(start, end).subscribe({
      next: (data) => {
        this.dashboardData = data;
        this.loading = false;
        this.prepareIndicators();
        this.prepareCharts();
      },
      error: () => {
        this.error = 'فشل تحميل البيانات';
        this.loading = false;
      }
    });
  }

  prepareIndicators() {
    if (!this.dashboardData) return;
    const gi = this.dashboardData.generalIndicators;
    this.generalIndicatorItems = [
      { label: 'إجمالي المبيعات', value: gi.totalSales, colorClass: 'text-indigo-600' },
      { label: 'إجمالي الكمية المباعة', value: gi.totalQuantitySold, colorClass: 'text-indigo-600' },
      { label: 'عدد الفواتير', value: gi.totalInvoices, colorClass: 'text-indigo-600' },
      { label: 'إجمالي المشتريات', value: gi.totalPurchases, colorClass: 'text-indigo-600' },
      { label: 'إجمالي الكمية المشتراة', value: gi.totalQuantityPurchased, colorClass: 'text-indigo-600' },
      { label: 'عدد فواتير المشتريات', value: gi.totalPurchaseInvoices, colorClass: 'text-indigo-600' },
      { label: 'إجمالي المرتجعات', value: gi.totalReturnsValue, colorClass: 'text-indigo-600' },
      { label: 'معدل المرتجعات %', value: gi.returnRatePercentage, colorClass: 'text-purple-600', suffix: '%' },
      { label: 'عدد الفروع', value: gi.totalBranches, colorClass: 'text-indigo-600' },
      { label: 'عدد المخازن', value: gi.totalWarehouses, colorClass: 'text-indigo-600' },
      { label: 'عدد نقاط البيع', value: gi.totalPos, colorClass: 'text-indigo-600' },
      { label: 'الموظفون النشطون', value: gi.totalActiveEmployees, colorClass: 'text-indigo-600' },
      { label: 'إجمالي المنتجات', value: gi.totalProducts, colorClass: 'text-indigo-600' },
      { label: 'إجمالي المخزون', value: gi.totalStockQuantity, colorClass: 'text-indigo-600' }
    ];

    const fa = this.dashboardData.financialAnalysis;
    this.financialItems = [
      { label: 'الإيرادات', value: fa.totalRevenue, colorClass: 'text-green-600' },
      { label: 'التكاليف', value: fa.totalCost, colorClass: 'text-red-600' },
      { label: 'الأرباح', value: fa.grossProfit, colorClass: 'text-indigo-600' },
      { label: 'هامش الربح %', value: fa.profitMarginPercentage, colorClass: 'text-purple-600', suffix: '%' }
    ];
  }

  prepareCharts() {
    if (!this.dashboardData) return;

    // Branch Performance
    this.branchChartOptions.series = [
      { name: 'المبيعات', data: this.dashboardData.branchPerformance.map(b => b.sales || 0) }
    ];
    this.branchChartOptions.xaxis = { categories: this.dashboardData.branchPerformance.map(b => b.branchName) };
    this.branchChartOptions.plotOptions = { bar: { borderRadius: 6, horizontal: false } };
    this.branchChartOptions.dataLabels = { enabled: false };

    // Product Profitability
    this.productChartOptions.series = [
      { name: 'الأرباح', data: this.dashboardData.productAnalytics.allProductsProfitability.map(p => p.profit) }
    ];
    this.productChartOptions.xaxis = { categories: this.dashboardData.productAnalytics.allProductsProfitability.map(p => p.productName) };
    this.productChartOptions.plotOptions = { bar: { borderRadius: 6, horizontal: false } };
    this.productChartOptions.dataLabels = { enabled: false };

    // Time Trends
    this.timeChartOptions.series = [
      { name: 'المبيعات', data: this.dashboardData.timeTrends.dailyTrends.map(d => d.sales) },
      { name: 'المشتريات', data: this.dashboardData.timeTrends.dailyTrends.map(d => d.purchases) },
      { name: 'المرتجعات', data: this.dashboardData.timeTrends.dailyTrends.map(d => d.returns) }
    ];
    this.timeChartOptions.xaxis = { categories: this.dashboardData.timeTrends.dailyTrends.map(d => d.date) };
    this.timeChartOptions.stroke = { curve: 'smooth' };

    // Stock Status Pie
    const summary = this.dashboardData.inventoryInsights.stockStatusSummary;
    this.stockChartOptions.series = [summary.LOW, summary.SUFFICIENT, summary.HIGH || 0];
    this.stockChartOptions.labels = ['LOW', 'SUFFICIENT', 'HIGH'];
    this.stockChartOptions.colors = ['#EF4444','#10B981','#3B82F6'];
  }

  getStockStatusColor(status: string): string {
    switch (status) {
      case 'LOW': return 'bg-red-500';
      case 'SUFFICIENT': return 'bg-green-500';
      case 'HIGH': return 'bg-blue-500';
      default: return 'bg-gray-400';
    }
  }
}
