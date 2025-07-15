import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '@shared/components/sidebar.component';
import { SettingbarComponent } from '@shared/components/settingbar.component';
import { LanguageSwitcherComponent } from '@shared/components/language-switcher.component';

@Component({
  selector: 'app-layout',
  imports: [
    CommonModule,
    RouterOutlet,
    FormsModule,
    SidebarComponent,
    SettingbarComponent,
    LanguageSwitcherComponent
  ],
  templateUrl: './layout.component.html',
})
export class LayoutComponent {
  @ViewChild(SidebarComponent) sidebarComponent!: SidebarComponent;
  @ViewChild(SettingbarComponent) SettingbarComponent!: SettingbarComponent;
}
