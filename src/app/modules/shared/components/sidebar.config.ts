import { Roles } from '../../../core/constants/roles.enum';
import { AccountingReportsKeys, InventoryReportsKeys } from 'app/core/constants/constant';

export const sidebarConfig: Record<Roles, any[]> = {
  // المدير العام
  [Roles.ADMIN]: [
    { name: 'sidebar.dashboard', icon: 'home', routerLink: '/' },
    {
      name: 'sidebar.products',
      icon: 'package-search',
      section: 'products',
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
      ],
    },
    {
      name: 'sidebar.invoices',
      icon: 'invoice',
      section: 'invoices',
      children: [
        { name: 'sidebar.invoices_list', icon: 'file-text', routerLink: '/invoices' },
        { name: 'br', icon: '' },
        { name: 'sidebar.invoice_type', icon: '', routerLink: 'invoice-types' },
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

  [Roles.MANAGER]: [
    { name: 'sidebar.dashboard', icon: 'home', routerLink: '' },
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
      ],
    },
    {
      name: 'sidebar.invoices',
      icon: 'invoice',
      section: 'invoices',
      children: [
        { name: 'sidebar.invoices_list', icon: 'file-text', routerLink: '/invoices' },
        { name: 'br', icon: '' },
        { name: 'sidebar.invoice_type', icon: '', routerLink: 'invoice-types' },
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

{ name: 'sidebar.purchases', icon: 'shopping-cart', routerLink: '/purchases' },
{
      name: 'sidebar.invoices',
      icon: 'invoice',
      section: 'invoices',
      children: [
        { name: 'sidebar.invoices_list', icon: 'file-text', routerLink: '/invoices' },
        { name: 'br', icon: '' },
        { name: 'sidebar.invoice_type', icon: '', routerLink: 'invoice-types' },
        { name: 'br', icon: '' },
        { name: 'sidebar.transfer_process', icon: '', routerLink: 'transfers' },
        { name: 'sidebar.inventory_count', icon: '', routerLink: 'inventory-count' },
        { name: 'br', icon: '' },
        { name: 'sidebar.item_movement', icon: '', routerLink: `inventory-reports/${InventoryReportsKeys.ItemMovement}` },
        { name: 'sidebar.daily_movement', icon: '', routerLink: `inventory-reports/${InventoryReportsKeys.DailyMovement}` },
        { name: 'sidebar.item_stock', icon: '', routerLink: `inventory-reports/${InventoryReportsKeys.ItemStock}` },
      ],
    },
  ]
};
