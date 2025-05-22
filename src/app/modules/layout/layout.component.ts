import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../shared/components/sidebar.component';
import { SettingbarComponent } from '../shared/components/settingbar.component';

@Component({
  selector: 'app-layout',
  imports: [
    CommonModule,
    RouterOutlet,
    FormsModule,
    SidebarComponent,
    SettingbarComponent
],
  templateUrl: './layout.component.html',
})
export class LayoutComponent {
  @ViewChild(SidebarComponent) sidebarComponent!: SidebarComponent;
  @ViewChild(SettingbarComponent) SettingbarComponent!: SettingbarComponent;

}
