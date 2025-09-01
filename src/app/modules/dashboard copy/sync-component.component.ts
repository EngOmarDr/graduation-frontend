import { Component, OnInit, linkedSignal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { toSignal } from '@angular/core/rxjs-interop';
import { SyncService } from './service/sync.service';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-component.component.html',
  styleUrls: ['./dashboard-component.component.css'],
})
export class SyncComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  private service = inject(SyncService);

  jobs = toSignal(this.service.getSync(), { initialValue: null });
}
