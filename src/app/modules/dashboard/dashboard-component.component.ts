import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { StatisticsService } from './service/statistics.service';
import { StatisticsDashboardResponse } from './model/product.model';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-component.component.html',
  styleUrls: ['./dashboard-component.component.css'],
})
export class DashboardComponentComponent implements OnInit {

  dashboardData?: StatisticsDashboardResponse;
  loading = true;
  error: string | null = null;

  generalIndicatorItems: any[] = [];
  financialItems: any[] = [];

  // ViewChild لكل Canvas
  @ViewChild('branchChart') branchChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('productChart') productChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('timeChart') timeChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('stockChart') stockChart!: ElementRef<HTMLCanvasElement>;

  constructor(private statisticsService: StatisticsService) {}

  ngOnInit(): void {
    const start = '2025-06-07T15:00:00';
    const end = '2025-07-07T15:00:00';

    this.statisticsService.getStatistics(start, end).subscribe({
      next: (data) => {
        this.dashboardData = data;
        this.loading = false;
        this.prepareIndicators();

        // تأخير قليل لضمان إنشاء الـ canvas
        setTimeout(() => this.renderCharts(), 0);
      },
      error: (err) => {
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
      { label: 'إجمالي كمية المرتجعات', value: gi.totalReturnsQuantity, colorClass: 'text-indigo-600' },
      { label: 'عدد فواتير المرتجعات', value: gi.totalReturnInvoices, colorClass: 'text-indigo-600' },
      { label: 'معدل المرتجعات %', value: gi.returnRatePercentage, colorClass: 'text-purple-600', suffix: '%' },
      { label: 'عدد الفروع', value: gi.totalBranches, colorClass: 'text-indigo-600' },
      { label: 'عدد المخازن', value: gi.totalWarehouses, colorClass: 'text-indigo-600' },
      { label: 'عدد نقاط البيع', value: gi.totalPos, colorClass: 'text-indigo-600' },
      { label: 'الموظفون النشطون', value: gi.totalActiveEmployees, colorClass: 'text-indigo-600' },
      { label: 'إجمالي المنتجات', value: gi.totalProducts, colorClass: 'text-indigo-600' },
      { label: 'منتجات المخازن', value: gi.warehouseProducts, colorClass: 'text-indigo-600' },
      { label: 'منتجات الخدمات', value: gi.serviceProducts, colorClass: 'text-indigo-600' },
      { label: 'إجمالي المخزون', value: gi.totalStockQuantity, colorClass: 'text-indigo-600' }
    ];

    const fa = this.dashboardData.financialAnalysis;
    this.financialItems = [
      { label: 'الإيرادات', value: fa.totalRevenue, colorClass: 'text-green-600' },
      { label: 'التكاليف', value: fa.totalCost, colorClass: 'text-red-600' },
      { label: 'إجمالي المرتجعات', value: fa.totalReturnsValue, colorClass: 'text-yellow-600' },
      { label: 'الأرباح', value: fa.grossProfit, colorClass: 'text-indigo-600' },
      { label: 'هامش الربح %', value: fa.profitMarginPercentage, colorClass: 'text-purple-600', suffix: '%' }
    ];
  }

  getStockStatusColor(status: string): string {
    switch (status) {
      case 'LOW': return 'bg-red-500';
      case 'SUFFICIENT': return 'bg-green-500';
      case 'HIGH': return 'bg-blue-500';
      default: return 'bg-gray-400';
    }
  }

  renderCharts() {
    if (!this.dashboardData) return;

    // 🏬 Branch Performance
    new Chart(this.branchChart.nativeElement, {
      type: 'bar',
      data: {
        labels: this.dashboardData.branchPerformance.map(b => b.branchName),
        datasets: [{
          label: 'المبيعات',
          data: this.dashboardData.branchPerformance.map(b => b.sales || 0),
          backgroundColor: '#4F46E5'
        }]
      },
      options: { responsive: true }
    });

    // 📦 Product Profitability
    new Chart(this.productChart.nativeElement, {
      type: 'bar',
      data: {
        labels: this.dashboardData.productAnalytics.allProductsProfitability.map(p => p.productName),
        datasets: [{
          label: 'الأرباح',
          data: this.dashboardData.productAnalytics.allProductsProfitability.map(p => p.profit),
          backgroundColor: '#10B981'
        }]
      },
      options: { responsive: true }
    });

    // ⏱️ Time Trends
    new Chart(this.timeChart.nativeElement, {
      type: 'line',
      data: {
        labels: this.dashboardData.timeTrends.dailyTrends.map(d => d.date),
        datasets: [
          { label: 'المبيعات', data: this.dashboardData.timeTrends.dailyTrends.map(d => d.sales), borderColor: '#4F46E5', fill: false },
          { label: 'المشتريات', data: this.dashboardData.timeTrends.dailyTrends.map(d => d.purchases), borderColor: '#EF4444', fill: false },
          { label: 'المرتجعات', data: this.dashboardData.timeTrends.dailyTrends.map(d => d.returns), borderColor: '#F59E0B', fill: false }
        ]
      },
      options: { responsive: true }
    });

    // 🏗️ Stock Status Pie
    const summary = this.dashboardData.inventoryInsights.stockStatusSummary;
    new Chart(this.stockChart.nativeElement, {
      type: 'pie',
      data: {
        labels: ['LOW', 'SUFFICIENT', 'HIGH'],
        datasets: [{
          data: [summary.LOW, summary.SUFFICIENT, summary.HIGH || 0],
          backgroundColor: ['#EF4444','#10B981','#3B82F6']
        }]
      },
      options: { responsive: true }
    });
  }
}
