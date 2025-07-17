import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  inject,
} from '@angular/core';
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
  PieController,
  ArcElement,
} from 'chart.js';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-component.component.html',
  styleUrl: './dashboard-component.component.css',
})
export class DashboardComponentComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  constructor() {
    Chart.register(
      LineController,
      LineElement,
      PointElement,
      LinearScale,
      CategoryScale,
      Title,
      Tooltip,
      Legend,
      PieController,
      ArcElement
    );
  }

  private salesChart: Chart | null = null;
  private branchesChart: Chart | null = null;

  stats = [
    { title: 'عدد الطلبات اليوم', value: 128, icon: 'shopping-cart', color: 'blue' },
    { title: 'عدد المنتجات', value: 2580, icon: 'layers', color: 'green' },
    { title: 'عدد المبيعات', value: 43500, icon: 'coins', color: 'purple' },
    { title: 'عدد المشتريات', value: 210, icon: 'package', color: 'yellow' },
    { title: 'نسبة التنفيذ', value: '92%', icon: 'check-circle', color: 'teal' },
    { title: 'المخزون الحالي', value: 14200, icon: 'warehouse', color: 'orange' },
  ];

  topProducts = [
    { name: 'منتج 1', sold: 350 },
    { name: 'منتج 2', sold: 290 },
    { name: 'منتج 3', sold: 270 },
    { name: 'منتج 4', sold: 220 },
    { name: 'منتج 5', sold: 180 },
  ];

  branches = [
    { name: 'فرع عمان', status: 'active' },
    { name: 'فرع الزرقاء', status: 'warning' },
    { name: 'فرع العقبة', status: 'error' },
  ];

  recentTransactions = [
    { type: 'شراء', id: 'P-001', amount: 500, status: 'مكتمل' },
    { type: 'نقل', id: 'T-002', amount: 200, status: 'معلق' },
    { type: 'بيع', id: 'S-003', amount: 1200, status: 'مكتمل' },
  ];

  alerts = [
    { message: 'انخفاض المخزون لمنتج "زيت عباد الشمس"', level: 'warning' },
    { message: 'فاتورة رقم INV-104 غير مدفوعة', level: 'danger' },
  ];

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // تأخير رسم الرسوم البيانية لإعطاء فرصة للـ DOM
    requestAnimationFrame(() => {
      this.drawSalesChart();
      this.drawBranchesChart();
    });
  }

  private drawSalesChart() {
    const ctx = document.getElementById('salesChart') as HTMLCanvasElement;
    if (!ctx) return;

    this.salesChart?.destroy();
    this.salesChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
        datasets: [{
          label: 'المبيعات',
          data: [12000, 19000, 3000, 5000, 2000, 30000],
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.4,
          fill: true,
        }],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          tooltip: { enabled: true },
        },
        scales: {
          y: { beginAtZero: true },
        },
      },
    });
  }

  private drawBranchesChart() {
    const ctxPie = document.getElementById('branchesChart') as HTMLCanvasElement;
    if (!ctxPie) return;

    const statusCount = { active: 0, warning: 0, error: 0 };
    this.branches.forEach(branch => {
      statusCount[branch.status as keyof typeof statusCount]++;
    });

    this.branchesChart?.destroy();
    this.branchesChart = new Chart(ctxPie, {
      type: 'pie',
      data: {
        labels: ['نشط', 'تحذير', 'توقف'],
        datasets: [{
          data: [statusCount.active, statusCount.warning, statusCount.error],
          backgroundColor: ['#22c55e', '#facc15', '#ef4444'],
        }],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'bottom' },
        },
      },
    });
  }

  ngOnDestroy(): void {
    this.salesChart?.destroy();
    this.branchesChart?.destroy();
  }
}
