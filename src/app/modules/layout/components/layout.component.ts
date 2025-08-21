import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from '@shared/components/sidebar.component';
import { SettingbarComponent } from '@shared/components/settingbar.component';
import { LanguageSwitcherComponent } from '@shared/components/language-switcher.component';
import { TranslateModule } from '@ngx-translate/core';
import { StorageService } from 'app/core/services/storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-layout',
  imports: [
    CommonModule,
    RouterOutlet,
    FormsModule,
    SidebarComponent,
    SettingbarComponent,
    LanguageSwitcherComponent,
    TranslateModule
  ],
  templateUrl: './layout.component.html',
})
export class LayoutComponent {
  @ViewChild(SidebarComponent) sidebarComponent!: SidebarComponent;
  @ViewChild(SettingbarComponent) SettingbarComponent!: SettingbarComponent;

    constructor(private router: Router, private storageService: StorageService) {}

    confirmLogout() {
    Swal.fire({
      title: 'هل أنت متأكد؟',
      text: 'هل تريد تسجيل الخروج من النظام؟',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'نعم، خروج',
      cancelButtonText: 'إلغاء'
    }).then((result) => {
      if (result.isConfirmed) {
        this.logout();
        Swal.fire('تم الخروج!', 'تم تسجيل الخروج بنجاح.', 'success');
      }
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
