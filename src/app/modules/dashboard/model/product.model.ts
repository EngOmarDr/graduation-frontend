// 📊 مؤشرات عامة
export interface GeneralIndicators {
  totalSales: number;
  totalQuantitySold: number | null;
  totalInvoices: number;
  totalPurchases: number;
  totalQuantityPurchased: number | null;
  totalPurchaseInvoices: number;
  totalReturnsValue: number;
  totalReturnsQuantity: number | null;
  totalReturnInvoices: number;
  returnRatePercentage: number;
  totalBranches: number;
  totalWarehouses: number;
  totalPos: number;
  totalActiveEmployees: number;
  totalProducts: number;
  warehouseProducts: number;
  serviceProducts: number;
  totalStockQuantity: number;
}

// 🏬 أداء الفروع (فارغ بالريسبونس الحالي، لكن نحطه تحسباً)
export interface BranchPerformance {
  branchId: number;
  branchName: string;
  sales?: number;
  purchases?: number;
  profit?: number;
}

// 📦 تحليل المنتجات
export interface ProductProfitability {
  productId: number;
  productName: string;
  revenue: number;
  cost: number;
  profit: number;
  profitMargin: number;
}

export interface ProductAnalytics {
  profitableProducts: ProductProfitability[];
  unprofitableProducts: ProductProfitability[];
  allProductsProfitability: ProductProfitability[];
  movementAnalysis: any | null;   // ممكن تخصص لاحقاً إذا رجع API بيانات
  movementCategories: any | null; // نفس الشي
}

// 💰 التحليل المالي
export interface FinancialAnalysis {
  totalRevenue: number;
  totalCost: number;
  totalReturnsValue: number;
  grossProfit: number;
  profitMarginPercentage: number;
}

// ⏱️ التوجهات الزمنية
export interface DailyTrend {
  date: string;
  sales: number;
  purchases: number;
  returns: number;
}

export interface MonthlyTrend {
  month: string;
  sales: number;
  purchases: number;
  returns: number;
}

export interface TimeTrends {
  dailyTrends: DailyTrend[];
  monthlyTrends: MonthlyTrend[];
  periodComparison: any | null;
}

// 🏗️ المخزون
export interface StockLevel {
  branchId: number;
  branchName: string;
  productId: number;
  productName: string;
  minQuantity: number;
  maxQuantity: number;
  currentStock: number;
  stockStatus: 'LOW' | 'SUFFICIENT' | 'HIGH' | string;
}

export interface StockStatusSummary {
  LOW: number;
  SUFFICIENT: number;
  HIGH?: number;
}

export interface InventoryInsights {
  stockLevels: StockLevel[];
  stockStatusSummary: StockStatusSummary;
}

// 📌 موديل الريسبونس الكامل للـ Dashboard
export interface StatisticsDashboardResponse {
  generalIndicators: GeneralIndicators;
  branchPerformance: BranchPerformance[];
  productAnalytics: ProductAnalytics;
  financialAnalysis: FinancialAnalysis;
  timeTrends: TimeTrends;
  inventoryInsights: InventoryInsights;
}
