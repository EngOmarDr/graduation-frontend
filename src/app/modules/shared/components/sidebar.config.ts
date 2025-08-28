import { Roles } from '../../../core/constants/roles.enum';
import { AccountingReportsKeys, InventoryReportsKeys } from 'app/core/constants/constant';

export const sidebarConfig: Record<Roles, any[]> = {
  // المدير العام
  [Roles.ADMIN]: [
    { name: 'sidebar.dashboard', icon: 'home', routerLink: '/' },
    {
      name: 'sidebar.products',
      icon: 'package-search',
      section: 'products', // نستخدم هذا المفتاح بدل fun/attr
      children: [
        { name: 'sidebar.products_list', icon: 'box', routerLink: '/products' },
        { name: 'sidebar.groups', icon: 'layers', routerLink: '/groups' },
        { name: 'sidebar.units', icon: 'ruler', routerLink: '/units' },
        { name: 'sidebar.warehouses', icon: 'warehouse', routerLink: '/warehouses' },
        { name: 'sidebar.price', icon: 'tag', routerLink: '/prices' },
        { name: 'sidebar.print_barcode', icon: 'barcode', routerLink: '/printBarcode' },
      ],
    },
    { name: 'sidebar.purchases', icon: 'shopping-cart', routerLink: '/purchases' },
    {
      name: 'sidebar.accounts',
      icon: 'wallet-cards',
      section: 'accounts',
      children: [
        { name: 'sidebar.accounts_list', icon: 'wallet-card', routerLink: '/accounts' },
        { name: 'br', icon: '' },
        { name: 'sidebar.general_journal', icon: '', routerLink: `accounting-reports/${AccountingReportsKeys.GENERALJOURNAL}` },
        { name: 'sidebar.ledger', icon: '', routerLink: `accounting-reports/${AccountingReportsKeys.LEDGER}` },
        { name: 'sidebar.trial_balance', icon: '', routerLink: `accounting-reports/${AccountingReportsKeys.TRAILBALANCE}` },
      ],
    },
    { name: 'sidebar.price_display', icon: 'tag', routerLink: '/advertisements/' },
    { name: 'sidebar.branches', icon: 'git-branch', routerLink: '/branches' },
    { name: 'sidebar.currencies', icon: 'coins', routerLink: '/currencies' },
    {
      name: 'sidebar.vouchers',
      icon: 'book-text',
      section: 'vouchers',
      children: [
        { name: 'sidebar.journal_entry', icon: 'book-text', routerLink: 'journal/journals' },
        { name: 'br', icon: '' },
        { name: 'sidebar.journal_type', icon: '', routerLink: 'journal-types' },
        // سيتم إضافة journalTypes ديناميكياً من السيرفس
      ],
    },
    {
      name: 'sidebar.invoices',
      icon: 'invoice',
      section: 'invoices',
      children: [
        { name: 'sidebar.invoice_type', icon: '', routerLink: 'invoice-types' },
        // سيتم إضافة invoiceTypes ديناميكياً من السيرفس
        { name: 'br', icon: '' },
        { name: 'sidebar.transfer_process', icon: '', routerLink: 'transfers' },
        { name: 'sidebar.inventory_count', icon: '', routerLink: 'inventory-count' },
        { name: 'br', icon: '' },
        { name: 'sidebar.item_movement', icon: '', routerLink: `inventory-reports/${InventoryReportsKeys.ItemMovement}` },
        { name: 'sidebar.daily_movement', icon: '', routerLink: `inventory-reports/${InventoryReportsKeys.DailyMovement}` },
        { name: 'sidebar.item_stock', icon: '', routerLink: `inventory-reports/${InventoryReportsKeys.ItemStock}` },
      ],
    },
    { name: 'sidebar.users', icon: 'lock-keyhole', routerLink: '/users' },
    { name: 'sidebar.settings', icon: 'settings', routerLink: '/settings' },
  ],

  // مدير المستودع
  [Roles.MANAGER]: [
    { name: 'sidebar.dashboard', icon: 'home', routerLink: '/' },
    {
      name: 'sidebar.products',
      icon: 'package-search',
      section: 'products',
      children: [
        { name: 'sidebar.products_list', icon: 'box', routerLink: '/products' },
        { name: 'sidebar.print_barcode', icon: 'barcode', routerLink: '/printBarcode' },
      ],
    },
    {
      name: 'sidebar.accounts',
      icon: 'wallet-cards',
      section: 'accounts',
      children: [
        { name: 'sidebar.accounts_list', icon: 'wallet-card', routerLink: '/accounts' },
        { name: 'br', icon: '' },
        { name: 'sidebar.general_journal', icon: '', routerLink: `accounting-reports/${AccountingReportsKeys.GENERALJOURNAL}` },
        { name: 'sidebar.ledger', icon: '', routerLink: `accounting-reports/${AccountingReportsKeys.LEDGER}` },
        { name: 'sidebar.trial_balance', icon: '', routerLink: `accounting-reports/${AccountingReportsKeys.TRAILBALANCE}` },
      ],
    },
    {
      name: 'sidebar.vouchers',
      icon: 'book-text',
      section: 'vouchers',
      children: [
        { name: 'sidebar.journal_entry', icon: 'book-text', routerLink: 'journal/journals' },
        { name: 'br', icon: '' },
        { name: 'sidebar.journal_type', icon: '', routerLink: 'journal-types' },
        // سيتم إضافة journalTypes ديناميكياً من السيرفس
      ],
    },
    {
      name: 'sidebar.invoices',
      icon: 'invoice',
      section: 'invoices',
      children: [
        { name: 'sidebar.invoice_type', icon: '', routerLink: 'invoice-types' },
        // سيتم إضافة invoiceTypes ديناميكياً من السيرفس
        { name: 'br', icon: '' },
        { name: 'sidebar.transfer_process', icon: '', routerLink: 'transfers' },
        { name: 'sidebar.inventory_count', icon: '', routerLink: 'inventory-count' },
        { name: 'br', icon: '' },
        { name: 'sidebar.item_movement', icon: '', routerLink: `inventory-reports/${InventoryReportsKeys.ItemMovement}` },
        { name: 'sidebar.daily_movement', icon: '', routerLink: `inventory-reports/${InventoryReportsKeys.DailyMovement}` },
        { name: 'sidebar.item_stock', icon: '', routerLink: `inventory-reports/${InventoryReportsKeys.ItemStock}` },
      ],
    },
  ],

  // مدير المشتريات
  [Roles.PURCHASING_MANAGER]: [
    { name: 'sidebar.dashboard', icon: 'home', routerLink: '/' },
    { name: 'sidebar.supply_requests', icon: 'shopping-cart', routerLink: '/supply-requests' },
    { name: 'sidebar.purchase_orders', icon: 'shopping-bag', routerLink: '/purchase-orders' },
  ],

  // الكاشير
  [Roles.CASHIER]: [
    { name: 'sidebar.dashboard', icon: 'home', routerLink: '/' },
    { name: 'sidebar.pos', icon: 'shopping-bag', routerLink: '/pos' },
    { name: 'sidebar.customer_display', icon: 'receipt', routerLink: '/customer-display' },
    { name: 'sidebar.shift_management', icon: 'clock', routerLink: '/shift-management' },
    { name: 'sidebar.invoice_management', icon: 'file-invoice', routerLink: '/invoice-management' },
    { name: 'sidebar.customer_screen', icon: 'monitor', routerLink: '/customer-screen' },
  ],
};
